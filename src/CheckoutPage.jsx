import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// import dataaddress from "./dataAddress";
import { API } from "./data";
import { useNavigate } from "react-router-dom";

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

export function CheckoutPage({ cartitem, setcartitem, quantity }) {
  const navigate = useNavigate();
  const [cprouduct, setcproduct] = useState([cartitem]);

  const getid = localStorage.getItem("_id");
  const [address, setaddress] = useState([]);
  const getdata = async () => {
    await fetch(`${API}/add/address/${getid}`)
      .then((data) => data.json())
      .then((data) => setaddress(data.addressdata))
      .catch((err) => console.log(err));
  };

  const [editdtstr, seteditdtstr] = useState();

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    setcproduct(cartitem);
  }, [cartitem]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  const [nxtpage, setnxtpage] = useState(false);

  const randomNumber = generateRandomNumber();
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        id: randomNumber,
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
  const [orderpage, setorderpage] = useState(false);

  const orderpagefun = () => {
    navigate("/product");
    setcartitem();
    setTimeout(() => {
      setorderpage(true);
    }, 2000);
  };

  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  const [
    { value: weekday },
    ,
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    { value: second },
    ,
    { value: dayPeriod },
  ] = dateTimeFormat.formatToParts(date);

  return orderpage === false ? (
    nxtpage === false ? (
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
              setcproduct={setcproduct}
              address={address}
              quantity={quantity}
              qun
              cprouduct={cprouduct}
              setnxtpage={setnxtpage}
              seteditdtstr={seteditdtstr}
              orderpagefun={orderpagefun}
              setorderpage={setorderpage}
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
                        {/*  */}
                        {touched.country && errors.country
                          ? errors.country
                          : ""}
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
                        {errors.address && touched.address
                          ? errors.address
                          : ""}
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
                      {errors.district && touched.district
                        ? errors.district
                        : ""}
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
                        {errors.pincode && touched.pincode
                          ? errors.pincode
                          : ""}
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
    ) : editdtstr ? (
      <Editadd editdtstr={editdtstr} setnxtpage={setnxtpage} />
    ) : (
      <h1>Loading...</h1>
    )
  ) : (
    <div classname="container">
      <div className="wrp">
        <div className="row-con mt-3 mb-3 d-flex justify-content-center ">
          <div className="col-10">
            <div className="card text-center ">
              <div className="card-body">
                <div className="h1">
                  <h1>Continue shoping ! </h1>
                  <div className="h5 text-muted">Order Date</div>
                  <div className="h4">
                    <p>
                      {weekday}, {month} {day}, {year}
                    </p>
                    <p>
                      {hour}:{minute}:{second} {dayPeriod}
                    </p>
                  </div>
                  <div className="card-title mb-3 mt-3">
                    <i
                      className="fa-solid fa-circle-check"
                      style={{ color: "#47e159" }}
                    ></i>
                  </div>
                  <div className="text-muted mt-3 mb-3">
                    <div className="card-text h5 ">
                      Track Id : {cprouduct[0]._id}
                    </div>
                  </div>
                  <div className="btn-con mb-3">
                    <button
                      onClick={() => orderpagefun()}
                      className="btn btn-success"
                    >
                      Continue Shopping
                      <i className="fa-solid ms-2 fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
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

function Addadressfun({
  cprouduct,
  setcartitem,
  quantity,
  address,
  setnxtpage,
  seteditdtstr,
  orderpagefun,
  setorderpage,
}) {
  const price = [...cprouduct];
  const totalPri = cprouduct.reduce(
    (total, product) => total + product.price,
    0
  );

  const navigate = useNavigate();
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        checkadd: "",
        payment: "",
      },
      validationSchema: formvalidationschemapay,
      onSubmit: (data) => {
        const orderdata = {
          address: address[data.checkadd],
          payment: data.payment,
          product: cprouduct,
          _id: localStorage.getItem("_id"),
        };

        putorderdata(orderdata);
      },
    });

  const putorderdata = async (data) => {
    console.log(data.product[0]._id);
    const fetchapi = await fetch(
      `${API}/alluser/accounts/${data.product[0]._id} `,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("adtoken"),
        },
      }
    );
    const jsondata = await fetchapi.json();
    const temp = await jsondata.status;

    if (temp === "200 ok") {
      setorderpage(true);
    }
  };

  async function delefu(data, index) {
    const dataid = { iddata: data.id };
    console.log(dataid);

    // const idfrmstr = localStorage.getItem("_id");
    // const dataf = await fetch(`${API}/add/address/del/${idfrmstr}`, {
    //   method: "PUT",
    //   body: JSON.stringify(address),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const jsondata = await dataf.json();
    // console.log(jsondata);
    // if (jsondata.status === "200 ok") {
    //   setTimeout(() => {
    //     getdata();
    //   }, 1000);
    // }
  }

  const delefun = async (data, index) => {
    delefu(data, index);
  };

  console.log(address, "out address filete");

  function editfun(data) {
    setnxtpage(true);
    console.log("tirgger");
    seteditdtstr(data);
  }
  useEffect(() => {}, [address]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center">
          <div className="col-12 mb-3 col-md-6">
            {address ? (
              address?.map((ele, index) => {
                return address !== "undefined" ? (
                  <div key={index}>
                    <div className="form-check">
                      <input
                        name="checkadd"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="form-check-input"
                        type="radio"
                        value={index}
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
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => delefun(ele, index)}
                          className="btn btn-danger"
                        >
                          del
                        </button>
                      </div>
                    </div>
                    {touched.checkadd && errors.checkadd ? errors.checkadd : ""}
                  </div>
                ) : (
                  <h1 className="text-white">Please Add Address</h1>
                );
              })
            ) : (
              <h4 className="text-white text-center ">Add Address</h4>
            )}
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
        </div>
      </form>
    </div>
  );
}

function Editadd({ editdtstr, setnxtpage }) {
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        country: editdtstr.country,
        firstname: editdtstr.firstname,
        lastname: editdtstr.lastname,
        address: editdtstr.address,
        state: editdtstr.state,
        district: editdtstr.district,
        pincode: editdtstr.pincode,
        phone: editdtstr.phone,
      },
      validationSchema: formvalidationschemaaddress,
      onSubmit: (data) => {
        console.log(data);
      },
    });
  console.log(editdtstr.id);

  return (
    <div>
      <div className="rows mt-5 d-flex justify-content-center">
        <div className="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">
          <div className="card">
            <div className="card-header text-center ">
              <div className="h3 ">Update Address</div>
            </div>
            <div className="card-body">
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
                    className="btn btn-success me-2"
                    data-bs-dismiss="update"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setnxtpage(false)}
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
