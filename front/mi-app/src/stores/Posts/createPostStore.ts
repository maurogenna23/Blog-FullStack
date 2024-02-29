import create from "zustand";
import { useAuthStore } from "../useAuthStore";

interface CreatePostStore {
    post: (title: string, body: string, image: File | null) => Promise<void>;
}

export const useCreatePostStore = create<CreatePostStore>((set) => ({
    post: async (title, body, image) => {
        const token = useAuthStore.getState().token;
        const formData = new FormData();

        formData.append("title", title);
        formData.append("body", body);
        if (image) formData.append("image", image);

        try {
            const response = await fetch('http://localhost:5000/api/posts/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,

                },
                body: formData,
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
