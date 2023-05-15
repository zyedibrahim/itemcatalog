import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { useState } from "react";
import { API } from "../data";

const formvalidationschema = yup.object({
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password must be at least 8 characters"),
});

export function ConfirmPassword() {
  const successnotify = (data) => toast.success(data);

  const { handleChange, handleSubmit, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        password: "",
      },
      validationSchema: formvalidationschema,
      onSubmit: async (values) => {
        reset(values);
        console.log(values);
      },
    });

  let [state, setstate] = useSearchParams();

  const navigate = useNavigate();

  const [check, setcheck] = useState("false");

  async function reset(values) {
    const id = state.get(`id`);
    const token = state.get(`token`);
    await fetch(`${API}/users/resetpassword?id=${id}&token=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => data.json())
      .then((data) => {
        successnotify(data.status);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
  }

  return (
    <div className="container">
      <div className="row mt-5 ">
        <div className="d-flex justify-content-center">
          <div className=" col-xl-5 col-lg-6 col-md-6 col-sm-10 col-10 shadow-lg card">
            <div className="card-header text-center h3 border-bottom-0 mt-2">
              Reset Your Password
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-container">
                  <div className="mb-2">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type={check === false ? "text" : "password"}
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      name="password"
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
                  <div className=" d-grid">
                    <button type="submit" className="btn btn-warning">
                      Submit
                    </button>
                  </div>

                  <div className="text-muted  mt-2 text-center">
                    Make Sure Password Must Be Strong ?
                  </div>
                </div>
                <ToastContainer autoClose={2000} limit={1} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
