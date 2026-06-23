# ExileCompass Notes Addon (Example)

This directory contains a TypeScript-first addon example that matches the enforced addon package layout.

Addon identity:
- ID: dev.local.notes-addon
- Name: Notes Addon
- Version: 0.3.0

Required structure:
- plugin.manifest.json
- README.md
- src/
- data/

TypeScript source files:
- src/main.ts: typed addon module entrypoint (`entry.main`).
- src/panel.notes.ts: typed panel descriptor (`entry.panel`).
- src/types.ts: shared addon interfaces.

Data files:
- data/notes.default.json: starter notes seed data (`entry.data`).

Tooling files:
- package.json: minimal scripts/dev dependencies.
- tsconfig.json: strict type-check config.

Validation:
- Run `npm install` then `npm run check` (or use your preferred package manager equivalent).

Current local flow in app:
- Discover reads c:/Repos/poe2/exilecompass-registry/registry.v1.json.
- The `dev.local.notes-addon` entry maps to this directory's plugin.manifest.json.
- Install from Discover installs the manifest locally as a temporary dev path until package download + verification is implemented.
