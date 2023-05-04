import { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// import dataaddress from "./dataAddress";
import { API } from "./data";

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

export function Editaddress() {
  return <UpdateAddress />;
}

function UpdateAddress() {
  const { values, handleSubmit, touched, handleBlur, errors, handleChange } =
    useFormik({
      initialValues: {
        // country: editdatafr?.country,
        // firstname: editdatafr?.firstname,
        // lastname: editdatafr?.lastname,
        // address: editdatafr?.address,
        // state: editdatafr?.state,
        // district: editdatafr?.district,
        // pincode: editdatafr?.pincode,
        // phone: editdatafr?.phone,
      },
      validationSchema: formvalidationschemaaddressedit,
      onSubmit: (data) => {
        console.log(data);
      },
    });

  return (
    <div className="container">
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
              {errors.firstname && touched.firstname ? errors.firstname : ""}
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
  );
}
