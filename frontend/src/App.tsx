import { Routes, Route } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetail from "./pages/NoteDetail"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import Signup from "./pages/SignUp"

const App = () => {
  return (
    <div data-theme="black">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/note/:id" element={<NoteDetail/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Signup/>} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App