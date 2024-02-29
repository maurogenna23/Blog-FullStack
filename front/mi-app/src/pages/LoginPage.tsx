import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import imagen from "../assets/Rectangle 1312.png"
import user from '../assets/Vector.png'
import passwordImg from '../assets/Vector (1).png'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useAuthStore((state) => state.login);
    const [showRegisterMessage, setShowRegisterMessage] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/home');
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            setShowRegisterMessage(true);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen m-5">
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center mt-20 w-full items-center">
                <h1 className="text-8xl font-semibold">Bienvenido</h1>
                <p className="font-light">Estamos agradecidos de que hayas vuelto</p>
                <div className="flex items-center gap-4 bg-white shadow-md rounded-lg overflow-hidden pt-5">
                    <img src={user} alt="User" className="w-full h-full object-cover  ml-3" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="flex-1 py-2 px-4 outline-none "
                    />
                </div>
                <div className="flex items-center gap-4 bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={passwordImg} alt={passwordImg} className="w-full h-full object-cover ml-3" />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="flex-1 py-2 px-4 outline-none "
                    />
                </div>

                <button type="submit" className="bg-black text-white p-2 rounded-lg w-1/2 mt-10">
                    Siguiente
                </button>
                {showRegisterMessage && (
                    <p className="flex flex-col text-center">No tienes una cuenta? <Link to="/register" className="px-6 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2">Regístrate aquí</Link></p>
                )}
            </form>
            <div className="h-full flex items-center">
                <img src={imagen} alt={imagen} style={{ height: '80%', width: '100%', objectFit: 'cover', borderRadius: '20px' }} />
            </div>
        </div>
    );
};

export default Login;
