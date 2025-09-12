import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreditoPessoal from "./pages/CreditoPessoal"
import FinanciamentoImobiliario from "./pages/FinanciamentoImobiliario"
import Investimento from "./pages/Investimento"




function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}> </Route>
                <Route path="/credito-pessoal" element={<CreditoPessoal />} />
                <Route path="/financiamento-imobiliario" element={<FinanciamentoImobiliario />} />
                <Route path="/investimento" element={<Investimento />} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes