import { Router } from 'express';
import * as ctrl from '../controllers/contactController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate, contactSchema } from '../middleware/validate.js';

const router = Router();

// Public
router.post('/', validate(contactSchema), ctrl.send);

// Admin
router.get('/', authenticate, authorize('admin', 'founder'), ctrl.getAll);
router.put('/:id/read', authenticate, authorize('admin', 'founder'), ctrl.markRead);
router.delete('/:id', authenticate, authorize('admin', 'founder'), ctrl.remove);

export default router;
