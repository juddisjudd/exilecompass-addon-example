# ExileCompass Notes Addon (Example)

This repository is the reference TypeScript-first addon package for ExileCompass.

## Addon identity

- ID: `dev.juddisjudd.notes-addon`
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

1. Bump the version in `plugin.manifest.json` and `package.json` (they must match).
2. Tag the release `vX.Y.Z` and push the tag. The `Release Addon` workflow
   type-checks, verifies the tag matches the manifest version, and publishes a
   GitHub Release.
3. Open a PR in the registry repository (`exilecompass-registry`) setting your
   addon's `latestVersion` to `X.Y.Z` and `repoUrl` to your GitHub repo.
4. Run the registry checks (`validate:registry`, `sync:registry`) before submitting.

ExileCompass discovers addons from the registry index, then installs by
downloading the GitHub source archive for `repoUrl` at tag `vX.Y.Z`
(derived from `latestVersion`) — so the tag must exist as a release.
