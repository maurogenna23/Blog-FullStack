import create from "zustand"
import { useAuthStore } from "../useAuthStore";

interface createPost {
    post: (title: string, body: string) => Promise<void>;
}

export const useCreatePost = create<createPost>((set) => ({
    post: async (title, body) => {
        const token = useAuthStore.getState().token;
        try {
            const response = await fetch('http://localhost:5000/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, body }),
            });

            if (!response.ok) {
                throw new Error('Post creation failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during post creation:', error);
            throw error;
        }
    }

}));