import { useState } from "react"
import { useCreatePostStore } from "../stores/Posts/createPostStore";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const create = useCreatePostStore((state) => state.post)

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            const data = await create(title, body, image);
            console.log('Post creado exitosamente', data);
        } catch (error) {
            console.error('Error al crear el post:', error);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        } else {
            setImage(null);
        }
    };

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
                <div>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100"
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
