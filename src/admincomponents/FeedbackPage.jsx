import { useEffect, useState } from "react";
import { API } from "../data";

export function FeedbackPage() {
  const [feedback, setfeedback] = useState([]);
  const [isLoading, setisLoding] = useState(false);

  const getfeedback = async () => {
    const api = await fetch(`${API}/feedback`);
    const conjson = await api.json();
    if (conjson.status === "200 ok") {
      setfeedback(conjson.data);
      setisLoding(true);
    }
  };

  useEffect(() => {
    getfeedback();
  }, [isLoading]);
  return (
    <div className="container">
      <div className="mb-5 text-light">
        <div className="h1 text-center mb-3">FeedBacks</div>

        <div className="row d-flex justify-content-center ">
          {isLoading === false ? (
            <h1>loading</h1>
          ) : (
            feedback?.map((ele, index) => {
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
            })
          )}
        </div>
      </div>
    </div>
  );
}
