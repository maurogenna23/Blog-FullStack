import express from 'express';
import multer from 'multer';
import { getAllPost, getPostId, createPost, deletePost, updatePost } from '../controllers/postControllers';
import authenticateToken from '../middleware/authtenticate';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', [authenticateToken, upload.single('image')], createPost);

router.get('/', getAllPost);
router.get('/:id', getPostId);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router;
