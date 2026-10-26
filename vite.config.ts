import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { siteConfig } from "./src/config/siteConfig";

// Canonical and absolute social-card URLs only exist once the production origin is known,
// so they're written into index.html at build time from siteConfig.siteUrl — never guessed.
function siteUrlMeta(): Plugin {
  return {
    name: "site-url-meta",
    transformIndexHtml(html) {
      const origin = siteConfig.siteUrl?.replace(/\/$/, "");
      if (!origin) return html;
      return html
        // Matches before or after Vite has prefixed the base path.
        .replace(/content="[^"]*\/icon-512\.png"/, `content="${origin}/icon-512.png"`)
        .replace(
          "</head>",
          `    <link rel="canonical" href="${origin}/" />\n    <meta property="og:url" content="${origin}/" />\n  </head>`,
        );
    },
  };
}

// GitHub Pages serves the site from a subpath (/MobileBuildersWebsite/), so the production
// build (and `vite preview` of it) takes its base path from siteUrl. The dev server keeps "/".
const basePath = siteConfig.siteUrl ? new URL(siteConfig.siteUrl).pathname.replace(/\/?$/, "/") : "/";

export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? basePath : "/",
  plugins: [react(), siteUrlMeta()],
}));
