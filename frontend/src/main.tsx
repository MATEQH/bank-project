import {StrictMode, useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppRouter } from "./router.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {useAppDispatch, useAppSelector} from "./store/hooks.ts";
import {fetchCurrentUser} from "./store/authSlice.ts";

const queryClient = new QueryClient();

const AppRouter = () => {
    const dispath = useAppDispatch();

    const { user, isLoading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispath(fetchCurrentUser());
    }, [dispath]);

    const router = createAppRouter({
        queryClient,
        auth: { user, isLoading }
    });

    return <RouterProvider router={router}/>
}

export const App = () => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <AppRouter/>
                </Provider>
            </QueryClientProvider>
            <ToastContainer aria-label={"toast"} theme={"dark"} position={"bottom-right"}/>
        </>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
    </StrictMode>,
)
