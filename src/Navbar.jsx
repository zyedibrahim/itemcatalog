import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar({ adddata, setcartitem, setprice, setadddata }) {
  const navigate = useNavigate();

  // const price = [...adddata];
  // console.log(price, "From adddata Price");

  // const [amount, setamount] = useState(
  //   adddata?.map((ele) => Number(ele.price) || 0)
  // );
  // console.log(amount, "from adddata Amount");
  // useEffect(() => {
  //   adddata?.map((ele) => ele.price);
  // }, [adddata]);

  const [products, setProducts] = useState(adddata);
  useEffect(() => {
    setProducts(adddata);
  }, [adddata]);

  const handleIncrement = (index) => {
    const newProducts = [...products];
    newProducts[index].quantity += 1;
    newProducts[index].price = newProducts[index].price + 200;
    setProducts(newProducts);
  };

  const handleDecrement = (index) => {
    const newProducts = [...products];
    if (newProducts[index].quantity > 1) {
      newProducts[index].quantity -= 1;
      newProducts[index].price = newProducts[index].price - 200;
      setProducts(newProducts);
    }
  };

  const totalPri = products.reduce(
    (total, product) => total + product.price,
    0
  );

  const logincheck = (data) => {
    if (localStorage.getItem("token")) {
      setcartitem(data);
      const totalPrice = data.reduce(
        (total, product) => total + product.price,
        0
      );
      setprice(totalPrice);
      console.log(data, "form logichek");

      setTimeout(() => {
        navigate("/checkoutpage");
      }, 1000);
    } else {
      window.location.href = "/login";
    }
  };

  const [user, setuser] = useState("false");

  const filterdel = (data) => {
    const dataddd = products?.filter((ele) => ele._id !== data);
    const dataad = adddata?.filter((ele) => ele._id !== data);

    setProducts(dataddd);
    setadddata(dataad);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg text-dark bg-success">
        <div className="container">
          <Link className="nav-font navbar-brand text-white" href="#">
            <i className="icon-shop me-2  fas fa-shopping-basket"></i>
            Go-kart
          </Link>

          <div className="collapse  navbar-collapse" id="navbarNavDropdown">
            <ul className="ms-5 navbar-nav gap-2">
              {localStorage.getItem("token") ? (
                <li className="nav-item ">
                  <Link
                    className="nav-link clr-org active text-white "
                    aria-current="page"
                    to="/home"
                  >
                    <i className="me-2 fa-solid fa-house-user"></i>
                    Home
                  </Link>
                </li>
              ) : (
                ""
              )}

              {localStorage.getItem("token") ? (
                <li className="nav-item ">
                  <Link className="nav-link text-white" to="/product">
                    <i className="me-2 fa-solid fa-bars"></i>
                    Products
                  </Link>
                </li>
              ) : (
                ""
              )}

              {localStorage.getItem("token") ? (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/myorders">
                    <i className="me-2 fa-solid fa-bag-shopping"></i>
                    MYOrder
                  </Link>
                </li>
              ) : (
                ""
              )}

              {localStorage.getItem("adtoken") ? (
                <li className="nav-item ">
                  <Link
                    className="nav-link clr-org active text-white "
                    aria-current="page"
                    to="/dashboard"
                  >
                    <i className="me-2 fa-solid fa-house-user"></i>
                    Dashboard
                  </Link>
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("adtoken") ? (
                <li className="nav-item ">
                  <Link
                    className="nav-link clr-org active text-white "
                    aria-current="page"
                    to="/adminproducts"
                  >
                    <i className="me-2 fa-solid fa-house-user"></i>
                    Product
                  </Link>
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("adtoken") ? (
                <li className="nav-item ">
                  <Link
                    className="nav-link clr-org active text-white "
                    aria-current="page"
                    to="/admincatagories"
                  >
                    <i className="me-2 fa-solid fa-house-user"></i>
                    Catagories
                  </Link>
                </li>
              ) : (
                ""
              )}
              {localStorage.getItem("adtoken") ? (
                <li className="nav-item ">
                  <Link
                    className="nav-link clr-org active text-white "
                    aria-current="page"
                    to="/adminpageusers"
                  >
                    <i className="me-2 fa-solid fa-house-user"></i>
                    Users
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>

          <div className="d-flex justify-content-center gap-2">
            <li className="nav-item">
              <button
                className="btn btn-nav  cart "
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <i className=" fa-solid fa-cart-shopping"></i>{" "}
                {products.length === 0 ? "" : adddata.length}
              </button>
            </li>
            {localStorage.getItem("token") ||
            localStorage.getItem("adtoken") ? (
              <li className="nav-item">
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/home");
                  }}
                  className="btn btn-nav cart"
                >
                  logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <button className="btn btn-nav cart">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </button>
              </li>
            )}
            {localStorage.getItem("token") ? (
              <li className="nav-item">
                <button className="btn btn-nav cart">
                  <Link className="nav-link text-white" to="/myprofile">
                    <i className="fa-solid fa-user"></i>
                  </Link>
                </button>
              </li>
            ) : (
              ""
            )}
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div
        data-bs-scroll="true"
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Cart
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body mb-3">
          <div className="mb-3">
            {products?.length > 0 ? (
              products?.map((ele, index) => {
                return (
                  <div key={ele._id}>
                    <div className="card mb-3">
                      <div className="row g-0">
                        <div className="col-4">
                          <img
                            src={ele.img_pro}
                            className="img-fluid"
                            alt="..."
                          />
                        </div>
                        <div className="col-8">
                          <div className="card-body">
                            <h5 className="card-title">{ele.name}</h5>
                            <div className="card-text">
                              <div className="mt-2 d-flex justify-content-between">
                                <div className="btn-con">
                                  {" "}
                                  <button
                                    onClick={() => handleDecrement(index)}
                                  >
                                    -
                                  </button>{" "}
                                  {ele.quantity}
                                  <button
                                    onClick={() => handleIncrement(index)}
                                  >
                                    +
                                  </button>{" "}
                                </div>
                                <div className="btn-con d-flex justify-content-end">
                                  <button
                                    onClick={() => filterdel(ele._id)}
                                    className="btn btn-danger"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="mt-2 d-flex justify-content-end card-text">
                              Total
                            </div>
                          </div>

                          <div className=" ms-auto card-footer">
                            <div className="d-flex justify-content-between card-text">
                              {" "}
                              Rs:-
                              <div className="text-muted">{ele.price}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-muted"> Cart is Empty </h1>
            )}
          </div>
          <div className="d-flex justify-content-end">
            <div> Total Rs:- {totalPri}</div>
          </div>

          {/* <div className="mb-3">
            {amount?.map((ele) => {
              return <div>{ele.price}</div>;
            })}
          </div> */}

          <div className="mb-3">
            {products?.length > 0 ? (
              <button
                onClick={() => {
                  logincheck(products);
                }}
                className="btn btn-primary "
              >
                checkout
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
