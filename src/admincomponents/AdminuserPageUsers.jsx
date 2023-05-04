import { useEffect, useState } from "react";

import { API } from "../data";
import { useNavigate } from "react-router-dom";

export function AdminuserPageUsers() {
  const [alldata, setalldata] = useState();
  const [nxtpage, setnxtpage] = useState(false);
  const [orderdata, setorderdata] = useState();
  console.log(orderdata?.address, "form outside");
  const getdata = async () => {
    await fetch(`${API}/alluser/accounts`, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("adtoken"),
      },
    })
      .then((data) => data.json())
      .then((data) => setalldata(data.array))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getdata();
  }, []);
  const navigate = useNavigate();

  const [alldataorder, setalldataorder] = useState([]);
  const adddress = alldataorder.newdata;
  let datestore = "";
  const datedel = alldataorder.newdata;

  datestore = datedel;
  console.log(datestore, "datasore");

  console.log(datedel, "date");
  console.log(orderdata, "outside-orderdata");

  const getdataorder = async () => {
    if (nxtpage === "false") {
      try {
        await fetch(`${API}/alluser/accounts/${orderdata._id}`, {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("adtoken"),
          },
        })
          .then((data) => data.json())
          .then((data) => setalldataorder(data, "order adimign"))
          .catch((err) => console.log(err));

        console.log("fetched");
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getdataorder();
  }, [nxtpage]);

  const [searchquery, setsearchquery] = useState("");
  const handlechangeserach = (e) => {
    console.log(alldata);

    setsearchquery(e.target.value);
  };

  return (
    <div className="container">
      {nxtpage !== "false" ? (
        <div>
          <div className="row mt-5 mb-3 d-flex justify-content-end">
            <div className="col-10 col-md-6">
              <div className="input-group input-group-lg mb-3">
                <span className="input-group-text" id="basic-addon1">
                  Search
                </span>
                <input
                  onChange={handlechangeserach}
                  type="text"
                  className="form-control "
                  placeholder="Search"
                  aria-label="search"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="table-responsive">
                <table className="table  text-light">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Roll</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alldata ? (
                      alldata
                        ?.filter((item) => {
                          return searchquery.toLowerCase() === ""
                            ? item
                            : item.username.toLowerCase().includes(searchquery);
                        })
                        .map((ele, index) => {
                          return (
                            <tr key={index} className="text-center">
                              <th scope="row">{index + 1}</th>
                              <td>{ele.username}</td>
                              <td>{ele.email}</td>
                              <td>{ele.roll}</td>
                              <td>
                                <div className="btn-con d-grid">
                                  <button
                                    onClick={() => {
                                      setorderdata(ele);
                                      setnxtpage("false");
                                      console.log(orderdata, "addressa");
                                    }}
                                    className="btn btn-info"
                                  >
                                    View Orders
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                    ) : (
                      <h1>No Data Found</h1>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">
          <button
            className="btn mb-3 mt-3 btn-primary"
            onClick={() => setnxtpage("true")}
          >
            {" "}
            back{" "}
          </button>

          <div className="row ">
            <div className="col-10">
              <div className="row mb-3 d-flex justify-content-center">
                <div className="text-center col-10 col-md-6">
                  <h4>
                    Name : <span className="h2">{orderdata.username}</span>{" "}
                  </h4>
                </div>
              </div>
              <div className=" mb-3 d-flex justify-content-center">
                <div className="text-center col-10 col-md-6">
                  <h4>
                    Phone :{" "}
                    <span className="h2">
                      {orderdata.phone ? (
                        orderdata.phone
                      ) : (
                        <small className="me-2">Not Updated</small>
                      )}
                    </span>{" "}
                  </h4>
                </div>
              </div>
              <div className=" mb-3 d-flex justify-content-center">
                <div className="text-center col-10  col-md-10">
                  <h4 className="h4">Address</h4>
                </div>
              </div>
              <div className="row  mb-3 d-flex justify-content-center">
                {orderdata?.address ? (
                  orderdata?.address?.map((ele) => {
                    return (
                      <div
                        key={ele._id}
                        className=" text-center col-9  col-md-5"
                      >
                        <h6>
                          Contact : <span>{ele.address}</span>{" "}
                          <h6>
                            <span>{ele.state}</span>
                            <span>{ele.district}</span>
                          </h6>
                        </h6>
                        <h6>
                          Pincode : <span>{ele.pincode}</span>{" "}
                        </h6>
                        <h6>
                          Phone : <span>{ele.phone}</span>{" "}
                        </h6>
                      </div>
                    );
                  })
                ) : (
                  <h4 className="text-center">Address Not added Added</h4>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="row  d-flex justify-content-center mt-5">
                  {alldataorder?.newdata ? (
                    alldataorder?.newdata?.map((ele, index) => {
                      return (
                        <div
                          key={index}
                          className="col-10 col-lg-8  text-white"
                        >
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
                                      <span>Catagories :</span>{" "}
                                      {elein.catagories}
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
                                            Delivery Date :{" "}
                                            {ele.date?.slice(0, 10)}{" "}
                                          </span>
                                          <h6 className="card-text mt-2 mb-3">
                                            <span>Payment Mode :</span>{" "}
                                            {ele.payment}
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
