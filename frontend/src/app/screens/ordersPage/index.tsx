import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { NavLink, useHistory } from "react-router-dom";
import "../../../css/order.css";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS **/

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");
  return (
    <section className="dashboard mt_100 xs_mt_70 mb_100 xs_mb_70">
      <div className="container">
        <div className="dashboard_area">
          <div className="row">
            <div
              className="col-xl-3 col-lg-4 wow fadeInUp"
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
              className="col-xl-9 col-lg-8 wow fadeInUp"
              data-wow-duration="1s"
            >
              <div className={"order-page"}>
                <Container className="order-container">
                  <Stack className={"order-left"}>
                    <TabContext value={value}>
                      <Box className={"order-nav-frame"}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            className={"table_list"}
                          >
                            <Tab label="PAUSED ORDERS" value={"1"} />
                            <Tab label="PROCESS ORDERS" value={"2"} />
                            <Tab label="FINISHED ORDERS" value={"3"} />
                          </Tabs>
                        </Box>
                      </Box>
                      <Stack className={"order-main-content"}>
                        <PausedOrders setValue={setValue} />
                        <ProcessOrders setValue={setValue} />
                        <FinishedOrders />
                      </Stack>
                    </TabContext>
                  </Stack>
                </Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
