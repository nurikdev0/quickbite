import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

export default function PaymentOrders() {
  const { orderId } = useParams<{ orderId: string }>();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { orderBuilder, authMember } = useGlobals();

  useEffect(() => {
    axios
      .get(`${serverApi}/config`)
      .then((response) => {
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error("Failed to load publishable key:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${serverApi}/create-payment/${orderId}`, { withCredentials: true })
      .then((response) => {
        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.error("Failed to load client secret:", error);
      });
  }, []);

  return (
    <>
      <section className="dashboard mt_100 xs_mt_70 mb_100 xs_mb_70">
        <div className="container">
          <div className="dashboard_area">
            <div className="row">
              <div
                className="col-xl-3 col-lg-3 wow fadeInUp"
                data-wow-duration="1s"
              >
                <div className="dashboard_menu">
                  <div className="dasboard_header">
                    <div className="dasboard_header_img">
                      <img
                        src={
                          authMember?.memberImage
                            ? `${serverApi}/${authMember.memberImage}`
                            : "/icons/default-user.svg"
                        }
                        alt="user"
                        className="img-fluid w-100"
                      />
                      <label>
                        <i className="far fa-user"></i>
                      </label>
                    </div>
                    <h2> {authMember?.memberNick}</h2>
                  </div>
                  <ul>
                    <li>
                      <NavLink
                        to="/member-page"
                        className="nav-link"
                        activeClassName={"underline"}
                      >
                        <span>
                          <i className="fas fa-bags-shopping"></i>
                        </span>
                        Parsonal Info
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/orders"
                        className="nav-link active"
                        activeClassName={"underline"}
                      >
                        <span>
                          <i className="fas fa-bags-shopping"></i>
                        </span>
                        Orders
                      </NavLink>
                    </li>
                    <li>
                      <a href="#">
                        <span>
                          <i className="far fa-heart"></i>
                        </span>
                        wishlist
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>
                          {" "}
                          <i className="fas fa-sign-out-alt"></i>
                        </span>{" "}
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className="col-xl-9 col-lg-9 wow fadeInUp"
                data-wow-duration="1s"
              >
                <div
                  style={{
                    paddingLeft: "250px",
                    paddingRight: "250px",
                  }}
                >
                  {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm />
                    </Elements>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
