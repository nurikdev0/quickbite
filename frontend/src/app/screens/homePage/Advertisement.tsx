import React from "react";

export default function Advertisement() {
  return (
    <>
      {/* ADD SLIDER START */}
      <section className="add_slider mt_75 xs_mt_45">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-duration="1s">
            <div className="col-xl-6 col-lg-6">
              <div
                className="add_slider_single"
                style={{ backgroundImage: "url(images/offer_slider_1.png)" }}
              >
                <div className="text">
                  <h5>weekly best seller</h5>
                  <h2>Fried Chicken</h2>
                  <a href="#">
                    shop now <i className="far fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div
                className="add_slider_single"
                style={{ backgroundImage: "url(images/offer_slider_2.png)" }}
              >
                <div className="text">
                  <h5>daily offer</h5>
                  <h2>Hyderabadi Biryani</h2>
                  <a href="#">
                    shop now <i className="far fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ADD SLIDER END */}

      {/* DOWNLOAD APP START */}
      <section className="download mt_100 xs_mt_70">
        <div className="row">
          <div className="col-xl-4 col-lg-4">
            <div
              className="download_text_bg"
              style={{ backgroundImage: "url(images/download_img.png)" }}
            >
              <div className="download_text_overlay">
                <div
                  className="download_text wow fadeInUp"
                  data-wow-duration="1s"
                >
                  <h5>$5.00 Cashback</h5>
                  <h2>Easy To Order Our All Food</h2>
                  <ul className="d-flex flex-wrap">
                    <li>
                      <a href="#">
                        <span className="icon">
                          <i className="fab fa-google-play"></i>
                        </span>
                        <p>
                          <span>Available on the</span>
                          Google Play
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="icon">
                          <i className="fab fa-apple"></i>
                        </span>
                        <p>
                          <span>Download on the</span>
                          App Store
                        </p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8">
            <div className="row download_slider_item">
              <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
                <div className="download_slider">
                  <img
                    src="images/download_slider_4.jpg"
                    alt="app download"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
              <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
                <div className="download_slider">
                  <img
                    src="images/download_slider_3.jpg"
                    alt="app download"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
              <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
                <div className="download_slider">
                  <img
                    src="images/download_slider_2.jpg"
                    alt="app download"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
              <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
                <div className="download_slider">
                  <img
                    src="images/download_slider_1.jpg"
                    alt="app download"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
              <div className="col-xl-3 wow fadeInUp" data-wow-duration="1s">
                <div className="download_slider">
                  <img
                    src="images/download_slider_5.jpg"
                    alt="app download"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* DOWNLOAD APP END */}
    </>
  );
}
