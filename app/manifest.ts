import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "parfume BADOU",
    short_name: "parfume BADOU",
    description: "Luxury perfume commerce by Badou.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f0e8",
    theme_color: "#20130d",
    icons: []
  };
}
