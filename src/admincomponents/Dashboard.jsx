import { useEffect, useState } from "react";
import { API } from "../data";

export function Dashboard() {
  const [apidata, setapidaata] = useState();

  const getdata = async () => {
    await fetch(`${API}/products/all`)
      .then((data) => data.json())
      .then((data) => setapidaata(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getdata();
  }, []);

  const dataforcard = apidata;
  const totalstock = apidata?.reduce(
    (total, product) => total + product.stock,
    0
  );
  const totalsold = apidata?.reduce(
    (total, product) => total + product.sold,
    0
  );
  const outofstock = apidata?.reduce((total, product) => {
    if (product.stock === 0) {
      return total + product.stock;
    }
  }, 0);

  const [searchquery, setsearchquery] = useState("");
  const handlechangeserach = (e) => {
    console.log(e.target.value);

    setsearchquery(e.target.value);
  };

  // console.log(totalstock);
  return (
    <div className="text-white container">
      <div className="row mb-3 mt-5">
        <div className="col-12 col-md-3 mb-3">
          <div className="card text-white p-3 bg-info">
            <div className="card-body">
              <div className="card-title text-center">
                <h4 className="text-center card-text">Total Products</h4>
                <h4>{dataforcard?.length}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mb-3 col-md-3">
          <div className="card text-white p-3 bg-secondary">
            <div className="card-body">
              <div className="card-title">
                <h4 className="text-center card-text">Quantity Bought</h4>
                <h4 className="text-center">{totalstock}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mb-3 col-md-3">
          <div className="card text-white p-3 bg-primary">
            <div className="card-body">
              <div className="card-title">
                <h4 className="text-center card-text">Sold</h4>
                <h4 className="text-center card-text">{totalsold}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mb-3 col-md-3">
          <div className="card text-white p-3 bg-danger">
            <div className="card-body">
              <div className="card-title">
                <h4 className="text-center card-text">Out of Stock</h4>
                <h4 className="text-center card-text"></h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mb-3 col-md-3">
          <div className="card text-center text-white p-3 bg-success">
            <div className="card-body">
              <div className="card-title">
                <h4 className=" card-text">Available Stock</h4>
                <h4>{totalstock}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 mb-3">
        <div className="input-group input-w  input-group-md mb-3">
          <span className="input-group-text" id="basic-addon1">
            Search
          </span>
          <input
            type="text"
            onChange={handlechangeserach}
            className="form-control"
            placeholder="Search"
            aria-label="search"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table  text-light">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Product Name</th>
              <th scope="col">Bought</th>
              <th scope="col">Sold</th>
              <th scope="col">Available in Stock</th>
            </tr>
          </thead>
          <tbody>
            {apidata ? (
              apidata
                ?.filter((item) => {
                  return searchquery.toString() === ""
                    ? item
                    : item.stock.toString().includes(searchquery);
                })
                .map((ele, index) => {
                  return (
                    <tr key={ele._id} className="text-center">
                      <th scope="row">{index + 1}</th>
                      <td>{ele.name}</td>
                      <td>{ele.stock}</td>
                      <td>{ele.sold}</td>
                      <td style={{ color: ele.stock > 0 ? "" : "red" }}>
                        {ele.stock > 0 ? ele.stock : "Out of Stock"}
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td>There is no Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
