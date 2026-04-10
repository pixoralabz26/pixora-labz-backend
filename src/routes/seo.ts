import { Router } from 'express';
import * as ctrl from '../controllers/seoController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:page', ctrl.getByPage);
router.put('/', authenticate, authorize('admin', 'founder'), ctrl.upsert);

export default router;
