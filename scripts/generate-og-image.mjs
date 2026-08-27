import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const data = JSON.parse(readFileSync(path.join(root, "data.json"), "utf-8"));
const { fullName, title, profileDescription } = data.profile;

const photoBuffer = await sharp(path.join(root, "src/assets/me.jpg"))
  .resize(220, 220)
  .png()
  .toBuffer();
const photoDataUri = `data:image/png;base64,${photoBuffer.toString("base64")}`;

const fontRegular = readFileSync("/System/Library/Fonts/Supplemental/Arial.ttf");
const fontBold = readFileSync("/System/Library/Fonts/Supplemental/Arial Bold.ttf");

const svg = await satori(
  {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "80px",
        backgroundColor: "#171717",
        color: "#f5f5f5",
        fontFamily: "Arial",
      },
      children: [
        {
          type: "img",
          props: {
            src: photoDataUri,
            width: 220,
            height: 220,
            style: { borderRadius: "50%", marginBottom: "40px" },
          },
        },
        {
          type: "div",
          props: {
            style: { fontSize: 64, fontWeight: 700, marginBottom: "16px" },
            children: fullName,
          },
        },
        {
          type: "div",
          props: {
            style: { fontSize: 34, color: "#a3a3a3", marginBottom: "28px" },
            children: title,
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: 26,
              color: "#d4d4d4",
              maxWidth: "920px",
              lineHeight: 1.4,
            },
            children: profileDescription[0],
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Arial", data: fontRegular, weight: 400, style: "normal" },
      { name: "Arial", data: fontBold, weight: 700, style: "normal" },
    ],
  }
);

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
const png = resvg.render().asPng();
writeFileSync(path.join(root, "public/og-image.png"), png);

console.log("Wrote public/og-image.png");
