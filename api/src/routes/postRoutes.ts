import express from 'express';
import { getAllPost, getPostId, createPost, deletePost, updatePost } from '../controllers/postControllers';
import authenticateToken from '../middleware/authtenticate';

const router = express.Router();


router.get('/', getAllPost);

router.get('/:id', getPostId);

router.post('/', authenticateToken, createPost);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router;