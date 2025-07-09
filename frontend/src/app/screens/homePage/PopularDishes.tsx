import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

// REDUX SLICE & SELECTOR
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function PopularDishes() {
  const { popularDishes } = useSelector(popularDishesRetriever);
  const history = useHistory();
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <>
      {/* MENU ITEM START */}
      <section className="menu mt_95 xs_mt_65">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-6 col-lg-6 wow fadeInUp"
              data-wow-duration="1s"
            >
              <div className="section_heading mb_25">
                <h4>food Menu</h4>
                <h2>Popular Delicious Foods</h2>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-6 wow fadeInUp"
              data-wow-duration="1s"
            >
              {/* <div className="menu_filter d-flex flex-wrap">
                <button className=" active" data-filter="*"></button>
              </div> */}
            </div>
          </div>
          <div className="row grid">
            {popularDishes.length !== 0 ? (
              popularDishes.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <div
                    className="col-xxl-3 col-sm-6 col-lg-4 chicken wow fadeInUp"
                    data-wow-duration="1s"
                    key={product._id}
                  >
                    <div className="menu_item">
                      <div className="menu_item_img">
                        <img
                          src={imagePath}
                          alt="menu"
                          className="img-fluid w-100"
                        />
                      </div>
                      <div className="menu_item_text">
                        <a className="category" href="#">
                          Popular Foods
                        </a>
                        <a
                          className="title"
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          {product.productName}
                        </a>
                        <p className="rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                          <span>24</span>
                        </p>
                        <h5 className="price">${product.productPrice}</h5>
                        <a className="add_to_cart" href="#">
                          add to cart
                        </a>
                        <ul className="d-flex flex-wrap justify-content-end">
                          <li>
                            <a href="#">
                              <i className="fal fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="far fa-eye"></i>
                              {product.productViews}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </div>
        </div>
      </section>
      {/* MENU ITEM END */}
    </>
  );
}
