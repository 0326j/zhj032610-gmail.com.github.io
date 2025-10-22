// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import UnoCSS from "unocss/astro";

// https://astro.build/config
export default defineConfig({
  output: import.meta.env.DEV ? 'server' : 'static',
  site: process.env.CI && process.env.GITHUB_REPOSITORY_OWNER
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
    : 'http://localhost:4321',
  base: (() => {
    if (!process.env.CI || !process.env.GITHUB_REPOSITORY) return undefined;
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    // 如果仓库名是 username.github.io 格式，部署在根路径
    if (repoName.endsWith('.github.io')) return undefined;
    // 否则部署在子路径
    return `/${repoName}`;
  })(),
  integrations: [UnoCSS({ injectReset: true })],
  server: {
    host: true
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "urodele.config": fileURLToPath(new URL("./urodele.config.ts", import.meta.url))
      },
    },
  },
});
