import { Link } from "react-router";

const SignIn = () => {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center "
      style={{ minHeight: "100vh"}}
    >
      <div className="row justify-content-center">
        <div>
          <h2 className="text-center mb-4 text-light">Sign In</h2>
          <div>
            <div
              id="card"
              className="card-body border-0 d-flex justify-content-center flex-column align-items-center"
            > 
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" placeho>
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control bg-transparent rounded-4"
                    id="email"
                    placeholder="Enter your email"
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
                  />
                </div>
                <button id="button" type="submit" className="btn w-100 text-light my-5 rounded-4">
                  Sign In
                </button>
              </form>
              <hr style={{width:"400px", height:"3px", background:"#000"}}/>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/signup" className=" btn btn-danger text-light text-decoration-none">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
