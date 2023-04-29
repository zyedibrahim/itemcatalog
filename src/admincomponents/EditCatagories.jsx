import { useEffect, useState } from "react";
import { API } from "../data";
import { useFormik } from "formik";
import { formvalidationschema } from "./CatagoriesPage";
import { useNavigate, useParams } from "react-router-dom";

export function EditCatagories() {
  // console.log(iddata, "iddata");

  const { id } = useParams();

  const [eachdata, seteachdata] = useState();

  useEffect(() => {
    fetch(`${API}/products/categories/name/all/${id}`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    })
      .then((data) => data.json())
      .then((data) => seteachdata(data.datas))
      .catch((err) => console.log(err));
  }, []);

  return eachdata ? (
    <div>
      <UpdateCatagories eachdata={eachdata} />
    </div>
  ) : (
    <h1>Loading..</h1>
  );
}
function UpdateCatagories({ eachdata }) {
  console.log(eachdata.catagories, "update data");
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        catagories: eachdata.catagories,
      },
      validationSchema: formvalidationschema,
      onSubmit: (data) => {
        putcatagorie(data);
      },
    });

  const navigate = useNavigate();

  const putcatagorie = async (data) => {
    const fetchapi = await fetch(
      `${API}/products/categories/name/all/${eachdata._id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("adtoken"),
        },
      }
    );
    const jsondata = await fetchapi.json();
    const temp = await jsondata.status;

    if (temp === "200 ok") {
      navigate("/admincatagories");
      console.log("navigate to admincatagories");
    }
  };

  return (
    <div className="container">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-12 col-md- col-lg-5 col-xl-5">
          <div className="card">
            <div className="card-header">
              <div className="card-text text-center">Edit Catagories</div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="catagories"
                        value={values.catagories}
                        type="text"
                        placeholder="catagories"
                        className="form-control"
                      />
                      {errors.catagories && touched.catagories
                        ? errors.catagories
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
