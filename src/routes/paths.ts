export const PATHS = {
  home: {
    path: "/",
    getHref: () => "/",
  },
  create: {
    path: "/create",
    getHref: () => "/create",
  },
  edit: {
    path: "/edit/:id",
    getHref: (id: string | number) => `/edit/${id}`,
  },
  play: {
    path: "/play/:id",
    getHref: (id: string | number) => `/play/${id}`,
  },
} as const;
