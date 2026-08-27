import { google } from "@ai-sdk/google";
import { createTextStreamResponse, streamText, toTextStream } from "ai";
import { NextResponse } from "next/server";
import data from "../../../data.json";

const COOLDOWN_MS = 30_000;

// Module-scope, so it persists across warm invocations on the same Fluid
// Compute instance. Resets on cold start — good enough to stop naive
// hammering of a free-tier API key without pulling in an external store.
let lastCallAt = 0;

export async function POST() {
  const now = Date.now();
  if (now - lastCallAt < COOLDOWN_MS) {
    return NextResponse.json(
      { error: "Please wait before regenerating again." },
      { status: 429 }
    );
  }
  lastCallAt = now;

  const { profile, timeline } = data;

  const roles = timeline
    .map(
      (item) =>
        `- ${item.jobTitle} at ${item.employer} (${item.startDate} - ${item.endDate}): ${item.jobDescription}`
    )
    .join("\n");

  const prompt = `You are an HR analyst writing a short "AI analysis" summary for a developer's portfolio site. Write 2-3 sentences, third person, professional but warm recruiter tone. Base it strictly on the data below, no invented facts. Vary your phrasing from a typical summary so repeated generations don't read identically.

Name: ${profile.fullName}
Title: ${profile.title}
Existing self-description: ${profile.profileDescription.join(" ")}

Work history:
${roles}

Output only the summary text, no preamble, no quotes, no markdown.`;

  const result = streamText({
    model: google("gemini-3.6-flash"),
    prompt,
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
