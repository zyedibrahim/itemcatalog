import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../data";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

const formvalidationschema = yup.object({
  email: yup.string().email("email field required").required(),
});

export function Forgotpage() {
  const successnotify = (data) => toast.success(data);
  const warningnotify = (data) => toast.warning(data);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formvalidationschema,
    onSubmit: (values) => {
      console.log(values);
      sendemail(values);
    },
  });

  const sendemail = async (data) => {
    await fetch(`${API}/user/forgotpassword/send`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "400") {
          successnotify(data.status);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          warningnotify("This Email Not Exist");
        }
      });
  };

  return (
    <div>
      <div className="container ">
        <div className="row mt-5 d-flex justify-content-center">
          <div className=" col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="mb-2">
              <div className="h3 text-white text-center ">
                Reset Link We Will Be Sent On Register Email
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card p-3">
                <div className="mb-2">
                  <label htmlFor="Email" className="form-label">
                    Email
                  </label>
                  <input
                    id="Email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                  <ToastContainer />
                  <div className="d-flex justify-content-between">
                    <Link to="/" className="mt-1 text-decoration-none">
                      Login
                    </Link>
                    <Link to="/signup" className="mt-1 text-decoration-none">
                      Signup
                    </Link>
                  </div>

                  <div className="text-muted text-center">
                    <h6>Contact about us </h6>
                    <h6>exapamle@gmail.com</h6>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
