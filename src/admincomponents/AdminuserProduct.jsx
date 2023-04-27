import { useEffect, useState } from "react";
import { API } from "../data";

export function AdminuserProduct() {
  const [alldata, setalldata] = useState([]);

  const getdata = async () => {
    await fetch(`${API}/products/categories/all`)
      .then((data) => data.json())
      .then((data) => setalldata(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getdata();
  }, []);

  console.log(alldata, "alldata");

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
          <button className="btn w-100 btn-success">Add Product</button>
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
                        <tr className="text-center">
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
                              <button className="btn btn-danger">Delete</button>
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
    </div>
  );
}
