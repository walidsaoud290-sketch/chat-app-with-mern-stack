import React, { useContext } from "react";
import "./SignUp.css";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../../App";
import { usePostMethod } from "../../fetching_to_backend/to_backend";

const SignUp = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const { errors, setErrors, setUser, userApp } = useContext(context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const api = await usePostMethod("/auth/signUp", {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      const status = api.status;
      console.log(status);
      if (status === 200) {
        localStorage.setItem("email", JSON.stringify(email.current.value));
        setErrors({});
        setIsFormValid(true);
        navigate("/chat/contact");
      }
      console.log(api.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setErrors(error.response.data);
      }
      console.log("Error Sign up :" + error);
    }
  };

  return (
    <>
      <div className="signUp">
        <div className="content">
          <div className="text">Sign up</div>

          <form>
            <div className="field">
              <input
                ref={username}
                placeholder="Username"
                type="text"
                className="input"
              />

              <span className="span">
                <svg
                  xmlSpace="preserve"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  viewBox="0 0 512 512"
                  height="20"
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      fill="#595959"
                      d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 
                    135-60.561 135-135S330.439 0 256 0zM423.966 
                    358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 
                    0-101.006 20.667-137.966 58.195C51.255 
                    395.539 31 444.833 31 497c0 8.284 6.716 15 
                    15 15h420c8.284 0 15-6.716 
                    15-15 0-52.167-20.255-101.461-57.034-138.805z"
                    />
                  </g>
                </svg>
              </span>

              <label className="label">Username</label>
            </div>
            {errors?.username && (
              <p className="text-danger"> {errors.username} </p>
            )}
            <div className="field">
              <input
                placeholder="Email"
                ref={email}
                type="email"
                className="input"
              />

              <span className="span">
                <svg
                  xmlSpace="preserve"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  viewBox="0 0 512 512"
                  height="20"
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path
                      fill="#595959"
                      d="M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 
                    135-60.561 135-135S330.439 0 256 0zM423.966 
                    358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 
                    0-101.006 20.667-137.966 58.195C51.255 
                    395.539 31 444.833 31 497c0 8.284 6.716 15 
                    15 15h420c8.284 0 15-6.716 
                    15-15 0-52.167-20.255-101.461-57.034-138.805z"
                    />
                  </g>
                </svg>
              </span>

              <label className="label">Email</label>
            </div>
            {errors?.email && <p className="text-danger"> {errors.email} </p>}
            <br />

            <div className="field">
              <input
                ref={password}
                placeholder="password"
                type="password"
                className="input"
              />

              <span className="span">
                <svg
                  xmlSpace="preserve"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  viewBox="0 0 512 512"
                  height="20"
                  width="50"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g>
                    <path
                      fill="#595959"
                      d="M336 192h-16v-64C320 57.406 262.594 0 192 0S64 
                    57.406 64 128v64H48c-26.453 0-48 21.523-48 
                    48v224c0 26.477 21.547 48 48 
                    48h288c26.453 0 48-21.523 
                    48-48V240c0-26.477-21.547-48-48-48zm-229.332-64c0-47.063 
                    38.27-85.332 85.332-85.332s85.332 
                    38.27 85.332 85.332v64H106.668z"
                    />
                  </g>
                </svg>
              </span>

              <label className="label">Password</label>
            </div>
            {errors?.password && (
              <p className="text-danger"> {errors.password} </p>
            )}
            {errors?.error_message && (
              <p className="text-danger"> {errors.error_message} </p>
            )}
            <button type="submit" className="button" onClick={handleSubmit}>
              Sign up
            </button>

            <div className="sign-up">
              {" "}
              <Link to="/">remembered ?</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
