import type { MountFn } from './types';
import defaults from '../data/notes.default.json';

// Storage key (namespaced to this addon by the host).
const NOTES_KEY = 'notes';

// Seed text shown the first time, derived from the bundled default data.
const seedText = (defaults.notes as Array<{ text: string; completed: boolean }>)
  .map((n) => (n.completed ? `[x] ${n.text}` : `- ${n.text}`))
  .join('\n');

/**
 * Entry point. The host mounts this into a sandboxed iframe and passes a
 * `root` element plus the `host` bridge. Everything here runs with no access
 * to the parent app, only the explicit host API.
 */
const mount: MountFn = async ({ root, host }) => {
  const saved = await host.storage.get(NOTES_KEY);

  root.innerHTML = '';

  const help = document.createElement('p');
  help.textContent = 'Quick scratchpad for map goals, gear reminders, and crafting to-dos.';
  help.style.cssText = 'margin:0 0 8px;color:#b8b4ae;';

  const textarea = document.createElement('textarea');
  textarea.value = saved ?? seedText;
  textarea.spellcheck = false;
  textarea.style.cssText =
    'width:100%;box-sizing:border-box;min-height:160px;resize:vertical;padding:8px;' +
    'background:#121214;color:#e8e4de;border:1px solid rgba(184,180,174,0.34);' +
    'font:11px/1.4 "JetBrains Mono","Cascadia Code",Consolas,monospace;';

  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:6px;align-items:center;margin-top:8px;';

  const save = document.createElement('button');
  save.type = 'button';
  save.textContent = 'Save';
  save.style.cssText =
    'border:1px solid rgba(184,180,174,0.35);color:#e8e4de;background:#171719;' +
    'padding:4px 8px;font-size:11px;cursor:pointer;';

  const status = document.createElement('span');
  status.style.cssText = 'font-size:10px;color:#8c7c55;';

  save.addEventListener('click', async () => {
    await host.storage.set(NOTES_KEY, textarea.value);
    status.textContent = 'Saved';
    setTimeout(() => (status.textContent = ''), 1200);
  });

  bar.append(save, status);
  root.append(help, textarea, bar);
};

export default mount;
