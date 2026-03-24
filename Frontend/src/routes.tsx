import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/appLayout";
import { AboutUsPage } from "./pages/AboutUsPage";
import { HomePage } from "./pages/HomePage";
import { ContactPage } from "./pages/ContactPage";
import { WhereAre } from "./pages/WhereAre";
import { CreateProductPage } from "./pages/CreateProductPage";
import { EditProductPage } from "./pages/EditProductPage";
import { AdminPage } from "./pages/AdminPage";
import { ConfirmDelete } from "./components/forms/ConfirmDelete";





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
                        <Route path="/admin" element={ <AdminPage/> } />
                        <Route path="/admin/crear-producto" element={ <CreateProductPage/> } />
                        <Route path="/admin/editar-producto/:id" element={ <EditProductPage/> } />
                        <Route path="/admin/eliminar-producto/:id" element={ <ConfirmDelete/> } />

                    </Route>

                </Route>

            </Routes>
        
        </BrowserRouter>
    )
}