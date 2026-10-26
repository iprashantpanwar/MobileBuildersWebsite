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
        .replace('content="/icon-512.png"', `content="${origin}/icon-512.png"`)
        .replace(
          "</head>",
          `    <link rel="canonical" href="${origin}/" />\n    <meta property="og:url" content="${origin}/" />\n  </head>`,
        );
    },
  };
}

export default defineConfig({
  plugins: [react(), siteUrlMeta()],
});
