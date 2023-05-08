import { useEffect, useRef, useState } from "react";
import { API } from "../data";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export const formvalidationschema = yup.object({
  catagories: yup.string().required("Catagories fiels is required"),
});
// /products/categories/name
export function CatagoriesPage() {
  const [apidata, setapidaata] = useState([]);

  const getdatacatagories = async () => {
    await fetch(`${API}/products/categories/name/all`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setapidaata(data);
      })
      .catch((err) => console.log(err));
  };

  const {
    values,
    handleSubmit,
    touched,
    handleBlur,
    resetForm,
    errors,
    handleChange,
  } = useFormik({
    initialValues: {
      catagories: "",
    },
    validationSchema: formvalidationschema,
    onSubmit: (data) => {
      postcatagorie(data);
    },
  });
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef(null);

  const postcatagorie = async (data) => {
    const fetchapi = await fetch(`${API}/products/categories/name/all`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsondata = await fetchapi.json();

    if (jsondata.status === "200 ok") {
      setShowButton(true);
      getdatacatagories();
      resetForm();
    }
  };

  useEffect(() => {
    getdatacatagories();
  }, []);

  useEffect(() => {
    if (showButton === true) {
      buttonRef.current.click();
      setShowButton(false);
    }
  }, [showButton]);

  const deletefun = (dataid) => {
    fetch(`${API}/products/categories/name/all/${dataid}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    });
    getdatacatagories();
  };

  const navigate = useNavigate();

  const [searchquery, setsearchquery] = useState("");

  const handlechangeserach = (e) => {
    setsearchquery(e.target.value);
  };

  return (
    <div className="container">
      <div className="row mb-4 mt-5 d-flex justify-content-center ">
        <div className="col-10 col-lg-4 col-md-5 ">
          <div>
            <div className="input-group input-w input-group-md mb-3">
              <span className="input-group-text" id="basic-addon1">
                Search
              </span>
              <input
                type="text"
                onChange={handlechangeserach}
                className="form-control"
                placeholder="Search"
                aria-label="search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>
        <div className="col-8 col-lg-4 col-md-5 ">
          <button
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop1"
            className="btn w-100 btn-success"
          >
            Add
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table  text-light">
              <thead>
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Catagories</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {apidata ? (
                  apidata
                    ?.filter((item) => {
                      return searchquery.toLowerCase() === ""
                        ? item
                        : item.catagories.toLowerCase().includes(searchquery);
                    })
                    .map((ele, index) => {
                      return (
                        <tr key={ele._id} className="text-center">
                          <th scope="row">{index + 1}</th>
                          <td>{ele.catagories}</td>
                          <td>
                            <div className="btn-con d-flex justify-content-center gap-3">
                              <button
                                onClick={() =>
                                  navigate(`/edit/catagories/${ele._id}`)
                                }
                                className="btn btn-warning"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deletefun(ele._id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <h1>NO data FOUND</h1>
                )}

                {/* {apidata ? (
                  apidata?.map((ele, index) => {
                    return (
                      <tr key={ele._id} className="text-center">
                        <th scope="row">{index + 1}</th>
                        <td>{ele.catagories}</td>
                        <td>
                          <div className="btn-con d-flex justify-content-center gap-3">
                            <button
                              onClick={() =>
                                navigate(`/edit/catagories/${ele._id}`)
                              }
                              className="btn btn-warning"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deletefun(ele._id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h1>NO data FOUND</h1>
                )} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* add modal */}
      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog text-dark mt-d">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Catagories
              </h1>
              <button
                ref={buttonRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="update"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* add modal */}
    </div>
  );
}
