import { MOCK_QUIZZES, MOCK_QUESTIONS } from "@/api/data";

const SEED_DATA: Record<string, any[]> = {
  quizzes: MOCK_QUIZZES,
  questions: MOCK_QUESTIONS,
};

const DB_PREFIX = "quiz-app-db-";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const parseUrl = (url: string) => {
  const parts = url.replace(/^\//, "").split("/");
  return {
    resource: parts[0],
    id: parts[1] ? Number(parts[1]) : null,
  };
};

const loadData = (resource: string): any[] => {
  const key = `${DB_PREFIX}${resource}`;
  const stored = localStorage.getItem(key);

  if (stored) return JSON.parse(stored);

  const seed = SEED_DATA[resource] || [];
  if (seed.length > 0) {
    localStorage.setItem(key, JSON.stringify(seed));
  }
  return seed;
};

const saveData = (resource: string, data: any[]) => {
  localStorage.setItem(`${DB_PREFIX}${resource}`, JSON.stringify(data));
};

export const localStorageService = {
  get: async <T>(url: string): Promise<T> => {
    await delay(300);
    const { resource, id } = parseUrl(url);
    const items = loadData(resource);

    if (id !== null) {
      const item = items.find((i) => i.id === id);
      if (!item) throw new Error(`Not found in ${resource}`);
      return item as T;
    }

    return items as T;
  },

  post: async <T>(url: string, data: any): Promise<T> => {
    await delay(300);
    const { resource } = parseUrl(url);
    const items = loadData(resource);

    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem = { ...data, id: newId };

    saveData(resource, [...items, newItem]);
    return newItem as T;
  },

  put: async <T>(url: string, data: any): Promise<T> => {
    await delay(300);
    const { resource, id } = parseUrl(url);
    if (id === null) throw new Error("ID required for PUT");

    const items = loadData(resource);
    const index = items.findIndex((i) => i.id === id);

    if (index === -1) throw new Error(`Not found in ${resource}`);

    const updatedItem = { ...items[index], ...data };
    items[index] = updatedItem;

    saveData(resource, items);
    return updatedItem as T;
  },

  delete: async <T>(url: string): Promise<T> => {
    await delay(300);
    const { resource, id } = parseUrl(url);
    if (id === null) throw new Error("ID required for DELETE");

    const items = loadData(resource);
    saveData(
      resource,
      items.filter((i) => i.id !== id),
    );

    return {} as T;
  },
};
