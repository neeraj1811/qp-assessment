import { Router } from "express";
import groceryRoute from "./GroceryItemsRoute";
import orderRoute from "./OrderRoute";

const router = Router();
router.use(groceryRoute);
router.use(orderRoute);

export default router;