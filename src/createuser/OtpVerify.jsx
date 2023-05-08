import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { API } from "../data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formvalidationschema = yup.object({
  otp: yup.string().required("Enter a OTP"),
});

export function OtpVerify() {
  const notifysuccess = (data) => toast.success(data);
  const notifyfail = (data) => toast.error(data);

  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        otp: "",
      },
      validationSchema: formvalidationschema,
      onSubmit: (data) => {
        console.log(data);
        otpverfy(data);
      },
    });
  const navigate = useNavigate();
  const otpverfy = async (data) => {
    await fetch(`${API}/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "200 ok") {
          notifysuccess("Your Account is Acctivated");
          localStorage.removeItem("otpverfyroute");
          navigate("/home");
        } else {
          notifyfail(data.status);
        }
      });
  };

  return (
    <div className="container">
      <div className="otp-con">
        <div className="mb-3 mt-3">
          <div className="row d-flex justify-content-center">
            <div className="col-6 text-center">
              <div className="h1 text-white">OTP Verification</div>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-10 col-md-6 col-lg-5 col-xl-5 card ">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="mb-2 text-center fs-2">Enter OTP</div>

                  <input
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="otp"
                    value={values.otp}
                    type="text"
                    placeholder="Enter a OTP"
                    className="form-control"
                  />
                  <div className="mt-2">
                    {touched.otp && errors.otp ? errors.otp : ""}
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
