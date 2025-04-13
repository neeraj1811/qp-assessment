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
router.post('/v1/admin/add-items',upload.single('file'),adminctrl.addGroceryItem);
// Update grocery item details
router.put('/v1/admin/update-items/:id', upload.single('file'),adminctrl.updateGroceryItem);
// Delete a grocery item
router.delete('/v1/admin/delete-items/:id', adminctrl.deleteGroceryItem);

// Manage inventory (update stock quantity)
router.patch('/v1/admin/patch-items/:id', adminctrl.updateInventory);

// Get all available grocery items with search, pagination, and sorting
router.get('/v1/admin/get-items', adminctrl.getAvailableGroceryItems);

export default router