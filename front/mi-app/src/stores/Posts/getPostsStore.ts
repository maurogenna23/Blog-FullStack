import create from "zustand";
import { useAuthStore } from "../useAuthStore";

interface Author {
    _id: string;
    name: string;
    imageUser: string;
}

interface Comment {
    _id: string;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

interface Post {
    _id: string;
    title: string;
    body: string;
    author: Author;
    comments: Comment[];
    createdAt: string;
    imageUrl?: string;
}

interface PostState {
    posts: Post[];
    fetchPosts: () => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    addCommentToPost: (postId: string, commentBody: string) => Promise<void>;
    getPostById: (id: string) => Post | undefined;
}

export const useGetPosts = create<PostState>((set, get) => ({
    posts: [],
    fetchPosts: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const posts = await response.json();
            set({ posts });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    },
    deletePost: async (id) => {
        const token = useAuthStore.getState().token;
        try {
            const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }

            const updatedPosts = get().posts.filter(post => post._id !== id);
            set({ posts: updatedPosts });

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    },
    getPostById: (id) => {
        const posts = get().posts;
        return posts.find(post => post._id === id);
    },
    addCommentToPost: async (postId, commentBody) => {
        const token = useAuthStore.getState().token;
        try {
            const response = await fetch(`http://localhost:5000/api/comments/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ body: commentBody }),
            });
            if (!response.ok) {
                throw new Error('Failed to add comment');
            }
            const newComment = await response.json();

            set((state) => {
                const updatedPosts = state.posts.map(post => {
                    if (post._id === postId) {
                        return { ...post, comments: [...post.comments, newComment] };
                    }
                    return post;
                });
                return { posts: updatedPosts };
            });
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    },
}));