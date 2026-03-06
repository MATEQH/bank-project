import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppRouter } from "./router.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./auth/auth-provider.tsx";
import { useAuth } from "./auth/use-auth.ts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const AppRouter = () => {
    const auth = useAuth();

    const router = createAppRouter({
        queryClient,
        auth
    });

    return <RouterProvider router={router}/>
}

export const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AppRouter/>
                </AuthProvider>
            </QueryClientProvider>
            <ToastContainer aria-label={"toast"} theme={"light"} position={"bottom-right"}/>
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
