import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// import dataaddress from "./dataAddress";
import { API } from "./data";

const formvalidationschemaaddress = yup.object({
  country: yup.string().required("This is fiels is required"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  district: yup.string().required("District is required"),
  pincode: yup.number().required("Pincode is required"),
  phone: yup.number().required("Phone is required"),
});
const formvalidationschemaaddressedit = yup.object({
  country: yup.string().required("This is fiels is required"),
  firstname: yup.string().required("First name is required"),
  lastname: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  state: yup.string().required("State is required"),
  district: yup.string().required("District is required"),
  pincode: yup.number().required("Pincode is required"),
  phone: yup.number().required("Phone is required"),
});

export function CheckoutPage({ cartitem, quantity }) {
  const [cprouduct, setcproduct] = useState([cartitem]);

  const getid = localStorage.getItem("_id");
  const [address, setaddress] = useState([]);
  const getdata = async () => {
    await fetch(`${API}/add/address/${getid}`)
      .then((data) => data.json())
      .then((data) => setaddress(data.addressdata))
      .catch((err) => console.log(err));
  };
  console.log(address, "address");
  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    setcproduct(cartitem);
  }, [cartitem]);

  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        country: "",

        firstname: "",
        lastname: "",
        address: "",
        state: "",
        district: "",
        pincode: "",
        phone: "",
      },
      validationSchema: formvalidationschemaaddress,
      onSubmit: (data) => {
        console.log(data);
        storeaddressindb(data);
      },
    });
  const [showButton, setShowButton] = useState(false);
  const buttonRef = useRef(null);

  const storeaddressindb = async (data) => {
    const idfrmstr = localStorage.getItem("_id");
    const dataf = await fetch(`${API}/add/address/${idfrmstr}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsondata = await dataf.json();
    console.log(jsondata);
    if (jsondata.status === "200 ok") {
      setShowButton(true);
      getdata();
    }
  };

  useEffect(() => {
    if (showButton) {
      buttonRef.current.click();
    }
  }, [showButton]);

  return (
    <div className="text-white container">
      <h1>checkout page</h1>
      <div className="row d-flex justify-content-center ">
        <div className="col-12  mb-3 col-md-3 col-lg-3">
          <div className="d-grid mt-5">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              add address
            </button>
          </div>
        </div>
        <div className="col-12 mb-3 col-md-9 col-lg-9">
          <Addadressfun
            address={address}
            quantity={quantity}
            qun
            cprouduct={cprouduct}
          />
        </div>
      </div>

      {/* address template */}
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
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add New Address
              </h1>
              <button
                ref={buttonRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <input
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="country"
                        placeholder="Country"
                        value={values.country}
                        className="form-control mb-3"
                        aria-label="form-select-lg example"
                      />

                      {touched.country && errors.country ? errors.country : ""}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="firstname"
                        value={values.firstname}
                        type="text"
                        placeholder="First Name"
                        className="form-control"
                      />
                      {errors.firstname && touched.firstname
                        ? errors.firstname
                        : ""}
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="lastname"
                        value={values.lastname}
                        type="text"
                        placeholder="Last Name"
                        className="form-control"
                      />
                      {errors.lastname && touched.lastname
                        ? errors.lastname
                        : ""}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <textarea
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="address"
                        value={values.address}
                        placeholder="Address & arew and State"
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                      {errors.address && touched.address ? errors.address : ""}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="state"
                        value={values.state}
                        type="text"
                        placeholder="State"
                        className="form-control"
                      />
                    </div>
                    {errors.state && touched.state ? errors.state : ""}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="district"
                        value={values.district}
                        type="text"
                        placeholder="District"
                        className="form-control"
                      />
                    </div>
                    {errors.district && touched.district ? errors.district : ""}
                  </div>
                  <div className="col-12 col-md-4">
                    <div className="mb-3">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="pincode"
                        value={values.pincode}
                        type="number"
                        placeholder="Pincode"
                        className="form-control"
                      />
                      {errors.pincode && touched.pincode ? errors.pincode : ""}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="mb-3"></div>
                    <input
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="phone"
                      value={values.phone}
                      placeholder="Phone Number"
                      className="form-control"
                    />
                    {errors.phone && touched.phone ? errors.phone : ""}
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
    </div>
  );
}

const formvalidationschemapay = yup.object({
  checkadd: yup.string().required("select address is required"),
  payment: yup.string().required("select payment"),
});

function Addadressfun({ cprouduct, quantity, address }) {
  const price = [...cprouduct];
  const totalPri = cprouduct.reduce(
    (total, product) => total + product.price,
    0
  );

  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        checkadd: "",
        payment: "",
      },
      validationSchema: formvalidationschemapay,
      onSubmit: (data) => {
        console.log(data, cprouduct, "products");
      },
    });

  const [editdatafr, seteditdatafr] = useState([]);

  function delefun() {}

  function editfun(editdata) {
    console.log(editdata);
    seteditdatafr(editdata);
  }

  return (
    <div>
      <form
        className="row d-flex justify-content-center"
        onSubmit={handleSubmit}
      >
        <div className="col-12 mb-3 col-md-6">
          {address?.map((ele, index) => {
            return address !== "undefined" ? (
              <div key={index}>
                <div className="form-check">
                  <input
                    name="checkadd"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="form-check-input"
                    type="radio"
                    value={ele}
                    id={`flexRadioDefault${index}`}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexRadioDefault${index}`}
                  >
                    <div>
                      Name : {ele.firstname} {ele.lastname}
                    </div>

                    <div>
                      Address : {ele.address} {ele.state}
                      {ele.district}
                    </div>
                    <div>
                      Pincode:
                      {ele.pincode}
                    </div>
                    <div>Phone : {ele.phone}</div>
                  </label>
                  <div className="config-con mt-2 mb-2 d-flex gap-3">
                    {/* edit button address */}
                    <button
                      className="btn btn-success"
                      type="button"
                      onClick={() => editfun(ele)}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop1"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => console.log(index)}
                      className="btn btn-danger"
                    >
                      del
                    </button>
                  </div>
                  <EditAddress editdatafr={editdatafr} />
                </div>
                {touched.checkadd && errors.checkadd ? errors.checkadd : ""}
              </div>
            ) : (
              <h1 className="text-white">Please Add Address</h1>
            );
          })}
        </div>
        <div className="col-12 col-md-6">
          <div className="mb-3">
            <h3>Payment Mode</h3>
            <select
              onChange={handleChange}
              value={values.payment}
              onBlur={handleBlur}
              name="payment"
              defaultValue="Offlinepay"
              className="form-select form-select-lg mb-3"
              aria-label="form-select-lg example"
            >
              <option value="onlinepay">Online Payment</option>
              <option value="offlinepay">Offline Payment</option>
            </select>
            <div className="mb-3">
              {touched.payment && errors.payment ? errors.payment : ""}
            </div>

            <div className="h4">Order summary</div>
          </div>

          <div className="place-ordercon">
            {cprouduct?.map((ele, index) => {
              return (
                <div
                  key={index}
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
              <button type="submit" className="btn btn-secondary">
                <i className="me-2 fa-solid fa-lock"></i>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function EditAddress({ editdatafr }) {
  return editdatafr ? (
    <Addaddress editdatafr={editdatafr} />
  ) : (
    <h1 className="text-white">Loading...</h1>
  );
}

function Addaddress({ editdatafr }) {
  // const [getaddress, setaddress] = useState([]);

  console.log(editdatafr.country, "from adddaress");

  // const idfrmstr = localStorage.getItem("_id");

  // // const getcontact = async () => {
  // //   const apidata = await fetch(`${API}/add/address/${idfrmstr}`);
  // //   const data = await apidata.json();
  // //   setaddress(data.addressdata);
  // // };

  // // useEffect(() => {
  // //   getcontact();
  // // }, []);

  // console.log(getaddress, "getaddress");
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        country: editdatafr?.country,
        firstname: editdatafr?.firstname,
        lastname: editdatafr?.lastname,
        address: editdatafr?.address,
        state: editdatafr?.state,
        district: editdatafr?.district,
        pincode: editdatafr?.pincode,
        phone: editdatafr?.phone,
      },
      validationSchema: formvalidationschemaaddressedit,
      onSubmit: (data) => {
        console.log(data);
      },
    });

  return (
    <div
      className="modal fade"
      id="staticBackdrop1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog text-dark mt-d">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Edit Address
            </h1>
            <button
              // ref={buttonRef}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <input
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="country"
                      placeholder="Country"
                      value={values.country}
                      className="form-control mb-3"
                      aria-label="form-select-lg example"
                    />

                    {touched.country && errors.country ? errors.country : ""}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="firstname"
                      value={values.firstname}
                      type="text"
                      placeholder="First Name"
                      className="form-control"
                    />
                    {errors.firstname && touched.firstname
                      ? errors.firstname
                      : ""}
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="lastname"
                      value={values.lastname}
                      type="text"
                      placeholder="Last Name"
                      className="form-control"
                    />
                    {errors.lastname && touched.lastname ? errors.lastname : ""}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <textarea
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="address"
                      value={values.address}
                      placeholder="Address & arew and State"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                    {errors.address && touched.address ? errors.address : ""}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="state"
                      value={values.state}
                      type="text"
                      placeholder="State"
                      className="form-control"
                    />
                  </div>
                  {errors.state && touched.state ? errors.state : ""}
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="district"
                      value={values.district}
                      type="text"
                      placeholder="District"
                      className="form-control"
                    />
                  </div>
                  {errors.district && touched.district ? errors.district : ""}
                </div>
                <div className="col-12 col-md-4">
                  <div className="mb-3">
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="pincode"
                      value={values.pincode}
                      type="number"
                      placeholder="Pincode"
                      className="form-control"
                    />
                    {errors.pincode && touched.pincode ? errors.pincode : ""}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="mb-3"></div>
                  <input
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="phone"
                    value={values.phone}
                    placeholder="Phone Number"
                    className="form-control"
                  />
                  {errors.phone && touched.phone ? errors.phone : ""}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  data-bs-dismiss="update"
                >
                  Update
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
