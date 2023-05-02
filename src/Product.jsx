import { useEffect, useState } from "react";

import { API } from "./data";
import { useNavigate } from "react-router-dom";

export function Product({ setadddata, adddata }) {
  // const [select_pro, setselect] = useState("all");
  // let select_pro = "all";

  const navigate = useNavigate();
  const [searchquery, setsearchquery] = useState("");
  const [datafrmapi, setdata] = useState([]);

  const [Ssearch, setSsearch] = useState(true);

  const [cata, setcata] = useState([]);

  const getdata = async () => {
    await fetch(`${API}/products/all`)
      .then((data) => data.json())
      .then((data) => setdata(data))
      .catch((err) => console.log(err));
  };

  const getdatacatagories = async () => {
    await fetch(`${API}/products/categories/name/all`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((data) => setcata(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getdata();
    getdatacatagories();
  }, []);
  const handleSelectChange = (event) => {
    setsearchquery(event.target.value);
    setSsearch(false);
  };
  console.log(datafrmapi);
  return (
    <section>
      <main>
        <div className="container">
          <div className="heading mt-3 mb-3 text-white d-flex justify-content-center">
            <span className="hf-p ">Product</span>
          </div>

          <div className="row mb-4 d-flex justify-content-center ">
            <div className="col-8 col-lg-4 col-md-5 ">
              <select
                onChange={handleSelectChange}
                defaultValue=""
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
              >
                <option value=""> Open this select menu</option>
                {cata?.map((val, index) => {
                  return (
                    <option key={index} value={val.catagories}>
                      {val.catagories}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="col-10 col-lg-4 col-md-5 ">
              <div>
                <div className="input-group input-group-lg mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    Search
                  </span>
                  <input
                    onChange={(e) => {
                      setSsearch(true);
                      setsearchquery(e.target.value);
                      console.log(searchquery, "ssearch");
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-center">
            {Ssearch === true
              ? datafrmapi
                  .filter((item) => {
                    return searchquery.toLowerCase() === ""
                      ? item
                      : item.name.toLowerCase().includes(searchquery);
                  })
                  .map((ele) => {
                    return (
                      <div
                        key={ele._id}
                        className="col-md-6 mb-3 col-lg-4 col-xl-3 col-7"
                      >
                        <div className="card">
                          <img
                            src={ele.img_pro}
                            alt="content-img"
                            className="card-img-pro"
                          />
                          <div className="card-body">
                            <div className="text-center h3 card-title">
                              {ele.name}
                            </div>
                            <div className="text-center mb-2 h5 text-muted">
                              Amount : {ele.price} ₹{" "}
                              <span className="me-2">{ele.quantity}</span>/{" "}
                              <span className="me-2">{ele.q_type}</span>
                            </div>

                            <div className="text-center">
                              <h5>
                                {ele.stock > 0 ? ele.stock : ""}{" "}
                                <span
                                  className={` ${
                                    ele.stock > 0 ? "text-muted" : ""
                                  } `}
                                  style={{ color: "red" }}
                                >
                                  {ele.stock > 0
                                    ? "Availbale Stock"
                                    : "Out Of Stock"}
                                </span>{" "}
                              </h5>
                            </div>

                            <div className="button text-center mt-3 d-flex justify-content-center gap-2 text-center">
                              <button
                                onClick={() => navigate(`/products/${ele._id}`)}
                                className={`btn btn-secondary ${
                                  ele.stock > 0 ? "" : "disabled"
                                } `}
                              >
                                Buy Now
                              </button>
                              <button
                                onClick={() => {
                                  setadddata([...adddata, ele]);
                                }}
                                className={`btn btn-secondary ${
                                  ele.stock > 0 ? "" : "disabled"
                                } `}
                              >
                                Add Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
              : datafrmapi
                  .filter((item) => {
                    return searchquery.toLowerCase() === ""
                      ? item
                      : item.catagories.toLowerCase().includes(searchquery);
                  })
                  .map((ele) => {
                    return (
                      <div
                        key={ele._id}
                        className="col-md-6 mb-3 col-lg-4 col-xl-3 col-7"
                      >
                        <div className="card">
                          <img
                            src={ele.img_pro}
                            alt="content-img"
                            className="card-img-pro"
                          />
                          <div className="card-body">
                            <div className="text-center h3 card-title">
                              {ele.name}
                            </div>
                            <div className="text-center mb-2 h5 text-muted">
                              Amount : {ele.price} ₹{" "}
                              <span className="me-2">{ele.quantity}</span>/{" "}
                              <span className="me-2">{ele.q_type}</span>
                            </div>

                            <div className="text-center">
                              <h5>
                                {ele.stock}{" "}
                                <span className="text-muted">
                                  Stock is available
                                </span>{" "}
                              </h5>
                            </div>

                            <div className="button text-center mt-3 d-flex justify-content-center gap-2 text-center">
                              <button
                                onClick={() => navigate(`/products/${ele._id}`)}
                                className="btn btn-secondary"
                              >
                                Buy Now
                              </button>
                              <button
                                onClick={() => {
                                  setadddata([...adddata, ele]);
                                }}
                                className="btn btn-secondary"
                              >
                                Add Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
          </div>

          {/* <div className="row-con">
            {datafrmapi
              .filter((item) => {
                return searchquery.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(searchquery);
              })
              .map((ele, index) => {
                return (
                  <div key={ele._id} className="col-con">
                    {ele.catagories ? (
                      <div className="col-con-1">
                        <div className="img-con-outside">
                          <img
                            className="img-con"
                            src={ele.img_pro}
                            alt={ele.img_pro}
                          />
                        </div>
                        <div className="pro-name">{ele.name}</div>
                        <div className="amout-pro">
                          {ele.price}
                          <span className="quantity">{ele.quantity}</span>
                        </div>

                        <div className="stock">{ele.stock}</div>

                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setcount1(count1 + 1);
                            {
                              count1 >= 1 ? "" : setadddata([...adddata, ele]);
                            }
                          }}
                        >
                          addcart{count1}
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => navigate(`/products/${ele._id}`)}
                        >
                          Buy Now
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
          </div> */}
        </div>
      </main>
    </section>
  );
}
