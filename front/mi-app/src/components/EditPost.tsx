// EditPostModal.tsx
import React, { useState } from 'react';

interface Post {
    id: string;
    title: string;
    body: string;
}

interface EditPostModalProps {
    post: Post;
    isOpen: boolean;
    onClose: () => void;
    onSave: (post: Post) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({ post, isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    const handleSave = () => {
        onSave({ ...post, title, body });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded">
                <h2>Edit Post</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Body"
                />
                <div className='flex gap-10'>
                    <button className='bg-green-300' onClick={handleSave}>Save</button>
                    <button className='bg-red-300' onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default EditPostModal;
