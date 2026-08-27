import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataPath = path.join(root, "data.json");

const data = JSON.parse(readFileSync(dataPath, "utf-8"));
const { profile, timeline } = data;

const roles = timeline
  .map(
    (item) =>
      `- ${item.jobTitle} at ${item.employer} (${item.startDate} - ${item.endDate}): ${item.jobDescription}`,
  )
  .join("\n");

const prompt = `You are an HR analyst writing a short "AI analysis" summary for a developer's portfolio site. Write 2-3 sentences, third person, professional but warm recruiter tone. Base it strictly on the data below, no invented facts.

Name: ${profile.fullName}
Title: ${profile.title}
Existing self-description: ${profile.profileDescription.join(" ")}

Work history:
${roles}

Output only the summary text, no preamble, no quotes, no markdown.`;

const { text } = await generateText({
  model: google("gemini-3.6-flash"),
  prompt,
});

data.profile.aiSummary = text.trim();

writeFileSync(dataPath, JSON.stringify(data, null, 2) + "\n");

console.log("AI summary written to data.json:\n");
console.log(data.profile.aiSummary);
