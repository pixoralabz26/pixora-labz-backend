import { Router } from 'express';
import * as ctrl from '../controllers/serviceController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

// Admin
router.get('/admin/all', authenticate, authorize('admin', 'founder'), ctrl.adminGetAll);
router.post('/', authenticate, authorize('admin', 'founder'), ctrl.create);
router.put('/:id', authenticate, authorize('admin', 'founder'), ctrl.update);
router.delete('/:id', authenticate, authorize('admin', 'founder'), ctrl.remove);

export default router;
