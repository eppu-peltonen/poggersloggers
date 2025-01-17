import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import {Bryitt} from "./components/Bryitt"
import {routes} from "./routes"

export const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Bryitt />} />
                    {routes.map((route, index) => (
                        <Route key={index} path={route.url} element={route.component} />
                    ))}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}