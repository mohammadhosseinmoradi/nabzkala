type Path = `/${string}`;

type RouteName = string;

type Route = {
  title?: string;
  description?: string;
  getPath: (...args: any[]) => Path;
  children?: Record<RouteName, Route>;
};

type Routes = Record<RouteName, Route>;

export const routes = {
  home: {
    getPath: () => "/",
  },
} satisfies Routes;
