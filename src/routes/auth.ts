import { Router } from 'express';
import { login, getMe, changePassword } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate, loginSchema, changePasswordSchema } from '../middleware/validate.js';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.get('/me', authenticate, getMe);
router.put('/change-password', authenticate, validate(changePasswordSchema), changePassword);

export default router;
