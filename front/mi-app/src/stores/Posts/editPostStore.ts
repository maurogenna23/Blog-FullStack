import create from 'zustand';
import { useAuthStore } from '../useAuthStore';

interface Post {
    id: string;
    title: string;
    body: string;
}

interface EditPostState {
    post: Post;
    setPost: (post: Post) => void;
    updatePost: (id: string, title: string, body: string) => Promise<void>;
}

export const UseEditPostStore = create<EditPostState>(((set) => ({
    post: { id: '', title: '', body: '' },
    setPost: (post) => set({ post }),
    updatePost: async (id, title, body) => {
        const token = useAuthStore.getState().token;
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, body }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el post');
            }

            const updatedPost: Post = await response.json();

            set({ post: updatedPost });
        } catch (error) {
            console.error('Error al actualizar el post:', error);
        }
    },
})));

