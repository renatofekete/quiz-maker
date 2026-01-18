import { MOCK_QUIZZES, MOCK_QUESTIONS } from "@/api/data";

const SEED_DATA: Record<string, any[]> = {
  quizzes: MOCK_QUIZZES,
  questions: MOCK_QUESTIONS,
};

const DB_PREFIX = "quiz-app-db-";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

const archiveQuestions = (questions: any[]) => {
  if (!questions) return;
  const pool = loadData("questions");
  let updated = false;

  questions.forEach((q) => {
    if (
      q.question &&
      q.answer &&
      !pool.find((p) => p.question === q.question)
    ) {
      pool.push(q);
      updated = true;
    }
  });

  if (updated) saveData("questions", pool);
};

export const localStorageService = {
  get: async <T>(url: string): Promise<T> => {
    await delay(300);
    const parts = url.replace(/^\//, "").split("/");
    const resource = parts[0];
    const id = parts[1] ? Number(parts[1]) : null;

    if (resource === "questions" && !id) {
      return loadData("questions") as unknown as T;
    }

    const items = loadData(resource);
    if (id !== null) {
      const item = items.find((i) => i.id === id);
      if (!item) throw new Error("Item not found");
      return item as T;
    }
    return items as T;
  },

  post: async <T>(url: string, data: any): Promise<T> => {
    await delay(300);
    const resource = url.replace(/^\//, "").split("/")[0];
    const items = loadData(resource);

    if (resource === "quizzes") archiveQuestions(data.questions);

    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem = { ...data, id: newId };
    saveData(resource, [...items, newItem]);
    return newItem as T;
  },

  put: async <T>(url: string, data: any): Promise<T> => {
    await delay(300);
    const parts = url.replace(/^\//, "").split("/");
    const [resource, idStr] = parts;
    const id = Number(idStr);

    const items = loadData(resource);
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) throw new Error("Could not find item to update");

    if (resource === "quizzes") archiveQuestions(data.questions);

    items[index] = { ...items[index], ...data };
    saveData(resource, items);
    return items[index] as T;
  },

  delete: async <T>(url: string): Promise<T> => {
    await delay(300);
    const parts = url.replace(/^\//, "").split("/");
    const [resource, idStr] = parts;
    const id = Number(idStr);

    const items = loadData(resource);

    if (resource === "quizzes") {
      const quizToDelete = items.find((i) => i.id === id);
      if (quizToDelete) archiveQuestions(quizToDelete.questions);
    }

    const filtered = items.filter((i) => i.id !== id);
    saveData(resource, filtered);
    return {} as T;
  },
};
