import { useEffect, useState } from "react";

import { API } from "../data";
import { useNavigate } from "react-router-dom";

export function AdminuserPageUsers() {
  const [alldata, setalldata] = useState();
  const [nxtpage, setnxtpage] = useState(false);
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
      {nxtpage === "false" ? (
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
                                  onClick={() => setnxtpage("true")}
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
          <h1> oreders page</h1>
          <button onClick={() => setnxtpage("false")}> backe </button>
        </div>
      )}
    </div>
  );
}
