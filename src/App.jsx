
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./Pages/Home/Home";
import Games from "./Pages/Games/Games";

function App() {

  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/games" element={<Games/>} />
    </Routes>
    <Footer />
  </Router>
  )
}

export default App
