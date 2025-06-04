import { Link, useNavigate } from "react-router"; // Corrected import
import React, { useState } from "react";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve profiles from local storage
    const profiles = JSON.parse(localStorage.getItem("profiles")) || [];

    // Check if the entered credentials match any stored profile
    const user = profiles.find(
      (profile) =>
        profile.email === formData.email &&
        profile.password === formData.password
    );

    if (user) {
      console.log("Login successful:", user);
      setError("");

      // Save the logged-in user in localStorage
      localStorage.setItem("usuario", JSON.stringify(user));

      // Redirect
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-transparent rounded-4"
                    id="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
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
                Don't have an account? <Link to="/register" className=" btn btn-danger text-light text-decoration-none">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
