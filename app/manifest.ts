import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JUST-PERFUM | Extrait de Parfum",
    short_name: "JUST-PERFUM",
    description: "Authentic designer fragrances — 100% original extrait de parfum.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f0f0f",
    theme_color: "#d4af37",
    icons: [
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any"
      },
      {
        src: "/icon.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
