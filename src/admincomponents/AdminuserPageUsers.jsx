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
                      alldata?.map((ele, index) => {
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
                    Phone : <span className="h2">{orderdata.phone}</span>{" "}
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
                  <h4>Address Not added Added</h4>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-12">My orders</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
