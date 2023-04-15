import { useEffect, useState } from "react";

import dataaddress from "./dataAddress";

export function CheckoutPage({ cartitem, quantity }) {
  const [selectdis, setselectdis] = useState();
  const [country, setcountry] = useState();

  const stateOptions = dataaddress?.states?.map((state, index) => (
    <option key={index} value={state.state}>
      {state.state}
    </option>
  ));

  const districtOptions = dataaddress?.states[selectdis || 0].districts.map(
    (dis, index) => (
      <option key={index} value={dis}>
        {dis}
      </option>
    )
  );

  console.log(cartitem, "from checkout");

  const [cprouduct, setcproduct] = useState([cartitem]);

  useEffect(() => {
    setcproduct(cartitem);
  }, [cartitem]);

  const totalPri = cprouduct.reduce(
    (total, product) => total + product.price,
    0
  );

  const price = [...cprouduct];

  const [firstnameval, setfirstnameval] = useState("");
  const [lastnameval, setlastnameval] = useState("");
  const [addressval, setaddressval] = useState("");
  const [stateval, setstateval] = useState("");
  const [districtval, setdistrictval] = useState("");
  const [pincodeval, setpincodeval] = useState();
  const [phoneval, setphoneval] = useState();

  const handlechangestate = (e) => {
    // const statvalue = e.target
    if (country == "india") {
      const selectedState = e.target.value;
      const selectedIndex = dataaddress?.states?.findIndex(
        (state) => state.state === selectedState
      );

      {
        selectedIndex !== -1 ? setselectdis(selectedIndex) : 0;
      }
      setstateval(e.target.value);

      // setselectdis(selectedIndex);
      // console.log(selectdis, "selecteddies");
    }
  };

  const handlechangeCountry = (e) => {
    if (e.target.value !== "none") {
      setcountry("india");
    } else {
      setcountry();
    }
  };

  const handlechangefn = (e) => {
    setfirstnameval(e.target.value);
  };
  const handlechangeln = (e) => {
    setlastnameval(e.target.value);
  };
  const handleChangeaddress = (e) => {
    setaddressval(e.target.value);
  };
  const handleChangepincode = (e) => {
    setpincodeval(e.target.value);
  };
  const handleChangephone = (e) => {
    setphoneval(e.target.value);
  };

  const handleChangedistrict = (e) => {
    setdistrictval(e.target.value);
  };

  const addresssubmit = (e) => {
    e.preventDefault();

    const dataaddress = {
      country: country,
      firstname: firstnameval,
      lastname: lastnameval,
      address: addressval,
      state: stateval,
      district: districtval,
      pincode: pincodeval,
      phone: phoneval,
    };

    console.log(dataaddress);
  };

  return (
    <div className="text-white container">
      <h1>checkout page</h1>
      <div className="row d-flex justify-content-center ">
        <div className="col-12 col-md-2">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            add address
          </button>
        </div>

        <div className="col-12 col-md-3">address</div>
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <h3>Payment Mode</h3>
            <select
              defaultValue="Offline Payment"
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
            >
              <option>Select Payment</option>
              <option value="1">Online Payment</option>
              <option value="2">Offline Payment</option>
            </select>

            <div className="h4">Order summary</div>
          </div>

          <div className="place-ordercon">
            {cprouduct?.map((ele) => {
              return (
                <div
                  key={ele._id}
                  className="con-2-inside d-flex justify-content-between"
                >
                  <div className="middle-con d-flex">
                    <div className="img-cont ">
                      <img
                        className="checkout-img"
                        src={ele.img_pro}
                        alt={ele.name}
                      />
                    </div>
                    <div className="cont-body">
                      {ele.name}
                      <div className="quantity">
                        Qty : {quantity} {ele.quantity} /
                        <span className="me-2">{ele.q_type}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="amount-con fs-5">
              Amount : Rs - : {price[0].price}{" "}
            </div>

            <div className="fs-5 delivery-charge mt-4 d-flex justify-content-end ">
              <div className="inside-con">Delivery :-Rs: 0</div>
            </div>
            <div className="total fs-3 d-flex mt-2 justify-content-end">
              <div className="inside-con">Total :- Rs : {totalPri}</div>
            </div>

            <div className="d-grid mb-3 mt-3">
              <button className="btn btn-secondary">
                <i className="me-2 fa-solid fa-lock"></i>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog text-dark mt-d">
          <div className="modal-content">
            <form onSubmit={addresssubmit}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add New Address
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <select
                        onChange={handlechangeCountry}
                        className="form-select form-select-lg mb-3"
                        aria-label="form-select-lg example"
                      >
                        <option Value="none">Select Country</option>
                        <option value="india">India</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <input
                        onChange={handlechangefn}
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <input
                        onChange={handlechangeln}
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <textarea
                        onChange={handleChangeaddress}
                        placeholder="Address & arew and State"
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <select
                        onClick={handlechangestate}
                        className="form-select form-select mb-3"
                        aria-label=".form-select-lg example"
                      >
                        <option selected value="Tamil Nadu">
                          Select State
                        </option>
                        {country === "india" && stateOptions
                          ? stateOptions
                          : ""}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <select
                        onChange={handleChangedistrict}
                        className="form-select form-select mb-3"
                        aria-label=".form-select example"
                      >
                        <option value="" selected>
                          Select District
                        </option>

                        {country == "india" ? districtOptions : ""}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <input
                        onChange={handleChangepincode}
                        type="number"
                        placeholder="Pincode"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <input
                      type="number"
                      onChange={handleChangephone}
                      placeholder="Phone Number"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="add"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
