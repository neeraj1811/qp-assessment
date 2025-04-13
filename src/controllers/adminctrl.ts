import { Request, Response } from 'express';
import GroceryItem from '../models/GroceryItems'

//Function to Add grocery-items 
export const addGroceryItem = async (req: Request, res: Response) => {
    try {
      const { itemName, price, quantity, weight, unit } = req.body;
      const image = req.file?.filename; // multer adds this to req
  
      if (!image) {
        return res.status(400).json({ error: 'Image is required' });
      }
  
      const newItem = new GroceryItem({
        itemName,
        price,
        weight,
        unit,
        quantity,
        image, // You might also save the full path or base URL + filename
      });
  
      const savedItem = await newItem.save();
      if(!savedItem) {
        return res.status(500).json({ error: 'Failed to save grocery item' });
      }
      res.status(201).json(savedItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create grocery item' });
    }
  };

// Function to get all grocery-items
export const getAvailableGroceryItems = async (req: Request, res: Response) => {
    try {
      const search = req.query.search?.toString() || '';
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;
  
      const query: any = {};
  
      if (search) {
        // MongoDB's $text operator is used to search for "milk" or any related item
        query.$text = { $search: search }; 
      }
  
      // Find items with the search query, apply pagination
      const [items, total] = await Promise.all([
        GroceryItem.find(query).skip(skip).limit(limit),
        GroceryItem.countDocuments(query),
      ]);
  
      res.status(200).json({
        items,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch grocery items' });
    }
  };

// Function to delete grocery-items
const deleteGroceryItem = async (req: Request, res: Response) => {
  try {
    const item = await GroceryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete grocery item' });
  }
};

// Function to update grocery-items
const updateGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, image } = req.body;
    const updatedItem = await GroceryItem.findByIdAndUpdate(
      req.params.id,
      { name, price, image },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
};

// Function to update grocery-items quantity 
const updateInventory = async (req: Request, res: Response) => {
  try {
    const { quantity } = req.body;
    const updatedItem = await GroceryItem.findByIdAndUpdate(
      req.params.id,
      { $set: { quantity } },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update quantity' });
  }
};

// Exporting all the functions to be used in routes
export const adminctrl = {
    addGroceryItem,
    getAvailableGroceryItems,
    deleteGroceryItem,
    updateGroceryItem,
    updateInventory,
}