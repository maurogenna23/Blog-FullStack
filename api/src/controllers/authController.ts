import { Request, Response } from "express";
import User from "../models/User";
import jwt from 'jsonwebtoken'
import uploadFile from "../utils/uploadFile";

const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        let imageUser = '';

        if (req.file) {

            try {
                const fileContent = req.file.buffer;
                const fileName = `posts/${Date.now()}_${req.file.originalname}`;
                const uploadResponse = await uploadFile(fileContent, fileName);
                imageUser = uploadResponse.Location;
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Error al subir la imagen." });
            }
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const user = new User({ email, password, name, imageUser })
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', token });
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error durante el registro';
        res.status(500).json({ message });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Fallo de autenticación' });
        }

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
        });

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        const message = (error as any).message || 'Ocurrió un error durante el login';
        res.status(500).json({ message });
    }
}

export { login, register };