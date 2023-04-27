import { useEffect, useState } from "react";
import { API } from "../data";

export function Dashboard() {
  const [apidata, setapidaata] = useState();

  const getdata = async () => {
    await fetch(`${API}/products/categories/all`)
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
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mb-3 col-md-3">
          <div className="card text-white p-3 bg-primary">
            <div className="card-body">
              <div className="card-title">
                <h4 className="text-center card-text">Sold</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mb-3 col-md-3">
          <div className="card text-white p-3 bg-danger">
            <div className="card-body">
              <div className="card-title">
                <h4 className="text-center card-text">Out of Stock</h4>
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
              apidata?.map((ele, index) => {
                return (
                  <tr key={ele._id} className="text-center">
                    <th scope="row">{index + 1}</th>
                    <td>{ele.name}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{ele.stock}</td>
                  </tr>
                );
              })
            ) : (
              <h1>NO data FOUND</h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
