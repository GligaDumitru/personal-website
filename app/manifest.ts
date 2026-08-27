import type { MetadataRoute } from "next";
import data from "../data.json";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${data.profile.fullName} — ${data.profile.title}`,
    short_name: data.profile.fullName,
    description: data.profile.profileDescription[0],
    start_url: "/",
    display: "standalone",
    background_color: "#171717",
    theme_color: "#171717",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
