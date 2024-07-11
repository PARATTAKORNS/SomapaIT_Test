import { Route, BrowserRouter, Routes } from "react-router-dom"
import App from "./App"
import Edit from "./components/Edit"

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="edit/:id" element={<Edit />} />
        </Routes>
    </BrowserRouter>
  )
}