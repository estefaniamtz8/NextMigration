const excludeRoutes = ['/login', '/register', '/forgot-password'];

const isExcludeRoute = (pathname) => excludeRoutes.some((route) => route === pathname);

export { isExcludeRoute, excludeRoutes };
