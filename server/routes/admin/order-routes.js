const express = require("express");
const {
    getAllOrderOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus
} = require("../../controllers/admin/order-controller");

const router = express.Router();
router.get("/orders", getAllOrderOfAllUsers);
router.get("/details/:id", getOrderDetailsForAdmin);
router.put("/update/:id", updateOrderStatus)

module.exports = router;
