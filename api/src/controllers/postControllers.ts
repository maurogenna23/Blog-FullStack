import { Request, Response } from "express";
import Post from "../models/Post";
import { AuthenticatedRequest } from "../../types";

export const getAllPost = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate('author', 'name email');
        res.json(posts);
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error';
        res.status(500).json({ message });
    }
}


export const getPostId = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'name'
                }
            });
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post no encontrado' })
        }
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error';
        res.status(500).json({ message });
    }
}

export const updatePost = async (req: AuthenticatedRequest, res: Response) => {

    if (!req.user) {
        return res.status(403).json({ message: "No se pudo autenticar al usuario." });
    }

    const { id } = req.params;
    const { title, body } = req.body;
    const author = req.user.id;

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, body, author }, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ message: "No se encontró el post con el ID proporcionado." });
        }

        res.json(updatedPost);
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error';
        res.status(500).json({ message });
    }
}

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(403).json({ message: "No se pudo autenticar al usuario." });
    }

    const { title, body } = req.body;
    const author = req.user.id;

    const post = new Post({
        title,
        body,
        author
    });

    try {
        const newPost = await post.save();
        const populatedPost = await Post.findById(newPost._id).populate('author', 'name');

        res.status(201).json(populatedPost);
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error';
        res.status(500).json({ message });
    }
};


export const deletePost = async (req: AuthenticatedRequest, res: Response) => {

    if (!req.user) {
        return res.status(403).json({ message: "No se pudo autenticar al usuario." });
    }

    const { id } = req.params;
    const author = req.user.id;
    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        if (post.author.toString() !== author) {
            return res.status(403).json({ message: 'No autorizado para eliminar este post' });
        }

        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post eliminado' });
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error';
        res.status(500).json({ message });
    }
};
