import { notesPanelDescriptor } from './panel.notes';
import type { NotesAddonModule } from './types';

export const notesAddonModule: NotesAddonModule = {
  id: 'dev.local.notes-addon',
  version: '0.3.0',
  panel: notesPanelDescriptor,
  dataPath: './data/notes.default.json',
};

export default notesAddonModule;
