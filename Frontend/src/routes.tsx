import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/appLayout";
import { AboutUsPage } from "./pages/AboutUsPage";
import { HomePage } from "./pages/homePage";
import { ContactPage } from "./pages/contactPage";
import { WhereAre } from "./pages/WhereAre";




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

                    </Route>

                </Route>

            </Routes>
        
        </BrowserRouter>
    )
}