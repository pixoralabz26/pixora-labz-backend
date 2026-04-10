import { Router } from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/', authenticate, authorize('admin', 'founder'), upload.single('image'), uploadImage);

export default router;
