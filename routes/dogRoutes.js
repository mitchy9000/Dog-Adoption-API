import express from 'express';
import { registerDog, adoptDog, removeDog } from '../controllers/dogController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, registerDog);
router.post('/:id/adopt', authMiddleware, adoptDog);
router.delete('/:id', authMiddleware, removeDog);

export default router;