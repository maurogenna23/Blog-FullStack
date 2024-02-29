import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentSection';

interface Author {
    _id: string;
    name: string;
}

interface Comment {
    _id: string;
    body: string;
    author: Author;
    createdAt: string;
    updatedAt: string;
}

interface Post {
    _id: string;
    title: string;
    body: string;
    author?: Author
    comments?: Comment[];
}

const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            const response = await fetch(`http://localhost:5000/api/posts/${id}`);
            const data = await response.json();
            setPost(data);
        };

        fetchPostDetails();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (

        <div className="post-detail">
            <h2 className="text-xl font-bold mb-4">{post.title}</h2>
            <p> {post.author?.name} </p>
            <p className="mb-4">{post.body}</p>
            <div className="comments-section mt-6">
                <CommentForm postId={post._id} />
                <h3 className="text-lg font-semibold mb-2">Comentarios</h3>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                        <div key={comment._id} className="bg-gray-100 rounded-md p-4 mb-2 shadow">
                            {comment.body}
                            <p className="text-sm text-gray-500">Por: {comment.author.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No hay comentarios aún.</p>
                )}
            </div>
        </div>

    );
};

export default PostDetail;
