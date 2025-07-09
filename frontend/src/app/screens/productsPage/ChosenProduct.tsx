import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setChosenProduct, setRestaurant } from "./slice";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { Product } from "../../../lib/types/product";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);
const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;
  return (
    <>
      <section className="menu_details mt_100 xs_mt_75 mb_95 xs_mb_65">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-5 col-sm-10 col-md-9 wow fadeInUp"
              data-wow-duration="1s"
            >
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="swiper-area"
              >
                {chosenProduct?.productImages.map(
                  (ele: string, index: number) => {
                    const imagePath = `${serverApi}/${ele}`;
                    return (
                      <SwiperSlide key={index}>
                        <img className="slider-image" src={imagePath} />
                      </SwiperSlide>
                    );
                  }
                )}
              </Swiper>
            </div>
            <div
              className="col-lg-7 wow fadeInUp"
              data-wow-duration="1s"
              style={{ paddingLeft: "35px" }}
            >
              <div className="menu_details_text">
                <h2> {chosenProduct.productName}</h2>
                <h3 className="price">${chosenProduct?.productPrice}</h3>
                <p className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <i className="far fa-star"></i>
                  <span>(201)</span>
                </p>
                <p className="rating">
                  <i className="fas fa-eye"></i>
                  <span>({chosenProduct?.productViews})</span>
                </p>
                <p className="short_description">
                  {chosenProduct?.productDesc
                    ? chosenProduct?.productDesc
                    : "No Description"}
                </p>

                {/* <div className="details_size">
                  <h5>select size</h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="large"
                      checked
                    />
                    <label className="form-check-label" htmlFor="large">
                      large <span>+ $350</span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="medium"
                    />
                    <label className="form-check-label" htmlFor="medium">
                      medium <span>+ $250</span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="small"
                    />
                    <label className="form-check-label" htmlFor="small">
                      small <span>+ $150</span>
                    </label>
                  </div>
                </div>

                <div className="details_extra_item">
                  <h5>
                    select option <span>(optional)</span>
                  </h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="coca-cola"
                    />
                    <label className="form-check-label" htmlFor="coca-cola">
                      coca-cola <span>+ $10</span>
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="7up"
                    />
                    <label className="form-check-label" htmlFor="7up">
                      7up <span>+ $15</span>
                    </label>
                  </div>
                </div> */}

                <div className="details_quentity">
                  <h5>select quentity</h5>
                  <div className="quentity_btn_area d-flex flex-wrapa align-items-center">
                    <div className="quentity_btn">
                      <button className="btn btn-danger">
                        <i className="fal fa-minus"></i>
                      </button>
                      <input type="text" placeholder="1" />
                      <button className="btn btn-success">
                        <i className="fal fa-plus"></i>
                      </button>
                    </div>
                    {/* <h3>$320.00</h3> */}
                  </div>
                </div>
                <ul className="details_button_area d-flex flex-wrap">
                  <li>
                    <button
                      type="button"
                      className="common_btn"
                      onClick={(e) => {
                        onAdd({
                          _id: chosenProduct._id,
                          quantity: 1,
                          name: chosenProduct.productName,
                          price: chosenProduct.productPrice,
                          image: chosenProduct.productImages[0],
                        });
                        e.stopPropagation();
                      }}
                    >
                      add to cart
                    </button>
                  </li>
                  {/* <li>
                    <a className="common_btn" href="#">
                      wishlist
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="col-12 wow fadeInUp" data-wow-duration="1s">
              <div className="menu_description_area mt_100 xs_mt_70">
                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-home"
                      type="button"
                      role="tab"
                      aria-controls="pills-home"
                      aria-selected="true"
                    >
                      Description
                    </button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    tabIndex={0}
                  >
                    <div className="menu_det_description">
                      <p>
                        {chosenProduct?.productDesc
                          ? chosenProduct?.productDesc
                          : "No Description"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
