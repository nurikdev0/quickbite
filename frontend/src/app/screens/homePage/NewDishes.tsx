import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";

// REDUX SLICE & SELECTOR
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);
  const history = useHistory();
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <section className="offer_item pt_95 pb_100 xs_pt_65 xs_pb_70">
      <div className="container">
        <div className="row wow fadeInUp" data-wow-duration="1s">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <div className="section_heading mb_25">
              <h4>daily offer</h4>
              <h2>up to 75% off for this day</h2>
            </div>
          </div>
        </div>
        <div
          className="row offer_item_slider wow fadeInUp"
          data-wow-duration="1s"
        >
          {newDishes.length !== 0 ? (
            newDishes.map((product: Product) => {
              const imagePath = `${serverApi}/${product.productImages[0]}`;
              const sizeVolume =
                product.productCollection === ProductCollection.DRINK
                  ? product.productVolume + "l"
                  : product.productSize + " size";
              return (
                <div className="col-xl-4" key={product._id}>
                  <div
                    className="offer_item_single"
                    style={{
                      backgroundImage: `url(${imagePath})`,
                    }}
                  >
                    <span>37% off</span>
                    <a
                      className="title"
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      {product.productName}
                    </a>
                    <p>${product.productPrice}</p>
                    <ul className="d-flex flex-wrap">
                      <li>
                        <a href="#">
                          <i className="fas fa-shopping-basket"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="far fa-eye">{product.productViews}</i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <Box className="no-data">New products are not available!</Box>
          )}
        </div>
      </div>
    </section>
  );
}
