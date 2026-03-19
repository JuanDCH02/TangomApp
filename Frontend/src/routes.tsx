import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/appLayout";
import { AboutUsPage } from "./pages/AboutUsPage";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { WhereAre } from "./pages/WhereAre";
import { CreateProductPage } from "./pages/CreateProductPage";
import { EditProductPage } from "./pages/EditProductPage";




export const router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={ <AppLayout/> }>
                    <Route >
                        <Route path="/" element={ <HomePage/> } />
                        <Route path="/contacto" element={ <ContactPage/> } />
                        <Route path="/sobre-nosotros" element={ <AboutUsPage/> } />
                        <Route path="/donde-estamos" element={ <WhereAre/> } />
                        <Route path="/admin/crear-producto" element={ <CreateProductPage/> } />
                        <Route path="/admin/editar-producto/:id" element={ <EditProductPage/> } />

                    </Route>

                </Route>

            </Routes>
        
        </BrowserRouter>
    )
}