// The contract the ExileCompass host provides to an addon panel.
// The host runs your bundled panel inside a sandboxed iframe and calls the
// default-exported `mount(ctx)` once the panel is shown.

export interface AddonHost {
  /**
   * Per-addon key/value storage, persisted by the host. Keys are namespaced to
   * this addon, so they never collide with other addons or the app.
   * Requires the `storage.read` / `storage.write` permissions in the manifest.
   */
  storage: {
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
  };
}

export interface PanelContext {
  /** The root element to render your panel UI into. */
  root: HTMLElement;
  /** The host API bridge (postMessage under the hood). */
  host: AddonHost;
}

export type MountFn = (ctx: PanelContext) => void | Promise<void>;
