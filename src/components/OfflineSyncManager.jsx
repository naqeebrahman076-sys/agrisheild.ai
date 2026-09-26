const STORAGE_KEY = 'agrishield_offline_queue_v1';

export function getOfflineLogs() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to read offline storage:', err);
    return [];
  }
}

export function saveOfflineLog(entry) {
  try {
    const current = getOfflineLogs();
    const newEntry = {
      id: 'LOG-' + Date.now(),
      timestamp: new Date().toISOString(),
      status: 'Pending Sync',
      ...entry
    };
    const updated = [newEntry, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newEntry;
  } catch (err) {
    console.error('Failed to save to local offline queue:', err);
    return null;
  }
}

export function syncOfflineLogs() {
  try {
    const logs = getOfflineLogs();
    const synced = logs.map(item => ({ ...item, status: 'Synced to DPG Cloud' }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(synced));
    return synced;
  } catch (err) {
    console.error('Sync failed:', err);
    return [];
  }
}

export function clearOfflineLogs() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear offline queue:', err);
  }
}