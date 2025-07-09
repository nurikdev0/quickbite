import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { plans } from "../../../lib/data/plans";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <>
      {/* BLOG START */}
      <section className="blog pt_95 xs_pt_65 pb_65 xs_pb_35">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-duration="1s">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <div className="section_heading mb_25">
                <h4>Events</h4>
                <h2>Events</h2>
              </div>
            </div>
          </div>

          <div className="row blog_slider">
            {plans.map((value, number) => {
              return (
                <div
                  className="col-xl-4 col-md-6 wow fadeInUp"
                  data-wow-duration="1s"
                  key={number}
                >
                  <div className="single_blog">
                    <div className="single_blog_img">
                      <img
                        src={value.img}
                        alt="author"
                        className="img-fluid w-100"
                      />
                    </div>
                    <div className="single_blog_author">
                      {/* <div className="img">
                        <img
                          src="images/client_1.png"
                          alt="author"
                          className="img-fluid w-100"
                        />
                      </div> */}
                      <div className="text">
                        <h5>{value.author}</h5>
                        <p>{value.date}</p>
                      </div>
                    </div>
                    <div className="single_blog_text">
                      <a className="category" href="#">
                        food
                      </a>
                      <a className="title" href="blog_details.html">
                        {value.title}
                      </a>
                      <p>{value.desc}</p>
                      <div className="single_blog_footer">
                        <a className="read_btn" href="#">
                          {value.location}
                        </a>
                        <span>
                          <img src={"/icons/location.svg"} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* BLOG END */}
    </>
  );
}
