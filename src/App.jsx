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
import SelectCharacter from "./Pages/SelectCharacter/SelectCharacter"; 
import Footer from "./components/Footer/Footer";
import Register from "./Pages/Register/Register";
import CreatePost from "./Pages/Posts/CreatePost";
import CharacterInfo from "./Pages/CharacInfo/CharacterInfo";
import AddGame from "./Pages/Games/AddGame";
import Perfil from "./Pages/Perfil"; 
import PostPage from "./Pages/Posts/PostPage";
import AddCharacter from "./Pages/SelectCharacter/AddCharacter";

function App() {



  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/characterinfo" element={<CharacterInfo />} />
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/signin" element={<SigIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/games/:jogoId/character" element={<SelectCharacter />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendpost" element={<CreatePost />} />
        <Route path="/characterInfo" element={<CharacterInfo />} />
        <Route path="/addGame" element={<AddGame />} />
        <Route path="/post/:id" element={<PostPage/>} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/games/:jogoId/addcharacter" element={<AddCharacter />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
