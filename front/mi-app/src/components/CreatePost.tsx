import { useState } from "react"
import { useCreatePost } from "../stores/Posts/createPostStore";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const create = useCreatePost((state) => state.post)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Asegúrate de llamar a preventDefault para evitar la recarga de la página
        try {
            const data = await create(title, body);
            console.log('Post creado exitosamente', data);
            // Considera resetear el formulario aquí o redirigir al usuario
        } catch (error) {
            console.error('Error al crear el post:', error);
        }
    }

    return (
        <div className="flex justify-center mt-20">
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 bg-white p-8 shadow-lg rounded-lg">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Crear Nuevo Post</h2>
                    <p className="text-gray-600">Comparte tus pensamientos con el mundo.</p>
                </div>
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Contenido"
                        rows={6}
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                        Publicar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Create;
