import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  const authMember = null;

  return (
    <>
      {/* FOOTER START */}
      <footer style={{ backgroundImage: "url(/images/footer_bg.jpg)" }}>
        <div className="footer_overlay pt_100 xs_pt_70 pb_100 xs_pb_20">
          <div className="container wow fadeInUp" data-wow-duration="1s">
            <div className="row justify-content-between">
              <div className="col-xxl-4 col-lg-4 col-sm-9 col-md-7">
                <div className="footer_content">
                  <NavLink to="/" className="footer_logo">
                    <img
                      src="/images/logo2.png"
                      alt="RegFood"
                      className="img-fluid w-100"
                      style={{ borderRadius: "10px" }}
                    />
                  </NavLink>
                  <span></span>
                  <ul className="social_link d-flex flex-wrap">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-google-plus-g"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-2 col-sm-5 col-md-5">
                <div className="footer_content">
                  <h3>Short Link</h3>
                  <ul>
                    <li>
                      <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                      <NavLink to="/products">Menu</NavLink>
                    </li>
                    <li>
                      <NavLink to="/help">Help</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-2 col-lg-2 col-sm-6 col-md-5 order-md-4">
                {/* <div className="footer_content">
                  <h3>Help Link</h3>
                  <ul>
                    <li>
                      <a href="#">Terms & Conditions</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Refund Policy</a>
                    </li>
                    <li>
                      <a href="#">FAQ</a>
                    </li>
                    <li>
                      <a href="#">contact</a>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="col-xxl-3 col-lg-4 col-sm-9 col-md-7 order-lg-4">
                <div className="footer_content">
                  <h3>contact us</h3>
                  <p className="info">
                    <i className="fas fa-phone-alt"></i> +010888888888888
                  </p>
                  <p className="info">
                    <i className="fas fa-envelope"></i> quickbite@quickbite.com
                  </p>
                  <p className="info">
                    <i className="far fa-map-marker-alt"></i> South Korea, Seoul
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bottom d-flex flex-wrap">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer_bottom_text">
                  <p>Copyright © 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* FOOTER END */}

      {/* SCROLL BUTTON START */}

      <div className="scroll_btn">
        <i className="fas fa-hand-pointer"></i>
      </div>

      {/* SCROLL BUTTON END  */}
    </>
  );
}
