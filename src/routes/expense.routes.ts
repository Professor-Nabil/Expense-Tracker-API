import { Router } from 'express';
import * as expenseController from '../controllers/expense.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.post('/', expenseController.create);
router.get('/', expenseController.list);
router.delete('/:id', expenseController.remove);

export default router;
