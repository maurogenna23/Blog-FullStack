import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';
import { AuthenticatedRequest } from '../../types';


export const addCommentToPost = async (req: AuthenticatedRequest, res: Response) => {

    if (!req.user) {
        return res.status(403).json({ message: "No se pudo autenticar al usuario." });
    }

    try {
        const { postId } = req.params;
        const { body } = req.body;
        const author = req.user.id;
        const comment = new Comment({
            body,
            author,
            post: postId
        })

        const savedComment = await comment.save();

        await Post.findByIdAndUpdate(postId, { $push: { comments: savedComment.id } });

        res.status(201).json(savedComment);
    } catch (error) {

        const message = (error as any).message || 'Ocurrió un error';
        res.status(400).json({ message });
    }
}

export const getCommentsByPostId = async (req: Request, res: Response) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId).populate('comments');
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.json(post.comments);
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error';
        res.status(400).json({ message });
    }
};