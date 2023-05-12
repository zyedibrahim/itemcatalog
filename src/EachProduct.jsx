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

  const handleIncrement = (index) => {
    const newProducts = [...eachdata];
    newProducts[index].quantity += 1;
    newProducts[index].price = newProducts[index].price + copydata[0]?.price;
    seteachdata(newProducts);
  };

  const handleDecrement = (index) => {
    const newProducts = [...eachdata];
    if (newProducts[index].quantity > 1) {
      newProducts[index].quantity -= 1;
      newProducts[index].price =
        newProducts[index].price - newProducts[index].price;
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
                          <div className="card-title">Amount : {ele.price}</div>
                          <div className="card-title d-flex gap-2 button">
                            Quantity :{" "}
                            <button
                              className="plus "
                              onClick={() => {
                                handleIncrement(index);
                              }}
                            >
                              +
                            </button>{" "}
                            {ele.quantity}
                            <button
                              className="minus "
                              onClick={() => {
                                handleDecrement(index);
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
                            Total Amount : {ele.price}{" "}
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
