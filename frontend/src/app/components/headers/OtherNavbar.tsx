import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import { Helmet } from "react-helmet-async";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <div className={"other-navbar"}>
      {/* TOPBAR START */}
      <section className="topbar">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-sm-6 col-md-8">
              <ul className="topbar_info d-flex flex-wrap d-none d-sm-flex">
                <li>
                  <a href="#">
                    <i className="fas fa-envelope"></i> quickbite@quickbite.com
                  </a>
                </li>
                <li className="d-none d-md-block">
                  <a href="#">
                    <i className="fas fa-phone-alt"></i>
                    +010888888888888
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xl-6 col-sm-6 col-md-4">
              <ul className="topbar_icon d-flex flex-wrap">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>{" "}
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>{" "}
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* TOPBAR END */}

      {/* MENU START */}

      <nav className="navbar navbar-expand-lg main_menu">
        <div className="container">
          <NavLink to="/" className="navbar-brand">
            <img src="/images/logo2.png" alt="RegFood" className="img-fluid" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="far fa-bars menu_icon_bar"></i>
            <i className="far fa-times close_icon_close"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav m-auto">
              <li className="nav-item ">
                <NavLink
                  to="/"
                  className="nav-link"
                  activeClassName={"underline"}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className="nav-link"
                  activeClassName={"underline"}
                >
                  Menu
                </NavLink>
              </li>
              {authMember ? (
                <li className="nav-item">
                  <NavLink
                    to="/orders"
                    className="nav-link"
                    activeClassName={"underline"}
                  >
                    Orders
                  </NavLink>
                </li>
              ) : null}
              {authMember ? (
                <li className="nav-item">
                  <NavLink
                    to="/member-page"
                    className="nav-link"
                    activeClassName={"underline"}
                  >
                    My Page
                  </NavLink>
                </li>
              ) : null}
              <li className="nav-item">
                <NavLink
                  to="/help"
                  className="nav-link"
                  activeClassName={"underline"}
                >
                  Help
                </NavLink>
              </li>
            </ul>
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                  style={{
                    backgroundColor: "#ff7c08",
                    color: "#fff",
                    marginLeft: "15px",
                  }}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
              />
            )}

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </nav>

      {/* MENU END */}

      {/* BREADCRUMB START */}

      <section
        className="page_breadcrumb"
        style={{ backgroundImage: "url(/images/counter_bg.jpg)" }}
      >
        <div className="breadcrumb_overlay">
          <div className="container">
            {/* <div className="breadcrumb_text">
              <h1>Popular Foods menu</h1>
              <ul>
                <li>
                  <a href="index.html">home</a>
                </li>
                <li>
                  <a href="#">menu</a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </section>

      {/* BREADCRUMB END */}
    </div>
  );
}
