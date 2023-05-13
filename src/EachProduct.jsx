import { useEffect, useState } from "react";
import { API } from "./data";
import { useNavigate, useParams } from "react-router-dom";

export function EachProduct({ cartitem, setcartitem, setprice, setquantity }) {
  const { id } = useParams();
  const [eachdata, seteachdata] = useState([]);

  const getdata = async () => {
    await fetch(`${API}/products/all/${id}`)
      .then((data) => data.json())
      .then((data) => seteachdata([data]))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const copydata = [...eachdata];

  const handleIncrement = (data) => {
    const filterdata = eachdata.findIndex((ele) => ele._id === data._id);
    const newProducts = JSON.parse(JSON.stringify(eachdata));
    const price =
      newProducts[filterdata].price / newProducts[filterdata].quantity; // original price value
    newProducts[filterdata].quantity += 1;
    newProducts[filterdata].price = price * newProducts[filterdata].quantity; // calculate updated price
    seteachdata(newProducts);
  };

  const handleDecrement = (data) => {
    const filterdata = eachdata.findIndex((ele) => ele._id === data._id);
    const newProducts = JSON.parse(JSON.stringify(eachdata));
    const price =
      newProducts[filterdata].price / newProducts[filterdata].quantity; // original price value
    if (newProducts[filterdata].quantity > 1) {
      newProducts[filterdata].quantity -= 1;
      const decrement = price - newProducts[filterdata].price;
      newProducts[filterdata].price = decrement;
      seteachdata(newProducts);
    }
  };

  const navigate = useNavigate();

  const logincheck = (perdata) => {
    if (localStorage.getItem("token")) {
      const jsonString = JSON.stringify([perdata]);
      localStorage.setItem("cartitem", jsonString);
      setcartitem([perdata]);
      navigate("/checkoutpage");
    } else {
      navigate("/login");
    }
  };
  return (
    <section>
      <main>
        <div className="container mt-3">
          <div className="card text-white e-card d-flex justify-content-center">
            <div className="row">
              {eachdata?.map((ele, index) => {
                return (
                  <div className="row" key={ele._id}>
                    <div className="col-md-4">
                      <img
                        className="img-fluid rounded-start"
                        src={ele?.img_pro}
                        alt="img-product"
                      />
                    </div>

                    <div className="col-md-8 e-f ">
                      <div className="card-body d-flex justify-content-center mt-5 ">
                        <div>
                          <div className="card-title">
                            Category : {ele.catagories}
                          </div>
                          <div className="card-title">Product : {ele.name}</div>
                          <div className="card-title">
                            Amount : {Math.abs(ele.price.toFixed(2))}
                          </div>
                          <div className="card-title d-flex gap-2 button">
                            Quantity :{" "}
                            <button
                              className="plus "
                              onClick={() => {
                                handleIncrement(ele);
                              }}
                            >
                              +
                            </button>{" "}
                            {ele.quantity}
                            <button
                              className="minus "
                              onClick={() => {
                                handleDecrement(ele);
                              }}
                            >
                              -
                            </button>
                          </div>

                          <div className="button-con d-flex gap-2">
                            <button
                              onClick={() => logincheck(ele)}
                              className="btn btn-secondary"
                            >
                              Buy Now
                            </button>
                            <button
                              onClick={() => navigate(-1)}
                              className="btn btn-secondary"
                            >
                              Back
                            </button>
                          </div>

                          <div className="tol">
                            {" "}
                            Total Amount : {Math.abs(ele.price.toFixed(2))}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
