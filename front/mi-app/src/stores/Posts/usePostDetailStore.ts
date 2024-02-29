// stores/usePostDetailStore.js
import create from 'zustand';

const usePostDetailStore = create((set) => ({
    post: null,
    fetchPost: async (id: any) => {
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            const post = await response.json();
            set({ post });
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    },
}));

export default usePostDetailStore;
