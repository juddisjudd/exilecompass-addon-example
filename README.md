# ExileCompass Notes Addon (Example)

This repository is the reference TypeScript-first addon package for ExileCompass.

## Addon identity

- ID: `dev.juddisjudd.notes-addon`
- Name: `Notes Addon`
- Version: `0.4.0`

## How addons work

You author TypeScript in `src/`. The release pipeline **bundles** it with
esbuild into a single browser-runnable ESM file at `dist/panel.js`, then zips a
flat package (`plugin.manifest.json` + `dist/` + `data/` + `README.md`) and
attaches it to the GitHub Release as `exilecompass-addon.zip`.

ExileCompass downloads that asset, extracts it, validates it, and runs your
panel bundle inside a **sandboxed iframe** (opaque origin — no access to the app,
its storage, or Tauri APIs). The panel talks to the host only through the
`host` bridge passed to `mount`.

## The panel entry point

`entry.panel` points to the built bundle, which must default-export a `mount`
function:

```ts
import type { MountFn } from './types';

const mount: MountFn = async ({ root, host }) => {
  const saved = await host.storage.get('notes'); // gated by storage.read
  // ...render UI into `root`...
  await host.storage.set('notes', 'value');      // gated by storage.write
};

export default mount;
```

`root` is the element to render into; `host.storage` is per-addon persistent
key/value storage (keys are namespaced by the host, so addons can't read each
other's data). Each capability is gated by a manifest `permissions` entry.

## Package layout

Authored (committed):

- `plugin.manifest.json`
- `README.md`
- `src/` (`panel.ts`, `types.ts`)
- `data/notes.default.json` (`entry.data`)

Built (produced by `npm run build`, shipped in the release zip):

- `dist/panel.js` (`entry.panel`)

## Local development

1. Install dependencies: `npm install`
2. Type-check: `npm run check`
3. Build the bundle: `npm run build`

## Manifest rules this example follows

- Include a repo/homepage link (`homepage` or `repoUrl`).
- Point `entry.panel` (and/or `entry.main`) at a bundled `./dist/*.js` file.
- If present, keep `entry.data` under `./data/`.
- Declare a `permissions` entry for every host capability you use.

## Publishing flow for addon authors

1. Bump the version in `plugin.manifest.json` and `package.json` (they must match).
2. Tag the release `vX.Y.Z` and push the tag. The `Release Addon` workflow
   type-checks, verifies the tag matches the manifest version, builds the
   bundle, packages it, and publishes a GitHub Release with
   `exilecompass-addon.zip` attached.
3. Open a PR in the registry repository (`exilecompass-registry`) setting your
   addon's `latestVersion` to `X.Y.Z` and `repoUrl` to your GitHub repo.
4. Run the registry checks (`validate:registry`, `sync:registry`) before submitting.

ExileCompass discovers addons from the registry index, then installs by
downloading `…/releases/download/vX.Y.Z/exilecompass-addon.zip` (the tag is
derived from `latestVersion`) — so the release asset must exist.
