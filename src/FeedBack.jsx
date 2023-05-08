import { API } from "./data";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";

export const formvalidationschema = yup.object({
  feedback: yup.string().required("FeedBack is required"),
});

export function FeedBack({ setnavbarclr, navbarclr }) {
  const notifysuccess = (data) => toast.success(data);
  const notifyfail = (data) => toast.error(data);

  const {
    values,
    handleSubmit,
    touched,
    resetForm,
    handleBlur,
    errors,
    handleChange,
  } = useFormik({
    initialValues: {
      feedback: "",
    },
    validationSchema: formvalidationschema,
    onSubmit: (data) => {
      feedback(data);
    },
  });

  const feedback = async (data) => {
    await fetch(`${API}/feedback`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.status === "200 ok") {
          resetForm();
        } else {
        }
      });
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-end">
        <span
          data-bs-target="#exampleModalfeed"
          data-bs-toggle="modal"
          className="text-white comment"
        >
          Feedback{" "}
          <i
            className=" ms-2 fa-solid fa-comment"
            style={{ color: "#ffffff" }}
          ></i>
        </span>
      </div>

      <div
        className="modal fade"
        id="exampleModalfeed"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog feedmodal">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Thanks For FeedBack
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="feedback"
                        value={values.feedback}
                        placeholder="FeedBack Section"
                        className="form-control"
                        id="exampleFormControlTextarea1"
                      ></textarea>
                      {errors.feedback && touched.feedback
                        ? errors.feedback
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss={`modal`}
                  type="submit"
                  className="btn btn-success"
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
