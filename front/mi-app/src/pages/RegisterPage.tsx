import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthStoreRegister } from "../stores/useAuthStore"
import imagen from "../assets/Rectangle 1312.png"
import user from '../assets/Vector.png'
import passwordImg from '../assets/Vector (1).png'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const register = AuthStoreRegister((state) => state.register);
    const successMessage = AuthStoreRegister((state) => state.successMessage)
    const errorMessage = AuthStoreRegister((state) => state.errorMessage);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register(email, password, name);
    };

    return (
        <div className="flex justify-center items-center h-screen m-5">
            <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-center mt-20 w-full items-center">
                <h1 className="text-8xl font-semibold">Registro</h1>
                <p className="font-light">Forma parte de nosotros</p>
                <div className="flex items-center gap-4 bg-white shadow-md rounded-lg overflow-hidden pt-5">
                    <img src={user} alt="User" className="w-full h-full object-cover  ml-3" />
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="flex-1 py-2 px-4 outline-none "
                    />
                </div>
                <div className="flex items-center gap-4 bg-white shadow-md rounded-lg overflow-hidden">
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
                <button type="submit" className="bg-black text-white p-2 rounded-lg w-1/2 mt-10">Register</button>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage &&
                    <div className="flex flex-col text-center">
                        <p className="text-green-600 mb-2 mt-2">{successMessage}</p>
                        <Link className="px-6 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2" to="/">Iniciar sesión</Link>
                    </div>}
            </form>
            <div className="h-full flex items-center">
                <img src={imagen} alt={imagen} style={{ height: '80%', width: '100%', objectFit: 'cover', borderRadius: '20px' }} />
            </div>
        </div>
    );
};

export default Register;
