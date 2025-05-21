import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./Pages/Home/Home";
import Games from "./Pages/Games/Games";
import Header from "./components/Header/Header";
import SigIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp";
import SelectCharacter from "./Pages/SelectCharacter"; ".Pages/SelectCharacter";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/signin" element={<SigIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select-character" element={<SelectCharacter />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
