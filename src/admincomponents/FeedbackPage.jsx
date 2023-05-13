import { useEffect, useState } from "react";
import { API } from "../data";

export function FeedbackPage() {
  const [feedback, setfeedback] = useState([]);
  const [Loading, setLoding] = useState(true);

  const getfeedback = async () => {
    const api = await fetch(`${API}/feedback`);
    const conjson = await api.json();
    if (conjson.status === "200 ok") {
      setfeedback(conjson.data);
      setLoding(false);
    }
  };

  useEffect(() => {
    getfeedback();
  }, []);
  return (
    <div className="container">
      <div className="mb-5 text-light">
        <div className="h1 text-center mb-3">FeedBacks</div>

        {Loading ? (
          <div
            className="mb-3 mt-5"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="loader"></div>
            <div className="text-center mt-3 ms-4 text-white h2">
              Loading ...
            </div>
          </div>
        ) : (
          <div className="row mt-5 mb-5 justify-content-center justify-content-sm-center justify-content-md-start justify-content-lg-start justify-content-xl-start ">
            {feedback?.map((ele, index) => {
              return (
                <div
                  key={ele._id}
                  className="col-10 col-sm-6 col-md-4 col-lg-3 col-xxl-3"
                >
                  <div className="card text-dark bg-light mb-3">
                    <div className="card-header">Feebacks </div>
                    <div className="card-body">
                      <h5 className="card-title">Feedbacks {index + 1} </h5>
                      <p className="card-text">{ele.feedback}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
