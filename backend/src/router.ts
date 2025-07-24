import express, { Request, Response } from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import productController from "./controllers/product.controller";
import orderController from "./controllers/order.controller";
import paymentController from "./controllers/payment.controller";
import makeUploader from "./libs/utils/uploader";
import bodyParser from "body-parser";

// Member
router.get("/member/restaurant", memberController.getRestaurant);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post(
  "/member/logout",
  memberController.verifyAuth,
  memberController.logout
);
router.get(
  "/member/detail",
  memberController.verifyAuth,
  memberController.getMemberDetail
);
router.post(
  "/member/update",
  memberController.verifyAuth,
  // uploaders("members").single("memberImage"),
  ...makeUploader("members").single("memberImage"),
  memberController.updateMember
);
router.get("/member/top-users", memberController.getTopUsers);

// Product
router.get("/product/all", productController.getProducts);
router.get(
  "/product/:id",
  memberController.retrieveAuth,
  productController.getProduct
);

// Order
router.post(
  "/order/create",
  memberController.verifyAuth,
  orderController.createOrder
);
router.get(
  "/order/all",
  memberController.verifyAuth,
  orderController.getMyOrders
);
router.post(
  "/order/update",
  memberController.verifyAuth,
  orderController.updateOrder
);

// Payment
router.get(
  "/create-payment/:id",
  memberController.verifyAuth,
  orderController.createPayment
);
router.post(
  "/payment",
  bodyParser.raw({ type: "application/json" }),
  paymentController.verifyAuthPayment,
  paymentController.pay
);
router.get("/config", (_: Request, res: Response): void => {
  // Serve checkout page.
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

export default router;
