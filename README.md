# Sillon

Lecteur audio et vidéo rétro, disponible dans le navigateur et sous forme d’application Windows.

## Lancer dans le navigateur

Installe Node.js, puis exécute :

```powershell
npm install
npm run dev
```

Ouvre l’adresse affichée par Vite.

## Construire l’application Windows

La compilation Tauri nécessite Rust stable, Cargo et les outils de compilation C++ de Visual Studio. Dans le dossier du projet :

```powershell
npm ci
npm run desktop:dev
```

Pour produire les installateurs :

```powershell
npm run desktop:build
```

Les installateurs MSI et NSIS sont générés dans `src-tauri/target/release/bundle/`.

## Publier un téléchargement

Le workflow GitHub Actions construit les installateurs Windows et les joint à une release lorsqu’un tag `v*` est poussé. Après avoir hébergé ce projet sur GitHub, publie une version ainsi :

```powershell
git tag v1.0.0
git push origin v1.0.0
```

Les fichiers `.msi` et `.exe` seront alors téléchargeables depuis la page Releases du dépôt.

Les polices, styles Tailwind et icônes Lucide de la version actuelle sont chargés depuis des CDN ; une connexion Internet est nécessaire pour obtenir le rendu visuel complet.