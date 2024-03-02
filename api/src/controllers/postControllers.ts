import { Request, Response } from "express";
import Post from "../models/Post";
import { AuthenticatedRequest } from "../../types";
import uploadFile from '../utils/uploadFile';
import deleteFile from "../utils/deleteFile";

export const getAllPost = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate('author', 'name email imageUser');
        res.json(posts);
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error';
        res.status(500).json({ message });
    }
}


export const getPostId = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name imageUser')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'name imageUser',
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
    const author = req.user.id;
    const { title, content } = req.body;
    const file = req.file;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        if (post.author.toString() !== author) {
            return res.status(403).json({ message: 'No autorizado para actualizar este post' });
        }

        if (file && post.imageUrl) {
            await deleteFile(post.imageUrl);
        }

        if (file) {
            const uploadResult = await uploadFile(file.buffer, file.originalname);
            post.imageUrl = uploadResult.Key;
        }

        post.title = title || post.title;
        post.body = content || post.body;
        await post.save();

        res.json({ message: 'Post actualizado correctamente', post });
    } catch (error) {
        console.error('Error al actualizar post:', error);
        res.status(500).json({ message: 'Error al actualizar el post' });
    }
};

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(403).json({ message: "No se pudo autenticar al usuario." });
    }

    const { title, body } = req.body;
    const author = req.user.id;

    let imageUrl = '';

    if (req.file) {

        try {
            const fileContent = req.file.buffer;
            const fileName = `posts/${Date.now()}_${req.file.originalname}`;
            const uploadResponse = await uploadFile(fileContent, fileName);
            imageUrl = uploadResponse.Location;
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al subir la imagen." });
        }
    }

    const post = new Post({
        title,
        body,
        author,
        imageUrl
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el post." });
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

        if (post.imageUrl) {
            await deleteFile(post.imageUrl);
        }

        await Post.findByIdAndDelete(id);
        res.json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar post:', error);
        const message = (error as any).message || 'Ocurrió un error';
        res.status(500).json({ message });
    }
};

