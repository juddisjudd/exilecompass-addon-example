# ExileCompass Notes Addon (Example)

This repository is the reference TypeScript-first addon package for ExileCompass.

## Addon identity

- ID: `dev.local.notes-addon`
- Name: `Notes Addon`
- Version: `0.3.0`

## Package layout

Required files and directories:

- `plugin.manifest.json`
- `README.md`
- `src/`
- `data/`

Main files in this example:

- `src/main.ts` (`entry.main`)
- `src/panel.notes.ts` (`entry.panel`)
- `src/types.ts`
- `data/notes.default.json` (`entry.data`)

## Local validation

1. Install dependencies: `npm install`
2. Type-check: `npm run check`

## Manifest rules this example follows

- Include a repo/homepage link (`homepage` or `repoUrl`).
- Keep `entry.main` under `./src/` and use TS/JS extension.
- If present, keep `entry.panel` under `./src/`.
- If present, keep `entry.data` under `./data/`.

## Publishing flow for addon authors

1. Host your addon package and manifest in your own repo/releases.
2. Open a PR in the registry repository (`exilecompass-registry`).
3. Add or update your addon entry in that repo's `registry.v1.json`.
4. Run the registry checks (`validate:registry`, `sync:registry`) before submitting.

The ExileCompass app discovers addons from the registry index and then installs from the manifest URL provided there.
