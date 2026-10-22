/**
 * Télécharge les polices Google Fonts utilisées par Sillon (Chivo + Fraunces)
 * et les auto-héberge dans public/fonts/ avec un fichier fonts.css local.
 * Réexécution possible à tout moment : node scripts/vendor-fonts.mjs
 * (Node 18+ requis, utilise l'API fetch native)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public", "fonts");
mkdirSync(outDir, { recursive: true });

const cssUrl =
	"https://fonts.googleapis.com/css2?family=Chivo:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap";

// User-Agent navigateur obligatoire : sinon Google renvoie du TTF au lieu du WOFF2
const browserHeaders = {
	"user-agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
};

const response = await fetch(cssUrl, { headers: browserHeaders });
if (!response.ok) throw new Error(`HTTP ${response.status} sur fonts.googleapis.com`);
const css = await response.text();

// Capture chaque bloc "@font-face" avec son commentaire de sous-ensemble qui le précède
const faceRegex = /\/\* ([a-z-]+) \*\/\s*@font-face\s*\{([^}]+)\}/g;
const downloads = new Map(); // url distante -> nom de fichier local
const outputBlocks = [];

for (const [, subset, body] of css.matchAll(faceRegex)) {
	if (subset !== "latin" && subset !== "latin-ext") continue;
	const remote = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/.exec(body)?.[1];
	const family = /font-family:\s*'([^']+)'/.exec(body)?.[1] ?? "font";
	const weight = /font-weight:\s*([\d ]+);/.exec(body)?.[1]?.trim() ?? "400";
	if (!remote) continue;
	const slug = `${family.toLowerCase().replace(/\s+/g, "-")}-${weight.replace(/\s+/g, "_")}-${subset}.woff2`;
	// Les polices variables partagent un même fichier pour tous les poids :
	// on télécharge une seule fois et on réécrit chaque bloc vers ce fichier canonique.
	if (!downloads.has(remote)) downloads.set(remote, slug);
	outputBlocks.push(
		`/* ${subset} */\n@font-face {\n${body.trimEnd()}\n}`.replace(
			`url(${remote})`,
			`url(./${downloads.get(remote)})`,
		),
	);
}

if (!downloads.size) throw new Error("Aucun bloc latin/latin-ext détecté dans la réponse.");

for (const [remote, slug] of downloads) {
	const file = await fetch(remote, { headers: browserHeaders });
	if (!file.ok) throw new Error(`HTTP ${file.status} sur ${remote}`);
	writeFileSync(join(outDir, slug), Buffer.from(await file.arrayBuffer()));
}

writeFileSync(join(outDir, "fonts.css"), outputBlocks.join("\n\n") + "\n");
console.log(`Polices auto-hébergées : ${downloads.size} fichiers, ${outputBlocks.length} @font-face dans public/fonts/`);
