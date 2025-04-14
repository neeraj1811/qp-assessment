import { Request, Response } from 'express';
import mongoose from 'mongoose';
import GroceryItem from '../models/GroceryItems';
import Order from '../models/order';


// POST /orders - Place an order with a session
const placeOrder = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction()

  try {
    const { items } = req.body;
    const userId = req.params.userId;

    if (!userId || !Array.isArray(items) || items.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ error: 'Invalid order data' });
    }

    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const groceryItem = await GroceryItem.findById(item.itemId).session(session);

      if (!groceryItem) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: `Item not found: ${item.itemId}` });
      }

      if (groceryItem.quantity < item.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          error: `Insufficient stock for item: ${groceryItem.itemName}`
        });
      }
     
        // Update the grocery item's quantity
      groceryItem.quantity -= item.quantity;
      await groceryItem.save({ session });

      totalAmount += groceryItem.price * item.quantity;
      orderItems.push({
        itemId: groceryItem._id,
        quantity: item.quantity,
        price: groceryItem.price
      });
    }

    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      status: 'pending'
    });

    const savedOrder = await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(savedOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log('Transaction failed:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};


// GET /orders - Get all orders for a user
const getAllOrders = async (req: Request, res: Response) => {
  const userId= req.params.userId; // Assuming userId is passed as a query parameter
  try {
    const orders = await Order.find({ userId }).populate('items.itemId', 'itemName price');
    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  } 
}


export const userctrl = {
  placeOrder,
  getAllOrders,
};
