import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import type { AuthContextType } from "./auth/auth-context.tsx";
import Index from "./routes";
import Login from "./routes/login.tsx";
import Register from "./routes/register.tsx";

export interface RouterContext {
    queryClient: QueryClient;
    auth: AuthContextType;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: () => <Outlet/>
});

const requireAuth = ({context}: { context: RouterContext }) => {
    if (context.auth.isLoading) return;

    if (!context.auth.user) throw redirect({
        to: "/auth/login"
    });
}

const requireNoAuth = ({context}: { context: RouterContext }) => {
    if (context.auth.isLoading) return;

    if (context.auth.user) throw redirect({
        to: "/"
    });
}

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    beforeLoad: requireAuth,
    component: Index
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/auth/login",
    beforeLoad: requireNoAuth,
    component: Login
});

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/auth/register",
    beforeLoad: requireNoAuth,
    component: Register
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute
]);

export const createAppRouter = (context: RouterContext) => {
    return createRouter({
        routeTree,
        context
    });
}