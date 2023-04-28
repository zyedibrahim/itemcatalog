import { useEffect, useState } from "react";
import { API } from "../data";

import * as yup from "yup";
import { useFormik } from "formik";

const formvalidationschema = yup.object({
  catagories: yup.string().required("This is fiels is required"),
  name: yup.string().required("This is fiels is required"),
  price: yup.number().required("This field is required"),
  stock: yup.number().required("This field is required"),
  q_type: yup.string().required("This field is required"),
  img_pro: yup.string().required("This field is required"),
});

export function AdminuserProduct() {
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        catagories: "",
        name: "",
        price: "",
        quantity: 1,
        stock: "",
        q_type: "",
        img_pro: "",
      },
      validationSchema: formvalidationschema,
      onSubmit: (data) => {
        console.log(data);
        addproduct(data);
      },
    });

  const [alldata, setalldata] = useState([]);

  const getdata = async () => {
    await fetch(`${API}/products/categories/name/all`)
      .then((data) => data.json())
      .then((data) => setalldata(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getdata();
  }, []);

  const [cata, setcata] = useState([]);

  const getdatacatagories = async () => {
    await fetch(`${API}/products/categories/name`, {
      headers: {
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    })
      .then((data) => data.json())
      .then((data) => setcata(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getdatacatagories();
  }, []);

  const addproduct = async (data) => {
    const dataf = await fetch(`${API}/products/categories/all`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsondata = await dataf.json();
    console.log(jsondata);
    if (jsondata.status === "200 ok") {
      getdata();
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

  return (
    <div className="container">
      <div className="row mb-4 mt-5 d-flex justify-content-center ">
        <div className="col-10 col-lg-4 col-md-5 ">
          <div>
            <div className="input-group input-group-lg mb-3">
              <span className="input-group-text" id="basic-addon1">
                Search
              </span>
              <input
                type="text"
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
            className="btn w-100 btn-success"
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
                {alldata
                  ? alldata.map((ele, index) => {
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
                              <button className="btn btn-warning">Edit</button>
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
                // ref={buttonRef}
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
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                  >
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