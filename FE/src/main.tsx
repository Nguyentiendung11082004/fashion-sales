import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css'
import { StyleProvider } from "@ant-design/cssinjs";

import App from "./App";
import { AppContextProviders } from "./common/context";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    }
});
ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <StyleProvider layer>
                <AppContextProviders>
                    <App />
                </AppContextProviders>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </StyleProvider>
        </BrowserRouter>
    </QueryClientProvider>
);