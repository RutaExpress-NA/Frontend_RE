const STORAGE_PREFIX = "rutaexpress_mock_";

function loadFromStorage(key, seedData) {
  const raw = localStorage.getItem(STORAGE_PREFIX + key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      //
    }
  }
  const seeded = JSON.parse(JSON.stringify(seedData));
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(seeded));
  return seeded;
}

function saveToStorage(key, data) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
}

export function createMockStore(key, seedData) {
  let data = loadFromStorage(key, seedData);

  return {
    getAll: () => data,
    getById: (id) => data.find((item) => item.id === id) ?? null,
    create: (item) => {
      data = [...data, item];
      saveToStorage(key, data);
      return item;
    },
    update: (id, changes) => {
      data = data.map((item) => (item.id === id ? { ...item, ...changes } : item));
      saveToStorage(key, data);
      return data.find((item) => item.id === id);
    },
    remove: (id) => {
      data = data.filter((item) => item.id !== id);
      saveToStorage(key, data);
    },
    reset: () => {
      data = JSON.parse(JSON.stringify(seedData));
      saveToStorage(key, data);
    },
  };
}
