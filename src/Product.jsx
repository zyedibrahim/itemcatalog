import { useEffect, useState } from "react";

import { API } from "./data";
import { useNavigate } from "react-router-dom";

export function Product({ setadddata, adddata }) {
  const [searchquery, setsearchquery] = useState("");
  const [datafrmapi, setdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Ssearch, setSsearch] = useState(true);

  const [cata, setcata] = useState([]);

  const getdata = async () => {
    await fetch(`${API}/products/all`)
      .then((data) => data.json())
      .then((data) => {
        setdata(data);
        setLoading(false);
      })
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
                    <option key={index} value={val.catagories.toLowerCase()}>
                      {val.catagories.toUpperCase()}
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

          <div className="row">
            {loading ? (
              <div className="loader"></div>
            ) : Ssearch === true ? (
              datafrmapi
                .filter((item) => {
                  return searchquery === ""
                    ? item
                    : item.name.toLowerCase().includes(searchquery);
                })
                .map((ele) => (
                  <LoopProduct
                    key={ele._id}
                    adddata={adddata}
                    setadddata={setadddata}
                    ele={ele}
                  />
                ))
            ) : (
              datafrmapi
                .filter((item) => {
                  return searchquery === ""
                    ? item
                    : item.catagories.toLowerCase().includes(searchquery);
                })
                .map((ele) => (
                  <LoopProduct
                    key={ele._id}
                    adddata={adddata}
                    setadddata={setadddata}
                    ele={ele}
                  />
                ))
            )}
            {loading === false
              ? Ssearch &&
                datafrmapi.filter((item) => {
                  return searchquery.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(searchquery);
                }).length === 0 && (
                  <h1 className="text-danger text-center">No Data Found</h1>
                )
              : ""}
            {loading === false
              ? !Ssearch &&
                datafrmapi.filter((item) => {
                  return searchquery.toLowerCase() === ""
                    ? item
                    : item.catagories.toLowerCase().includes(searchquery);
                }).length === 0 && (
                  <h1 className="text-danger text-center">No Data Found</h1>
                )
              : ""}
          </div>
        </div>
      </main>
    </section>
  );
}

function LoopProduct({ setadddata, adddata, ele }) {
  const navigate = useNavigate();
  const addcartclick = (eledata) => {
    const doesexist = adddata.some((ele) => ele._id === eledata._id);
    if (!doesexist) {
      setadddata([...adddata, eledata]);
    } else {
      const filterdata = adddata.findIndex((ele) => ele._id === eledata._id);
      const newProducts = JSON.parse(JSON.stringify(adddata));
      const price =
        newProducts[filterdata].price / newProducts[filterdata].quantity; // original price value
      newProducts[filterdata].quantity += 1;
      newProducts[filterdata].price = price * newProducts[filterdata].quantity; // calculate updated price
      setadddata(newProducts);
    }
  };

  return (
    <div className="d-flex justify-content-center col-md-6 mb-3 col-lg-4 col-xl-3 col-7">
      <div className="center-con">
        <div className="card" style={{ width: "270px" }}>
          <img src={ele.img_pro} alt="content-img" className="card-img-pro" />
          <div className="card-body">
            <div className="text-center h3 card-title">{ele.name}</div>
            <div className="text-center mb-2 h5 text-muted">
              Amount : {ele.price} ₹{" "}
              <span className="me-2">{ele.quantity}</span>/{" "}
              <span className="me-2">{ele.q_type}</span>
            </div>

            <div className="text-center">
              <h5>
                {ele.stock > 0 ? ele.stock : ""}{" "}
                <span
                  className={` ${ele.stock > 0 ? "text-muted" : ""} `}
                  style={{ color: "red" }}
                >
                  {ele.stock > 0 ? "Availbale Stock" : "Out Of Stock"}
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
                  addcartclick(ele);
                }}
                className={`btn btn-secondary ${
                  ele.stock > 0 ? "" : "disabled"
                } `}
              >
                Add Cart
                {/* {cartbtn === true ? "Add Cart" : "Remove Cart"} */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
