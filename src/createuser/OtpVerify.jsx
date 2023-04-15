import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../data";

export function OtpVerify() {
  const [otpvalidata, setotpvalidatae] = useState("false");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    otp: "",
  });

  function handleInputChangeotpfield(event) {
    setFormData({ otp: event.target.value });
    setotpvalidatae("true");
  }

  const otpverfy = async (data) => {
    await fetch(`${API}/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  const handlesubmitotp = (event) => {
    event.preventDefault();

    if (formData.otp !== "") {
      otpverfy(formData);
      console.log(formData, "submit");
      setotpvalidatae("true");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      setotpvalidatae("false");
    }
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-10 col-md-6 card ">
          <div className="card-body">
            <form onSubmit={handlesubmitotp}>
              <div className="mb-3">
                <label className="form-label">Enter OTP</label>

                <input
                  onChange={handleInputChangeotpfield}
                  type="text"
                  placeholder="Enter a OTP"
                  className="form-control"
                />
                {otpvalidata !== "true" ? (
                  <small>Fill the otp field</small>
                ) : (
                  ""
                )}
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
