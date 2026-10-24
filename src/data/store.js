// Simple localStorage-based state persistence — no backend required
const STORE_KEY = 'c2r_data';

function getStore() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? JSON.parse(raw) : { sessions: [], settings: {} };
  } catch {
    return { sessions: [], settings: {} };
  }
}

function saveStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

export function getSessions() {
  return getStore().sessions;
}

export function saveSession(session) {
  const store = getStore();
  const existing = store.sessions.findIndex((s) => s.id === session.id);
  if (existing >= 0) {
    store.sessions[existing] = session;
  } else {
    store.sessions.unshift(session);
  }
  saveStore(store);
  return session;
}

export function deleteSession(id) {
  const store = getStore();
  store.sessions = store.sessions.filter((s) => s.id !== id);
  saveStore(store);
}

export function createSession(missionId, teacherName, className) {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    missionId,
    teacherName: teacherName || '',
    className: className || '',
    createdAt: new Date().toISOString(),
    groups: [],
    assessments: {},
    notes: '',
    completed: false,
  };
}

export function getSettings() {
  return getStore().settings;
}

export function saveSettings(settings) {
  const store = getStore();
  store.settings = { ...store.settings, ...settings };
  saveStore(store);
}
