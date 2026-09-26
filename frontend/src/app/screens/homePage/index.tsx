import React, { useEffect, useState } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
import Reservation from "./Reservation";

// Defined in public/js/main.js (loaded from index.html)
declare global {
  interface Window {
    initHomePage?: () => void;
    destroyHomePage?: () => void;
  }
}

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(
    useDispatch()
  );
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  useEffect(() => {
    const product = new ProductService();
    const member = new MemberService();

    Promise.all([
      product
        .getProducts({
          page: 1,
          limit: 8,
          order: "productViews",
          productCollection: ProductCollection.DISH,
        })
        .then((data) => setPopularDishes(data))
        .catch((err) => console.log(err)),
      product
        .getProducts({
          page: 1,
          limit: 4,
          order: "createdAt",
          // productCollection: ProductCollection.DISH,
        })
        .then((data) => setNewDishes(data))
        .catch((err) => console.log(err)),
      member
        .getTopUsers()
        .then((data) => setTopUsers(data))
        .catch((err) => console.log(err)),
    ]).then(() => setDataLoaded(true));
  }, []);

  // jQuery sliders/isotope move React-owned DOM nodes. Initialising them before
  // the data renders makes React crash (white screen), so wait for the data.
  useEffect(() => {
    if (!dataLoaded) return;

    const init = () => window.initHomePage?.();
    if (window.initHomePage) init();
    else document.addEventListener("DOMContentLoaded", init, { once: true });

    return () => {
      document.removeEventListener("DOMContentLoaded", init);
      window.destroyHomePage?.();
    };
  }, [dataLoaded]);

  return (
    <div className={"homepage"}>
      <NewDishes />
      <Reservation />
      <PopularDishes />
      <ActiveUsers />
      <Statistics />
      <Advertisement />
      <Events />
    </div>
  );
}
