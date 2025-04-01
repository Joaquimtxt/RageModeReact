
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";

function App() {

  return (
    <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home apiUrl={apiUrl} options={options} />} />
    </Routes>
    <Footer />
  </Router>
  )
}

export default App
