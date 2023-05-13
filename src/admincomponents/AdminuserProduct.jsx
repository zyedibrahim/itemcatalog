import { useEffect, useState, useRef } from "react";
import { API } from "../data";

import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export const formvalidationschema = yup.object({
  catagories: yup.string().required("This is fiels is required"),
  name: yup.string().required("This is fiels is required"),
  price: yup.number().required("This field is required"),
  stock: yup.number().required("This field is required"),
  q_type: yup.string().required("This field is required"),
  img_pro: yup.string().required("This field is required"),
});

export function AdminuserProduct() {
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
      catagories: "",
      name: "",
      price: "",
      quantity: 1,
      stock: "",
      q_type: "",
      img_pro: "",
      sold: 0,
    },
    validationSchema: formvalidationschema,
    onSubmit: (data) => {
      addproduct(data);
    },
  });

  const [alldata, setalldata] = useState([]);
  const [searchquery, setsearchquery] = useState("");
  const [cata, setcata] = useState([]);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    await fetch(`${API}/products/all`)
      .then((data) => data.json())
      .then((data) => setalldata(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getdata();
  }, []);

  const getdatacatagories = async () => {
    await fetch(`${API}/products/categories/name/all`, {
      headers: {
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setcata(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getdatacatagories();
  }, []);

  const addproduct = async (data) => {
    const dataf = await fetch(`${API}/products/all`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsondata = await dataf.json();

    if (jsondata.status === "200 ok") {
      setShowButton(true);
      resetForm();
      getdata();
    } else {
      console.log("something went wrong");
    }
  };

  const deletefunc = (data) => {
    fetch(`${API}/products/categories/all/${data}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    });
    getdata();
  };

  const navigate = useNavigate();

  const handlechangeserach = (e) => {
    setsearchquery(e.target.value);
  };

  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (showButton === true) {
      buttonRef.current.click();
      setShowButton(false);
    }
  }, [showButton]);

  return (
    <div className="container">
      <div className="row mb-4 mt-5 d-flex justify-content-center ">
        <div className="col-10 col-lg-4 col-md-5 ">
          <div>
            <div className="input-group  input-group-md mb-3">
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
            data-bs-target="#staticBackdrop"
            className="btn p-btn-w btn-success"
          >
            Add Product
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
                  <th scope="col">Product</th>
                  <th scope="col">unit</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Picture</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8">
                      <div
                        className="mb-3 mt-5"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="loader"></div>
                      </div>
                      <div className="text-center mt-3 text-white h2">
                        Loading ...
                      </div>
                    </td>
                  </tr>
                ) : (
                  alldata
                    .filter((item) => {
                      return searchquery.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(searchquery);
                    })
                    .map((ele, index) => {
                      return (
                        <tr key={ele._id} className="text-center">
                          <th scope="row">{index + 1}</th>
                          <td>{ele.catagories}</td>
                          <td>{ele.name}</td>
                          <td>{ele.q_type}</td>
                          <td>{ele.price}</td>
                          <td>{ele.stock}</td>
                          <td>
                            <div className=" img-con-ad">
                              <img
                                src={ele.img_pro}
                                alt={ele.catagories}
                                className="img-ad"
                              />
                            </div>
                          </td>
                          <td>
                            <div className="btn-con d-flex justify-content-center gap-3">
                              <button
                                onClick={() =>
                                  navigate(`/edit/product/${ele._id}`)
                                }
                                className="btn btn-warning"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deletefunc(ele._id)}
                                type="button"
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                )}
                {loading === false
                  ? alldata?.filter((item) => {
                      return searchquery.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(searchquery);
                    }).length === 0 && (
                      <tr>
                        <td colSpan="8">
                          <h1 className="text-danger text-center">
                            No Data Found
                          </h1>
                        </td>
                      </tr>
                    )
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
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
                Add Product
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
                      <label htmlFor="Cata" className="form-label">
                        Catagories
                      </label>
                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="catagories"
                        value={values.catagories}
                        id="Cata"
                        defaultValue=""
                        className="form-select form-select-md mb-3"
                        aria-label=".form-select-lg example"
                      >
                        <option> Open this select menu</option>
                        {cata?.map((val, index) => {
                          return (
                            <option key={val._id} value={val.catagories}>
                              {val.catagories}
                            </option>
                          );
                        })}
                      </select>
                      {errors.catagories && touched.catagories
                        ? errors.catagories
                        : ""}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="name"
                        value={values.name}
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="form-control"
                      />
                      {errors.name && touched.name ? errors.name : ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Amount
                      </label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="price"
                        value={values.price}
                        type="number"
                        id="name"
                        placeholder="Amount"
                        className="form-control"
                      />
                      {errors.price && touched.price ? errors.price : ""}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Quantity
                      </label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="stock"
                        value={values.stock}
                        type="number"
                        id="name"
                        placeholder="Quantity"
                        className="form-control"
                      />
                      {errors.stock && touched.stock ? errors.stock : ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Unit
                      </label>
                      <select
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="q_type"
                        value={values.q_type}
                        id="Cata"
                        defaultValue=""
                        className="form-select form-select-md mb-3"
                        aria-label="form-select-lg example"
                      >
                        <option> Open this select menu</option>
                        <option value="Gm">Gm</option>
                        <option value="kg">Kg</option>
                        <option value="L">L</option>
                        <option value="ml">ml</option>
                        <option value="Pcs">Pcs</option>
                      </select>
                      {errors.q_type && touched.q_type ? errors.q_type : ""}
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Image Link
                      </label>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="img_pro"
                        value={values.img_pro}
                        type="text"
                        id="name"
                        placeholder="Image link"
                        className="form-control"
                      />
                      {errors.img_pro && touched.img_pro ? errors.img_pro : ""}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
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
