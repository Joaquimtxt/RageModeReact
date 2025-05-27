import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // Added useNavigate

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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

    const existingProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    const updatedProfiles = [
      ...existingProfiles,
      { name: formData.name, password: formData.password },
    ];
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

    // Save the current user in localStorage
    localStorage.setItem(
      "usuario",
      JSON.stringify({
        name: formData.name, // Save only the name
        password: formData.password, // Save only the password
      })
    );

    // Redirect
    navigate("/");
  };

  return (
    <>
      <div
        className="container d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "100vh", marginTop: "auto" }}
      >
        <div className="row justify-content-center">
          <div>
            <h2 className="text-center mb-4 text-light">Sign Up</h2>
            <div>
              <div
                id="card"
                className="card-body border-0 d-flex justify-content-center flex-column align-items-center"
              >
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-4 bg-transparent"
                      id="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-4 bg-transparent"
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
                      className="form-control rounded-4 bg-transparent"
                      id="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 bg-black text-light my-5 rounded-4"
                  >
                    Sign Up
                  </button>
                </form>
                <hr
                  style={{ width: "400px", height: "3px", background: "#000" }}
                />
                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link
                    className="text-decoration-none text-light btn btn-danger"
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
