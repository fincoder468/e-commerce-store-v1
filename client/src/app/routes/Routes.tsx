import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import { HomePage } from "../../features/home/HomePage";
import { Catalog } from "../../features/catalog/Catalog";
import { ProductDetails } from "../../features/catalog/ProductDetails";
import { AboutPage } from "../../features/about/AboutPage";
import { ContactPage } from "../../features/Contact/ContactPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: '/catalog', element: <Catalog />},
            {path: '/catalog/:id', element: <ProductDetails />},
            {path: '/about', element: <AboutPage />},
            {path: '/contact', element: <ContactPage />},
            
        ]
    }
],{
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_dataRouterSuspense: true,
        v7_errorBoundary: true,
    }
})