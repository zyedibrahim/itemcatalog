import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formvalidationschema = yup.object({
  username: yup.string().required("This is fiels is required"),
  phone: yup
    .number()
    .required("This is fiels is required")
    .min(10, "Update your phone number"),
});

const formvalidationschemaforpasss = yup.object({
  old_password: yup.string().required("This is fiels is required"),
  new_password: yup
    .string()
    .required("This is fiels is required")
    .min(8, "Update your phone number"),
  confirm_newpassword: yup.string().required().min(8),
});

export function MyProfile() {
  const [getdata, setgetdata] = useState();
  const getid = localStorage.getItem("_id");
  useEffect(() => {
    fetch(`${API}/updateprofile/${getid}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setgetdata(data));
  }, []);

  console.log(getdata, "outside");

  return getdata ? (
    <div>
      <Updateprofile getdata={getdata} />
    </div>
  ) : (
    <h1 className="text-center text-white">loading...</h1>
  );
}

function Updateprofile({ getdata }) {
  const notifysuccess = (data) => toast.success(data);
  const notifyfail = (data) => toast.error(data);

  const getid = localStorage.getItem("_id");
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        username: getdata?.username,
        phone: getdata?.phone,
      },
      validationSchema: formvalidationschema,
      onSubmit: (data) => {
        console.log(data);
        updateprofile(data);
      },
    });

  const updateprofile = async (data) => {
    const dataf = await fetch(`${API}/updateprofile/${getid}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonc = await dataf.json();
    if (jsonc.status === "200 ok") {
      notifysuccess("Profile updated successfully");
    } else {
      notifyfail(jsonc.status);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="container">
        <div className=" row mb-4 d-flex justify-content-center">
          <div className="cen text-light shadow-lg col-11 col-md-6 c-p  card mt-5">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label" htmlFor="loginName">
                  username
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
              <div className="mb-4">
                <label className="form-label" htmlFor="phone">
                  Phone
                </label>
                <input
                  onBlur={handleBlur}
                  type="number"
                  id="phone"
                  value={values.phone}
                  name="phone"
                  onChange={handleChange}
                  className="form-control"
                />
                {touched.phone && errors.phone ? errors.phone : ""}
              </div>
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Update
              </button>
            </form>
          </div>
        </div>

        <div className="row d-flex justify-content-center ">
          <UpdatePassword />
        </div>
      </div>
    </div>
  );
}

function UpdatePassword() {
  const notifysuccess = (data) => toast.success(data);
  const notifyfail = (data) => toast.error(data);

  const getid = localStorage.getItem("_id");
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        old_password: "",
        new_password: "",
        confirm_newpassword: "",
      },
      validationSchema: formvalidationschemaforpasss,
      onSubmit: (data) => {
        console.log(data);
        updatepass(data);
      },
    });

  const updatepass = async (data) => {
    const dataf = await fetch(`${API}/updateprofile/password/${getid}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonc = await dataf.json();
    console.log(jsonc.status);

    if (jsonc.status !== "200 ok") {
      notifyfail(jsonc.status);
    } else {
      notifysuccess("Password updated successfully");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="col-11 text-light card c-p col-md-6">
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="old_password" className="form-label">
              Old Password
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="old_password"
              value={values.old_password}
              type="text"
              className="form-control"
            />
            {errors.old_password && touched.old_password
              ? errors.old_password
              : ""}
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="new_password"
              value={values.new_password}
              type="text"
              className="form-control"
            />
            {errors.new_password && touched.new_password
              ? errors.new_password
              : ""}
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_newpassword" className="form-label">
              ConfirmNew Password
            </label>
            <input
              onChange={handleChange}
              onBlur={handleBlur}
              name="confirm_newpassword"
              value={values.confirm_newpassword}
              type="text"
              className="form-control"
            />
            {errors.confirm_newpassword && touched.confirm_newpassword
              ? errors.confirm_newpassword
              : ""}
          </div>

          <div className="mb-2">
            <div className="d-grid">
              <button type="submit" className="mb-2 btn btn-primary">
                Change Password
              </button>
              <button onClick={() => navigate(-1)} className="btn btn-primary">
                Back
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer autoClose={2000} limit={1} />
    </div>
  );
}
