import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppRouter } from "./router.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./auth/auth-provider.tsx";
import { useAuth } from "./auth/use-auth.ts";

const queryClient = new QueryClient();

const AppRouter = () => {
    const auth = useAuth();

    const router = createAppRouter({
        queryClient,
        auth
    });

    return <RouterProvider router={router} />
}

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </QueryClientProvider>
    )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
