export interface NotesEntry {
  id: string;
  text: string;
  pinned: boolean;
  completed: boolean;
}

export interface NotesDataFile {
  version: number;
  notes: NotesEntry[];
}

export interface AddonPanelDescriptor {
  id: string;
  title: string;
  description: string;
}

export interface NotesAddonModule {
  id: string;
  version: string;
  panel: AddonPanelDescriptor;
  dataPath: string;
}
