import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CreditoPessoal from "./pages/CreditoPessoal"
import FinanciamentoImobiliario from "./pages/FinanciamentoImobiliario"
import Investimento from "./pages/Investimento"
import Configurations from "./pages/Configurations"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from "./components/PrivateRoute"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ROTA PÚBLICA: Todos podem acessar */}
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />

                {/* ROTAS PRIVADAS: Somente usuários logados podem acessar */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/credito-pessoal" element={<CreditoPessoal />} />
                    <Route path="/financiamento-imobiliario" element={<FinanciamentoImobiliario />} />
                    <Route path="/investimento" element={<Investimento />} />
                    <Route path="/configuracoes" element={<Configurations />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes