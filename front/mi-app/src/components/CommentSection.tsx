import React, { useState } from 'react';
import { useGetPosts } from '../stores/Posts/getPostsStore';

interface CommentFormProps {
    postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
    const [comment, setComment] = useState('');
    const { addCommentToPost } = useGetPosts();

    const handleSubmit = async (e: any) => {
        if (!comment.trim()) return;

        await addCommentToPost(postId, comment);
        setComment('');
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
                Post Comment
            </button>
        </form>
    );
};

export default CommentForm;
