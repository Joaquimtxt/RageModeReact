
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "bootstrap-icons/font/bootstrap-icons.css"
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./Pages/Home/Home";
import Games from "./Pages/Games/Games";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './Pages/Register/Register';
import CreatePost from './Pages/Posts/CreatePost';
function App() {

  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/games" element={<Games/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/sendpost" element={<CreatePost/>} />
    </Routes>
    <Footer/>
  </Router>
  )
}

export default App
