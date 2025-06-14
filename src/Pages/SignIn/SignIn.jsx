import { Link, Navigate, useNavigate } from "react-router"; // Corrected import
import React, { useState } from "react";
import api from "../../services/api";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [TwofaRec, setTwofaRec] = useState("");
  const [TwofaCode, setTwofaCode] = useState("");

  const [erro, setErro] = useState("");
 const navigate = useNavigate();





  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await api.post(`Identity/login`, {
        email: email,
        password: senha,
      });

      const data = resposta.data;

      localStorage.setItem("Token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("UserEmail", email);
      alert("Login realizado com sucesso!");
      navigate("/");
      
      setEmail("");
      setSenha("");
      
    } catch (err) {
      if (err.response) {
        console.log("Erro de resposta do servidor:", err.response.data);
      } else {
        // Algo mais causou o erro
        console.log("Erro ao configurar a requisição:", err.message);
        setErro("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };
  
  return (
    <div
    className="container d-flex flex-column justify-content-center align-items-center "
    style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div>
          <h2 className="text-center mb-4 text-light">Sign In</h2>
          <div>
            <div
              id="card"
              className="card-body border-0 d-flex justify-content-center flex-column align-items-center"
            >
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-transparent rounded-4"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control bg-transparent rounded-4"
                    id="password"
                    placeholder="Enter your password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
                {erro && <p className="text-danger">{erro}</p>}
                <button
                  id="button"
                  type="submit"
                  className="btn w-100 text-light my-5 rounded-4"
                >
                  Sign In
                </button>
              </form>
              <hr
                style={{ width: "400px", height: "3px", background: "#000" }}
              />
              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className=" btn btn-danger text-light text-decoration-none"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
