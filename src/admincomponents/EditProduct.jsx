import { useEffect, useState } from "react";
import { API } from "../data";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { formvalidationschema } from "./AdminuserProduct";

export function EditProduct() {
  // console.log(iddata, "iddata");
  const { id } = useParams();

  const [eachdata, seteachdata] = useState();

  useEffect(() => {
    fetch(`${API}/products/all/${id}`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    })
      .then((data) => data.json())
      .then((data) => seteachdata(data))
      .catch((err) => console.log(err));
  }, []);

  return eachdata ? (
    <div>
      <UpdateProduct eachdata={eachdata} />
    </div>
  ) : (
    <h1>Loading..</h1>
  );
}
function UpdateProduct({ eachdata }) {
  console.log(eachdata.catagories, "update data");
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        catagories: eachdata.catagories,
        name: eachdata.name,
        price: eachdata.price,
        quantity: eachdata.quantity,
        stock: eachdata.stock,
        q_type: eachdata.q_type,
        img_pro: eachdata.img_pro,
      },
      validationSchema: formvalidationschema,
      onSubmit: (data) => {
        console.log(data);
        putProduct(data);
      },
    });

  const navigate = useNavigate();
  const [cata, setcata] = useState([]);

  const getdatacatagories = async () => {
    await fetch(`${API}/products/categories/name/all`, {
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

  const putProduct = async (data) => {
    const fetchapi = await fetch(`${API}/products/all/${eachdata._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    });
    const jsondata = await fetchapi.json();
    const temp = await jsondata.status;

    if (temp === "200 ok") {
      navigate("/adminproducts");
    }
  };

  return (
    <div className="container">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-12 col-md- col-lg-5 col-xl-5">
          <div className="card">
            <div className="card-header">
              <div className="card-text text-center">Edit Product</div>
            </div>
            <div className="card-body">
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
                    onClick={() => navigate(-1)}
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
