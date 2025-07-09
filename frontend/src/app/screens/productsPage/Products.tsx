import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Helmet } from "react-helmet-async";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  // HANDLER
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      {/* MENU PAGE START */}

      <section className="menu_page mt_100 xs_mt_70 mb_100 xs_mb_70">
        <div className="container">
          <div className="row menu_search_area">
            <div className="col-lg-10 col-md-10">
              <div className="menu_search">
                <input
                  type={"search"}
                  name={"singleResearch"}
                  placeholder={"search..."}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                />
              </div>
            </div>
            <div className="col-lg-2 col-md-2">
              <div className="menu_search">
                <button
                  type="button"
                  className="common_btn"
                  onClick={searchProductHandler}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-xl-12 col-lg-12 wow fadeInUp"
              data-wow-duration="1s"
            >
              <div
                className="menu_filter d-flex flex-wrap"
                style={{ marginLeft: "0px" }}
              >
                <button
                  className={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "active"
                      : " "
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Dish
                </button>
                <button
                  className={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "active"
                      : " "
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </button>
                <button
                  className={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "active"
                      : " "
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink
                </button>
                <button
                  className={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "active"
                      : " "
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Dessert
                </button>
                <button
                  className={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "active"
                      : " "
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </button>
                <button
                  style={{ marginLeft: "40px" }}
                  className={
                    productSearch.order === "createdAt" ? "active" : " "
                  }
                  onClick={() => searchOrderHandler("createdAt")}
                >
                  New
                </button>
                <button
                  className={
                    productSearch.order === "productPrice" ? "active" : " "
                  }
                  onClick={() => searchOrderHandler("productPrice")}
                >
                  Price
                </button>

                <button
                  className={
                    productSearch.order === "productViews" ? "active" : " "
                  }
                  onClick={() => searchOrderHandler("productViews")}
                >
                  Views
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? product.productVolume + " litre"
                    : product.productSize + " size";
                return (
                  <div
                    className="col-xl-3 col-sm-6 col-lg-4 wow fadeInUp"
                    data-wow-duration="1s"
                    key={product._id}
                  >
                    <div className="menu_item">
                      <div className="menu_item_img">
                        <img
                          src={`${imagePath}`}
                          alt="menu"
                          className="img-fluid w-100"
                        />
                      </div>
                      <div className="menu_item_text">
                        <a
                          className="category"
                          onClick={() => chooseDishHandler(product._id)}
                        >
                          {sizeVolume}
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
                        <a
                          className="add_to_cart"
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          add to cart
                        </a>
                        <ul className="d-flex flex-wrap justify-content-end">
                          <li>
                            <a href="#">
                              <i className="fal fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a href="menu_details.html">
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
              <Box className="no-data">Products are not available!</Box>
            )}
          </div>
          <div className="pagination mt_50">
            <div className="row">
              <div className="col-12">
                <Pagination
                  count={
                    products.length !== 0
                      ? productSearch.page + 1
                      : productSearch.page
                  }
                  page={productSearch.page}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      color={"secondary"}
                    />
                  )}
                  onChange={paginationHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Helmet>
        <script src="/js/main2.js" defer></script>
      </Helmet>
    </div>
  );
}
