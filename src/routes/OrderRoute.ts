import { Router } from "express";
import { userctrl } from "../controllers/userctrl";

const router:any= Router()
// User Routes
// Place an order with a session
router.post('/v1/orders/:userId', userctrl.placeOrder);

// Get all orders for a user
router.get('/v1/orders/:userId', userctrl.getAllOrders);

export default router


