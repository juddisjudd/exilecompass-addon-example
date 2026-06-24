// The contract the ExileCompass host provides to an addon panel.
// The host runs your bundled panel inside a sandboxed iframe and calls the
// default-exported `mount(ctx)` once the panel is shown.

/** A gem in an imported build's skill group. */
export interface AddonBuildGem {
  name: string;
  type: 'skill' | 'support' | 'spirit';
}

/** One linked skill group (the active gem plus its supports). */
export interface AddonBuildSkillGroup {
  mainSkill: string;
  mainType: AddonBuildGem['type'];
  supports: AddonBuildGem[];
}

/** One equipped item from an imported build. */
export interface AddonBuildItem {
  slot: string;
  name: string;
  base: string;
  rarity: 'Normal' | 'Magic' | 'Rare' | 'Unique';
  mods: string[];
  corrupted: boolean;
  quality?: number;
  itemLevel?: number;
  requirements?: { level?: number; str?: number; dex?: number; int?: number };
}

export interface AddonBuildSkillSet {
  id: string;
  name: string;
  skillGroups: AddonBuildSkillGroup[];
}

export interface AddonBuildItemSet {
  id: string;
  name: string;
  items: AddonBuildItem[];
}

/**
 * The player's active imported build (from Path of Building or a GGG `.build`
 * file). Skill sets and item sets are independent dimensions — use
 * `activeSkillSet` / `activeItemSet` to index the currently selected ones.
 */
export interface AddonBuild {
  className: string;
  ascendClassName: string;
  level: number;
  /** Present for GGG `.build` imports. */
  buildName?: string;
  source?: 'pob' | 'ggg';
  skillSets: AddonBuildSkillSet[];
  itemSets: AddonBuildItemSet[];
  activeSkillSet: number;
  activeItemSet: number;
  notes: string;
  /** When the build was imported (ms since epoch). */
  importedAt: number;
}

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
  /**
   * Read the player's imported character build. Returns `null` if none has been
   * imported. Requires the `builds.read` permission in the manifest.
   */
  builds: {
    getActive(): Promise<AddonBuild | null>;
    /**
     * Subscribe to build imports/changes while your panel is open. The callback
     * receives the new build (or `null` if it was cleared). Returns a function
     * that unsubscribes. Requires `builds.read`.
     */
    onChange(cb: (build: AddonBuild | null) => void): () => void;
  };
}

export interface PanelContext {
  /** The root element to render your panel UI into. */
  root: HTMLElement;
  /** The host API bridge (postMessage under the hood). */
  host: AddonHost;
}

export type MountFn = (ctx: PanelContext) => void | Promise<void>;
