# BloxVerse

A Roblox-style 3D game hub that runs in the browser and installs as an app (PWA).
It has a login and sign-up page, a lobby with a menu, a friends list, an avatar colour picker,
and six playable 3D games built with [Three.js](https://threejs.org/).

**Play it:** https://abdulhameed8656006-prog.github.io/bloxverse-site/

> BloxVerse is an independent fan project. It is not affiliated with, endorsed by, or connected to Roblox Corporation.
> All names, games and artwork in this repo are original.

## Games

| Game | What you do |
| --- | --- |
| Obby World | Climb a 30-platform tower with moving platforms and narrow ledges. Reach the golden ball for 100 coins. |
| Pet Paradise | Walk into eggs to hatch pets that follow you. Rare gold pets are worth more. |
| Haunted Halls | Find 5 keys in a dark maze while a ghost chases you. |
| Neighborhood Life | Explore a town and collect cash. |
| Mystery Murder | Survive 60 seconds against the murderer and grab coins. |
| Fruit Fighters | Fight 10 bandits with the ATTACK button (or the F key). |

## Features

- Sign up and log in. Sign-up asks for a birthday, a username (3 to 20 characters, letters and numbers, at most one underscore, not at the start or end) and a password (8+ characters with a letter and a number).
- Lobby with Home, Games, Friends and Avatar tabs.
- Friends list: add friends, see who is online, and tap **Join** to jump into their game.
- Avatar shirt colour, shared across every game.
- Coins are shared across every game and saved per account.
- Works on phone and desktop. Installable and playable offline.

## Controls

| | Phone | Computer |
| --- | --- | --- |
| Move | Left joystick | W A S D or arrow keys |
| Look | Drag the screen | Drag the mouse |
| Jump | JUMP button | Space |
| Attack | ATTACK button | F |

## Project structure

```
index.html            App shell, login and lobby markup
css/style.css         Styles
js/app.js             Accounts, lobby, friends, and all six 3D games
vendor/three.min.js   Three.js r128 (stored locally so the game works offline)
sw.js                 Service worker (offline cache)
manifest.webmanifest  PWA manifest
icons/                192 and 512 px app icons
```

## Run locally

No build step. Serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. A service worker needs `localhost` or HTTPS.

## Deploy to GitHub Pages

1. Open the repo on GitHub, then **Settings > Pages**.
2. Set the source to the `main` branch and the `/ (root)` folder.
3. The site goes live at `https://abdulhameed8656006-prog.github.io/bloxverse-site/`.

## Turn it into an Android app with PWABuilder

1. Open [pwabuilder.com](https://www.pwabuilder.com/) and enter `https://abdulhameed8656006-prog.github.io/bloxverse-site/`.
2. Click **Start**. The manifest and service worker checks should pass.
3. Click **Package for stores**, choose **Android**, and fill in the form.
   The package ID must use letters, numbers and dots only, for example `io.github.abdulhameed8656006.bloxverse`.
4. Click **Generate** and download the zip. It contains the APK and AAB files and your signing key.
   **Keep the signing key and its password safe.** You need them for every future update.
5. Install the APK on your phone to test it.

Note: this site lives under `/bloxverse-site/`, so the Android app may show a browser address bar.
Full-screen mode needs a Digital Asset Links file at the root of the domain. To get that, host the site from a repo named
`abdulhameed8656006-prog.github.io`, or use a custom domain.

## Important limits

- Accounts, friends and coins are stored in each browser only (localStorage). They do not sync between devices.
- Other players are bots. Real accounts and real multiplayer need a backend such as Firebase or Supabase.
- Passwords are hashed in the browser, but this is not a replacement for real server-side authentication.
- Please do not reuse a real password from another site.

## Credits

Built with Three.js. Game design and code by the BloxVerse project.
