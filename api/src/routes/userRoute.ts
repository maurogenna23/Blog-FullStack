import express from 'express';
import { getUserInfo } from '../controllers/userController';
import authenticateToken from '../middleware/authtenticate';

const router = express.Router();

router.get('/me', authenticateToken, getUserInfo);

export default router;
