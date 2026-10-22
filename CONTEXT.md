MEDIAPLAYER CARACTERISTIQUES
Voici le Plan Design, le Cahier des Charges Visuel et l'Algorithme Design sur-mesure pour mon projet de Media Player Desktop Cozy Retro (70s-90s).RETROFUTURISM STYLE
 A retenir: cette app s addresse aux amoureux de musiques et  nostalgique des années 70s et 80s
stack: html,css, javascript

Plateforme & Usage : Application Desktop Web-first (Layout fixe/stable avec Sidebar, Zone Principale et Mini-Player persistant).

Ambiance Visuelle : Warm Cozy Vintage (1970s - 1990s) modernisé. Esthétique réconfortante, analogique et tactile (boutons arrondis, ombres douces, contours subtils, typographie chaleureuse, animations organiques 60fps sans excès).

Features Clés :

Lecteur Vinyle Interactif : Vinyle tournant à la lecture de la musique, pochette personnalisée par l'utilisateur au centre du disque, pochette floutée dynamiquement en fond de lecteur.
Au lancement de musique,petit bruit de vinyle , avnat que la musique ne commence
a chaque pause le vinyle s arrete

Contrôles Audio/Média Tactiles : Volume Slider Vertical, boutons Média ludiques/playful, liste de lecture rétractable ("Musiques masquables" via toggle toggle text/icon).

Organisation par Onglets/Sections : Audio, Vidéo, Mix (Mode DJ).
               BARRE DE CONTROLE LECTEUR(footer)
Volume slider vertical : C'EST DU CSS. a utilise la propriété CSS writing-mode: vertical-lr ou un transform: rotate(-90deg) pour le mettre debout.
Aleatoire boutons:
Loop bouton:
Choix de musiques a ecouter, a mettre en file d attente
creation playlist

Modes & Vues : Vue par Artistes, Musiques, et Suivi de Durée d'Écoute.

🎨 Moodboard & Choix Graphique





[ INITIALISATION APP ]
  ├── 1. Charger Thème Cozy Retro (Variables OKLCH + Fond Acajou/Chaud)
  ├── 2. Masquer le Vinyle par défaut ou afficher une pochette "Vinyl Par Défaut"
  └── 3. Définir le statut du Player : IS_PLAYING = false, LIST_VISIBLE = true

[ ÉVÉNEMENT : SELECTION DOSSIER MUSIQUE / POCHETTE ]
  ├── Attribuer l'image chargée à :
  │     ├── a. Le macaron central du Vinyle (`#vinyl-cover-img`)
  │     └── b. L'arrière-plan du Player (`#bg-blur-container` avec backdrop-filter)
  └── Extraire la liste des pistes (.mp3, .flac) -> Injecter dans la Vue Liste

[ ÉVÉNEMENT : CLIC PLAY / PAUSE ]
  ├── SI IS_PLAYING == false :
  │     ├── Lancer l'audio
  │     ├── Passer IS_PLAYING = true
  │     ├── Animer le bras de lecture (Arm Tone) -> Se pose sur le disque
  │     └── Déclencher CSS Animation : `spin 1.8s linear infinite` sur le Vinyle
  └── SI IS_PLAYING == true :
        ├── Mettre l'audio en pause
        ├── Passer IS_PLAYING = false
        ├── Relever le bras de lecture
        └── Mettre en pause la rotation CSS (`animation-play-state: paused`)

[ ÉVÉNEMENT : TOGGLE LISTE DES CHANSONS ]
  ├── SI LIST_VISIBLE == true :
  │     ├── Animer la fermeture du panneau de pistes (Width / Opacity)
  │     ├── Passer les boutons de la Sidebar en MODE COMPACT (Masquer le texte, garder les Icônes)
  │     └── Passer LIST_VISIBLE = false
  └── SI LIST_VISIBLE == false :
        ├── Ouvrir le panneau de pistes
        ├── Afficher à nouveau les labels textuels des boutons
        └── Passer LIST_VISIBLE = true

[ ÉVÉNEMENT : SLIDER VOLUME VERTICAL ]
  └── Calculer la position Y du Drag -> Mettre à jour le gain audio + Hauteur de la jauge colorée (Vert Sauge)

STYLES ET COMPOSANT GRAPHIQUES
🔤 Typo Stack 2026Titres & Boutons Rétro : Fraunces / Chivo (Fonts variables avec de la rondeur et de la chaleur 70s).  Interface / Pistes / Chiffres : police vintage, rappelant les annees 70s 8s, sans etre ringard (pour la lisibilité fluide et moderne des compteurs de temps).  📜 CAHIER DES CHARGES DESIGN (FRONTEND 2026)1. Structure de l'Interface DesktopSidebar Rétro (Gauche) :Navigation par onglets : Audio, Vidéo, Mix (DJ Mode).  Filtres d'exploration : Albums, Musiques, Artistes.Compteur global : Durée d'écoute accumulée (Style odomètre à rouleaux mécanique rétro).Zone Principale (Centre) :Lecteur Vinyle Central : Disque 33-tours avec photo de pochette personnalisable au centre.  Background Dynamique : Pochette chargée floutée à $40px$ avec filtre sombre.  Panneau Collapsible (Liste des Pistes) : Toggle via bouton Rétro avec transition masquant le texte des boutons pour ne laisser que les icônes.Mini-Player / Deck de Contrôle (Bas) :Contrôles Média Playful : Boutons "Play/Pause/Next/Prev" façon touches mécaniques d'amplificateur vintage.  Volume Slider Vertical : Curseur vertical style table de mixage analogique avec potentiomètre physique.  Mode DJ : Double platine / fader de crossfade progressif.2. Micro-Interactions & Composants GraphiquesVinyle Animé :transform: rotate(360deg) continu sous musique en lecture (60fps via CSS / Framer Motion).  Micro-oscillation réaliste pour reproduire l'effet mécanique d'un vrai tourne-disque.  Boutons Poussoirs Pliables (Playful) :Ombres portées douces (box-shadow multicouche style Neumorphisme chaud).  Enfoncement visuel lors du clic (transform: translateY(2px)).Slider de Volume Vertical :Rail métallisé brossé ou bois avec curseur physique strié

🪵 Moodboard
Moodboard 1: "Warm Mahogany 1975" (Recommandé)

Inspiration : Tourne-disques en bois verni, lumière tamisée d'ampoule à filament, boutons poussoirs striés, hifi de salon.

Sensations : Chaleureux, réconfortant, nostalgique, tactile.

Moodboard 2: "Neon Cassette 1988"

Inspiration : Baladeurs Walkman, cassettes audio pastels, afficheurs VFD vert/ambre, plastiques mats doux.

Sensations : Amusant, playful, énergique doux, studio pop.




🎨 ANALYSE & MOODBOARD DESIGN💡
User flow & Expérience Utilisateur Lancement / État Repos : L'interface s'ouvre sur une ambiance chaleureuse façon "coin salon vinyle" des années 70/80. Le vinyle est immobile dans son bras de lecture.  Chargement du Dossier : L'utilisateur charge un dossier musical. La pochette choisie est appliquée au centre du plat de vinyle et dupliquée en background flouté dynamique avec un effet backdrop-filter. Lecture Audio : Dès la lecture, le vinyle se met à tourner à 33 tours/min avec une animation fluide à 60fps. Le bras du tourne-disque bascule doucement sur le vinyle.  Interaction Playlist & Recherche : Un bouton au look rétro "Tape Deck / Cassette" permet de masquer/afficher la liste des pistes. Au clic, le nom des boutons/onglets bascule de visible à purement iconique avec micro animations douces.  Gestion du Mix / Mode DJ : Un mode dédié permet d'enchaîner 2 pistes ou de doser un cross fader vintage.
  
    A EVITER:

Trop de couleurs différentes.

Trop de cartes et d’icônes sur la même page.

Un design trop “gaming” je veux un rendu cozy, vintage mais pas ringard ou depassé.

Le but est que l’interface fasse envie et rend nostalgique sans fatiguer l’œil.


# ELEMENTS A AJOUTER / SUIVI
- [ ] changer emplacement barrette
- [x] ajouter commentaires structurés dans le code
- [x] ajouter fichier README.md
- [x] configurer version desktop avec Tauri (Tauri v2 configuré, build web validé)