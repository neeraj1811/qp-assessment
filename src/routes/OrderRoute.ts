import { Router } from "express";
import { userctrl } from "../controllers/userctrl";

const router:any= Router()
// User Routes
// Place an order with a session
/**
 * @swagger
 * /v1/orders/{userId}:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user placing the order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                       example: "661b3d79992aa7d728f00e00"
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 4.99
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request (invalid data or out-of-stock)
 *       500:
 *         description: Internal server error
 */

router.post('/v1/orders/:userId', userctrl.placeOrder);

// Get all orders for a user
/**
 * @swagger
 * /v1/orders/{userId}:
 *   get:
 *     summary: Get all orders placed by a specific user
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         itemId:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                         price:
 *                           type: number
 *                   totalAmount:
 *                     type: number
 *                   status:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *     404:
 *       description: User not found or has no orders
 */

router.get('/v1/orders/:userId', userctrl.getAllOrders);

export default router


