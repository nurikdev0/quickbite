import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { NavLink, useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import "../../../css/userPage.css";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

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
                      className="nav-link active"
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
                      className="nav-link"
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
              <Settings />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
