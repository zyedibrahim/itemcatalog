import { useEffect, useState } from "react";
import { API } from "./data";

export function MyOrders() {
  const [alldata, setalldata] = useState([]);
  const [loading, setloading] = useState(true);

  const getdata = async () => {
    await fetch(`${API}/alluser/accounts/${localStorage.getItem("_id")}`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setalldata(data?.newdata);
        setloading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="text-white container ">
      <h1 className="text-center mt-5">My Orders</h1>
      {loading ? (
        <div>
          <div
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="loader"></div>
          </div>
          <div className="text-center mt-3 text-white h2">Loading ...</div>
        </div>
      ) : (
        <div className="row  d-flex justify-content-center mt-5">
          {alldata ? (
            alldata?.map((ele, index) => {
              return (
                <div key={index} className="col-10 col-lg-8  text-white">
                  <div className="card mb-3">
                    {ele?.orderproduct.map((elein) => (
                      <div className="row g-0">
                        <div className="col-md-4 ">
                          <img
                            key={elein._id}
                            src={elein.img_pro}
                            className="img-fluid rounded-start"
                            alt={elein.name}
                          />
                        </div>
                        <div className="col-md-8 ">
                          <div className="card-body">
                            <div className="text-center">
                              {" "}
                              Track Id : {ele._id}
                            </div>
                            <h5 className="card-title">
                              <span>Catagories :</span> {elein.catagories}
                            </h5>
                            <h5 className="card-title">
                              <span>Product :</span> {elein.name}
                            </h5>
                            <h5 className="card-title">
                              <span>Quantity :</span> {elein.quantity}
                            </h5>
                            <div className="card-text d-flex gap-5">
                              <h5 className="card-title">
                                <span>Price :</span> {elein.price}
                              </h5>
                              <h5 className="card-title">
                                <span>Status :</span> Delivered
                              </h5>
                            </div>

                            <p className="card-text">
                              <small className="text-muted">
                                <h5 className="card-title">
                                  <span>
                                    Delivery Date : {ele.date?.slice(0, 10)}{" "}
                                  </span>
                                  <h6 className="card-text mt-2 mb-3">
                                    <span>Payment Mode :</span>{" "}
                                    {ele.payment.toUpperCase()}
                                  </h6>
                                </h5>
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-center">Theres No Orders</h1>
          )}
        </div>
      )}
    </div>
  );
}
