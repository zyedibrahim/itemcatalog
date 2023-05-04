import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const formvalidationschema = yup.object({
  username: yup.string().required("This is fiels is required"),
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Passwords must be at least 8 characters"),
});

export function Login() {
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: formvalidationschema,
      onSubmit: (data) => {
        login(data);
      },
    });
  const navigate = useNavigate();

  setInterval(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("adtoken")) {
      window.location.href = "/home";
    }
    console.log("happens");
  }, 200000);

  const login = async (data) => {
    const dataf = await fetch(`${API}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsondata = await dataf.json();
    console.log(jsondata);
    const notifysuccess = (data) => toast.success(data);
    const notifyfail = (data) => toast.error(data);

    if (jsondata.status === "Login successful") {
      if (!jsondata.token) {
        localStorage.setItem("adtoken", jsondata.adtoken);
        localStorage.setItem("_id", jsondata._id);
        notifysuccess(jsondata.status);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        localStorage.setItem("token", jsondata.token);
        localStorage.setItem("username", jsondata.username);
        localStorage.setItem("_id", jsondata._id);
        notifysuccess(jsondata.status);
        setTimeout(() => {
          navigate("/product");
        }, 3000);
      }
    } else {
      console.log(jsondata.status, "erroro message noitiudy");
      notifyfail(jsondata.status);
    }
  };

  const [check, setcheck] = useState("false");
  return (
    <div>
      <div className="container">
        <div className=" row d-flex justify-content-center">
          <div className="cen shadow-lg col-11 col-md-6 col-lg-4 col-xl-4 card mt-5">
            <form className="card-body" onSubmit={handleSubmit}>
              <ul className="nav nav-pills nav-justified mb-3" id="ex1">
                <li className="nav-item" role="presentation">
                  <a className="nav-link active" id="tab-login" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="tab-register" href="/createuser">
                    Register
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  className="tab-pane fade show active"
                  id="pills-login"
                  role="tabpanel"
                  aria-labelledby="tab-login"
                >
                  <div className="text-center mb-3">
                    <p>Sign in with:</p>
                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <i className="fab fa-google"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <i className="fab fa-twitter"></i>
                    </button>

                    <button
                      type="button"
                      className="btn btn-link btn-floating mx-1"
                    >
                      <i className="fab fa-github"></i>
                    </button>
                  </div>

                  <p className="text-center">or:</p>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                      Email or username
                    </label>
                    <input
                      onBlur={handleBlur}
                      type="text"
                      id="loginName"
                      value={values.username}
                      name="username"
                      onChange={handleChange}
                      className="form-control"
                    />
                    {touched.username && errors.username ? errors.username : ""}
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginPassword">
                      Password
                    </label>
                    <input
                      onBlur={handleBlur}
                      value={values.password}
                      name="password"
                      onChange={handleChange}
                      type={check === false ? "text" : "password"}
                      id="loginPassword"
                      className="form-control"
                    />
                    {touched.password && errors.password ? errors.password : ""}
                  </div>

                  <div className="mt-2 mb-2 form-check">
                    <input
                      id="show"
                      value=""
                      className="form-check-input"
                      onClick={() => setcheck(!check)}
                      type="checkbox"
                    />
                    <label className="form-check-label" htmlFor="show">
                      Show Password
                    </label>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6 d-flex justify-content-center"></div>

                    <div className="col-md-6 d-flex justify-content-center">
                      <Link to="/forgotpage">Forgot password?</Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign in
                  </button>

                  <div className="text-center">
                    <p>
                      Not a member? <a href="/signup">Register</a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row mt-3 mb-3 d-flex justify-content-end">
          <div className="col-10 col-md-3">
            <div className="card text-center bg-dark text-light">
              <div className="card-body">
                <div className="card-text text-center"> Admin Account </div>

                <div className="card-text"> Name : adminuser </div>
                <div className="card-text"> Password : 123456789 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
