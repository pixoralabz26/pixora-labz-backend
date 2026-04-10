import { Router } from 'express';
import * as ctrl from '../controllers/settingsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', ctrl.get);
router.put('/', authenticate, authorize('admin', 'founder'), ctrl.update);

export default router;
