# Figure Forge Studio

Figure Forge Studio is a compact, browser-based 3D character customizer. It
started as an interface experiment and is published as a small open-source
toy for artists, developers, students, and anyone curious about Three.js.

Everything needed for the demo character—geometry, hair, and textures—is
embedded in `index.html`. There is no build step, backend, account, or data
collection.

## Features

- Real textured OBJ character rendered with Three.js
- Height, build, and shoulder-width adjustments
- Skin, hair, eye, and outfit color tints
- Four starting presets and session-only custom presets
- Front, side, back, and three-quarter camera views
- Orbit, zoom, and wireframe inspection
- Application-neutral JSON configuration export
- Single-file application that can be opened locally or hosted on GitHub Pages

## Try it locally

Download or clone the repository and open `index.html` in a current desktop
browser. An internet connection is required to load Three.js from cdnjs.

You can also serve the folder locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to its default branch.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**, choose the default branch and `/ (root)`,
   then save.

No build action is required.

## Project structure

```text
.
├── .github/workflows/check.yml  # Lightweight repository validation
├── scripts/validate.mjs         # Checks embedded geometry and textures
├── index.html                   # Complete application and embedded assets
├── README.md
├── LICENSE                      # MIT license for the application code
├── THIRD_PARTY_NOTICES.md       # Three.js and character-asset notices
├── CONTRIBUTING.md
└── CHANGELOG.md
```

## Honest limitations

The included character is a legacy static Poser OBJ, not a modern skinned
avatar. It has no browser-ready skeleton or morph targets. Figure Forge Studio
therefore changes supported overall proportions and material tints; it does
not claim to reshape facial features, pose limbs, replace clothes, or export a
new 3D mesh. Those features would require a rigged glTF/GLB asset with morph
targets.

Session presets are kept in memory and disappear when the page is closed. Use
the JSON export if you want to retain a configuration.

## Credits and asset provenance

Figure Forge Studio was prepared by **Andreas Holzer** with development
assistance from OpenAI Codex.

The embedded character arrived in the source collection under the internal
labels **“CH Yakecan”** and **“Danation.”** The supplied archive contained no
named author, copyright holder, license filename, or source URL. Those labels
are preserved throughout the project so the asset is not presented as
anonymous or newly authored. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
for the complete notice.

## License

The application code is available under the [MIT License](LICENSE). Embedded
third-party material is documented separately and is not relicensed by the
code license.
