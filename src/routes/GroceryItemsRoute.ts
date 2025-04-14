import {Router} from 'express';
import { adminctrl } from '../controllers/adminctrl';
import multer from 'multer';
import fs from 'fs';

const router :any = Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      const uploadDir = 'uploads/';
      // Create directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (_req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });
  
  // File filter (optional)
  const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  };
  
  const upload = multer({ storage, fileFilter });

// Add a new grocery item
/**
 * @swagger
 * /v1/admin/add-items:
 *   post:
 *     summary: Add a new grocery item
 *     tags: [Grocery]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *                 example: Fresh Apples
 *               price:
 *                 type: number
 *                 example: 2.99
 *               weight:
 *                 type: number
 *                 example: 1
 *               unit:
 *                 type: string
 *                 example: kg
 *               quantity:
 *                 type: number
 *                 example: 50
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Grocery item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item added successfully
 *       400:
 *         description: Invalid input or file format
 */

router.post('/v1/admin/add-items',upload.single('file'),adminctrl.addGroceryItem);
// Update grocery item details

/**
 * @swagger
 * /v1/admin/update-items/{id}:
 *   put:
 *     summary: Update an existing grocery item
 *     tags: [Grocery]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the grocery item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               itemName:
 *                 type: string
 *               price:
 *                 type: number
 *               weight:
 *                 type: number
 *               unit:
 *                 type: string
 *               quantity:
 *                 type: number
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Grocery item updated successfully
 *       404:
 *         description: Item not found
 */

router.put('/v1/admin/update-items/:id', upload.single('file'),adminctrl.updateGroceryItem);
// Delete a grocery item

/**
 * @swagger
 * /v1/admin/delete-items/{id}:
 *   delete:
 *     summary: Delete a grocery item
 *     tags: [Grocery]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the grocery item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 */


router.delete('/v1/admin/delete-items/:id', adminctrl.deleteGroceryItem);


// Manage inventory (update stock quantity)

/**
 * @swagger
 * /v1/admin/get-items:
 *   get:
 *     summary: Get all available grocery items
 *     tags: [Grocery]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for item name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: price
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: A list of grocery items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GroceryItem'
 */

router.patch('/v1/admin/patch-items/:id', adminctrl.updateInventory);

// Get all available grocery items with search, pagination, and sorting
/**
 * @swagger
 * /v1/admin/get-items:
 *   get:
 *     summary: Get all available grocery items
 *     tags: [Grocery]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for item name
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: price
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: A list of grocery items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/GroceryItem'
 */

router.get('/v1/admin/get-items', adminctrl.getAvailableGroceryItems);

export default router