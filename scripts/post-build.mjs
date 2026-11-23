// Post-build : le CV n'a aucune interactivité, donc on retire le JavaScript
// de React/Next.js (~130 Ko) et on intègre le CSS (2,9 Ko) directement dans le HTML.
// Résultat : la page s'affiche avec 1 seule requête (+ le favicon).
import { readFileSync, writeFileSync, readdirSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const basePath = process.env.BASE_PATH || "";

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "_next" ? [] : htmlFiles(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

for (const file of htmlFiles(OUT)) {
  let html = readFileSync(file, "utf8");

  // 1. Supprime tous les <script> (externes et inline) et les préchargements de scripts
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link[^>]*\bas="script"[^>]*\/?>/g, "");

  // 2. Remplace la feuille de style externe par une balise <style>
  html = html.replace(/<link rel="stylesheet" href="([^"]+)"[^>]*\/?>/g, (_, href) => {
    const css = readFileSync(join(OUT, href.slice(basePath.length)), "utf8");
    return `<style>${css}</style>`;
  });

  writeFileSync(file, html);
  if (/<script/i.test(html)) throw new Error(`Script restant dans ${file}`);
}

// 3. Supprime les fichiers devenus inutiles (JS, CSS intégré, données RSC .txt)
rmSync(join(OUT, "_next"), { recursive: true, force: true });
for (const f of readdirSync(OUT)) if (f.endsWith(".txt")) rmSync(join(OUT, f));
for (const dir of readdirSync(OUT)) {
  const p = join(OUT, dir);
  if (statSync(p).isDirectory())
    for (const f of readdirSync(p)) if (f.endsWith(".txt")) rmSync(join(p, f));
}
console.log("post-build : JavaScript retiré, CSS intégré.");
