const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const orderController = require("../controllers/orderController.js");

router.route("/create").post(async (req, res) => {
  try {
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } =
      await orderController.createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

router.route("/:orderID/capture").post(async (req, res) => {
  try {
    const { jsonResponse, httpStatusCode } =
      await orderController.captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

router
  .route("/:orderID/confirm")
  .post(authMiddleware.auth, orderController.confirmOrder);

module.exports = router;
