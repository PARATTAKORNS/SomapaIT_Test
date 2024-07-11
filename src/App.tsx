import Fillbox from "./components/Fillbox"
import Edit from "./components/Edit"
import { BrowserRouter,Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Fillbox />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
