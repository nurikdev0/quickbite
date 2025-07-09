import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
  return (
    <>
      {/* COUNTER START   */}
      <section
        className="counter_part"
        style={{ background: "url(images/counter_bg.jpg)" }}
      >
        <div className="counter_overlay pt_120 xs_pt_90 pb_100 xs_pb_0">
          <div className="container">
            <div className="row">
              <div
                className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
                data-wow-duration="1s"
              >
                <div className="single_counter">
                  <div className="text">
                    <h2 className="counter">85,000</h2>
                    <span>
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <p>customer serve</p>
                </div>
              </div>
              <div
                className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
                data-wow-duration="1s"
              >
                <div className="single_counter">
                  <div className="text">
                    <h2 className="counter">120</h2>
                    <span>
                      <i className="fas fa-hat-chef"></i>
                    </span>
                  </div>
                  <p>experience chef</p>
                </div>
              </div>
              <div
                className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
                data-wow-duration="1s"
              >
                <div className="single_counter">
                  <div className="text">
                    <h2 className="counter">72,000</h2>
                    <span>
                      <i className="fas fa-users"></i>
                    </span>
                  </div>
                  <p>happy customer</p>
                </div>
              </div>
              <div
                className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp"
                data-wow-duration="1s"
              >
                <div className="single_counter">
                  <div className="text">
                    <h2 className="counter">30</h2>
                    <span>
                      <i className="fas fa-trophy"></i>
                    </span>
                  </div>
                  <p>winning award</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* COUNTER END */}
    </>
  );
}
