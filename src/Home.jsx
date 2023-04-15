import { useNavigate } from "react-router-dom";

export function Home() {
  const dataforcat = [
    {
      "img-product": "https://grocerystorez.netlify.app/image/cat-1.png",
      name: "Vegetables",
      offer: "upto 25% off",
    },
    {
      "img-product": "https://grocerystorez.netlify.app/image/cat-2.png",
      name: "Fruits",
      offer: "upto 25% off",
    },
    {
      "img-product": "https://grocerystorez.netlify.app/image/cat-3.png",
      name: "Dairy & Egg",
      offer: "upto 25% off",
    },
    {
      "img-product": "https://grocerystorez.netlify.app/image/cart-4.jpg",
      name: "Houehold Care",
      offer: "upto 25% off",
    },
  ];

  const ourfeature = [
    {
      img: "https://grocerystorez.netlify.app/image/feature-img-1.png",
      name: "Free & Organic",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!",
    },
    {
      img: "	https://grocerystorez.netlify.app/image/feature-img-2.png",
      name: "Fast delivery",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!",
    },
    {
      img: "https://grocerystorez.netlify.app/image/feature-img-3.png",
      name: "Easy Payment",
      details:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, earum!",
    },
  ];

  const Customers = [
    {
      img: "https://grocerystorez.netlify.app/image/pic-1.png",
      name: "John",
      details:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.",
    },
    {
      img: "https://grocerystorez.netlify.app/image/pic-2.png",
      name: "Marley",
      details:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.",
    },
    {
      img: "https://grocerystorez.netlify.app/image/pic-3.png",
      name: "Suriya",
      details:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde sunt fugiat dolore ipsum id est maxime ad tempore quasi tenetur.",
    },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <section>
        <main>
          {/* heading */}
          <div className="d-flex heading mt-5 justify-content-center">
            <h1 className="hf text-white">
              Product <span className="hf type-cat ">Categories</span>{" "}
            </h1>
          </div>
          {/* card catagories */}
          <div className="container mt-4">
            <div className="row d-flex justify-content-center">
              {dataforcat?.map((ele, index) => {
                return (
                  <div key={index} className="col-md-6 mb-3 col-lg-3  col-7">
                    <div className="card p-3">
                      <img
                        src={ele["img-product"]}
                        alt="content-img"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <div className="text-center card-title">{ele.name}</div>
                        <div className="text-center text-muted">
                          {ele.offer}
                        </div>
                        <div className="button mt-2 text-center">
                          <button
                            onClick={() => navigate("/product")}
                            className="btn btn-secondary"
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* heading */}
          <div className="d-flex heading mt-5 justify-content-center">
            <h1 className="hf text-white">
              Our <span className="hf type-cat ">Feature</span>{" "}
            </h1>
          </div>
          {/* card catagories */}
          <div className="container mt-4">
            <div className="row d-flex justify-content-center">
              {ourfeature?.map((ele, index) => {
                return (
                  <div key={index} className="col-md-6 mb-3 col-lg-3 col-7">
                    <div className="our-fe card p-3">
                      <img
                        src={ele.img}
                        alt="content-img"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <div className="text-center card-title">{ele.name}</div>
                        <div className="text-center card-text">
                          {ele.details}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* heading */}
          <div className="d-flex heading mt-5 justify-content-center">
            <h1 className="hf text-white">
              Customer's <span className="hf type-cat ">Review</span>{" "}
            </h1>
          </div>
          {/* card catagories */}
          <div className="container mt-4">
            <div className="row d-flex justify-content-center">
              {Customers?.map((ele, index) => {
                return (
                  <div key={index} className="col-md-6 mb-3 col-lg-3 col-7">
                    <div className=" card review-w">
                      <img
                        src={ele.img}
                        alt="content-img"
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <div className="text-center card-title">{ele.name}</div>
                        <div className="text-center">
                          <div className="rating d-flex justify-content-center">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                          </div>
                        </div>
                        <div className="text-center card-text">
                          {ele.details}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* heading */}
          <div className="d-flex heading mt-5 justify-content-center">
            <h1 className="hf text-white">
              Contact <span className="hf type-cat ">Us !</span>{" "}
            </h1>
          </div>

          <div className="container mb-5 mt-4">
            <div className="row d-flex justify-content-center ">
              <div className="col-11 col-md-8 col-lg-8 ">
                <div className="card p-2 p-md-3">
                  <div className="card-body">
                    <div className="card-title h2">Contact Us</div>
                    <div className="card-text mt-2">
                      We're open for any suggestion or just to have a contact
                    </div>
                    <div className="card-text mt-2">
                      <i className="me-2 fa-solid fa-location-dot"></i> Address:
                      3/55 North street, Chennai 001.
                    </div>
                    <div className="card-text mt-2">
                      {" "}
                      <i className="fa-solid fa-phone me-2 "></i> Phone:
                      9588339077
                    </div>
                    <div className="card-text mt-2"></div>
                    <i className="fa-regular fa-paper-plane me-2"></i>{" "}
                    gstore@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>

      <section>
        <footer className="foot">
          <div className="d-flex  mt-3 justify-content-center">
            <h1 className="h4">
              Copyright © 2023 All rights reserved | @zyedibrahim
            </h1>
          </div>
        </footer>
      </section>
    </div>
  );
}
