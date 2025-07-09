import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";

export default function Revervation() {
  return (
    <>
      {/* RESERVATION START */}
      <section className="reservation mt_100 xs_mt_70">
        <div className="container">
          <div
            className="reservation_bg"
            style={{ backgroundImage: "url(images/reservation_bg.jpg)" }}
          >
            <div className="row">
              <div className="col-xl-6 ms-auto">
                <div
                  className="reservation_form wow fadeInRight"
                  data-wow-duration="1s"
                >
                  <h2>book a table</h2>
                  <form>
                    <div className="row">
                      <div className="col-xl-6 col-lg-6">
                        <div className="reservation_input_single">
                          <label htmlFor="name">name</label>
                          <input type="text" id="name" placeholder="Name" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="reservation_input_single">
                          <label htmlFor="email">email</label>
                          <input type="email" id="email" placeholder="Email" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="reservation_input_single">
                          <label htmlFor="phone">phone</label>
                          <input type="text" id="phone" placeholder="Phone" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="reservation_input_single">
                          <label htmlFor="date">select date</label>
                          <input type="date" id="date" />
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="reservation_input_single">
                          <label>select time</label>
                          <select className="reservation_input select_js">
                            <option value="">select</option>
                            <option value="">08.00 am to 09.00 am</option>
                            <option value="">10.00 am to 11.00 am</option>
                            <option value="">12.00 pm to 01.00 pm</option>
                            <option value="">02.00 pm to 03.00 pm</option>
                            <option value="">04.00 pm to 05.00 pm</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-6">
                        <div className="reservation_input_single">
                          <label>select person</label>
                          <select className="reservation_input select_js">
                            <option value="">select</option>
                            <option value="">1 person</option>
                            <option value="">2 person</option>
                            <option value="">3 person</option>
                            <option value="">4 person</option>
                            <option value="">5 person</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-12">
                        <button type="submit" className="common_btn">
                          confirm
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* RESERVATION END */}
    </>
  );
}
