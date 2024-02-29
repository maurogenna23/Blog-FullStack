import express from 'express';
import { addCommentToPost, getCommentsByPostId } from '../controllers/commentControllers';
import authenticateToken from '../middleware/authtenticate';

const router = express.Router();


router.post('/:postId/comments', authenticateToken, addCommentToPost);
router.get('/:postId/comments', getCommentsByPostId);

export default router;