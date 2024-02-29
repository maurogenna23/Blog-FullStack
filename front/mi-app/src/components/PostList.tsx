import React, { useEffect, useState } from "react";
import { useGetPosts } from "../stores/Posts/getPostsStore";
import { Link } from "react-router-dom";
import EditPostModal from "./EditPost";
import { useAuthStore } from "../stores/useAuthStore";
import { UseEditPostStore } from "../stores/Posts/editPostStore";
import imagen from '../assets/Rectangle 1312.png';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { MdComment } from 'react-icons/md'

const Posts = () => {
    const { posts, fetchPosts } = useGetPosts((state) => ({
        posts: state.posts,
        fetchPosts: state.fetchPosts,
    }));
    const [editPost, setEditPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuthStore();
    const { updatePost } = UseEditPostStore();

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handleEdit = (post: any) => {
        setEditPost(post);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveEdit = async (editedPost: any) => {
        console.log(editedPost._id);
        await updatePost(editedPost._id, editedPost.title, editedPost.body);

        fetchPosts();

        setIsModalOpen(false);
    };

    const handleDelete = async (id: any) => {
        await useGetPosts.getState().deletePost(id);
    };

    return (
        <div className="flex flex-col justify-center items-center my-8">
            <h2 className="text-2xl font-bold mb-4">Posts</h2>
            {posts.length > 0 ? (
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <div key={post._id} className="w-[560px] p-5 h-auto my-4 transition-shadow duration-300 hover:shadow-lg rounded-lg">
                            <div className="flex flex-col h-full">
                                <div className="flex justify-center items-center, h-[300px]">
                                    <img src={post.imageUrl} alt="post" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} />
                                </div>

                                <h3 className="text-4xl mt-4 font-semibold mb-2 pl-2">{post.title}</h3>
                                <p className="font-semibold text-[20px] pl-2">{post.author?.name}</p>
                                <p className="text-gray-700 mb-4 pl-2">{post.body}</p>
                                <div className="flex items-center justify-between pl-2 pr-2">
                                    <p className="text-gray-500 mt-2 flex gap-2 items-center "><span className="font-semibold flex items-center gap-2"> <MdComment /> Comentarios:</span> {post.comments?.length || 0}</p>
                                    <p className="text-gray-600 mt-2 text-sm ">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                                {user?._id === post.author._id && (
                                    <div className="flex gap-5 justify-end p-5">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="text-blue-500 hover:text-white hover:bg-blue-700 transition-all duration-300 p-2 rounded-lg w-[90px] gap-2 flex justify-center items-center"
                                        >
                                            <FiEdit2 className="text-lg" />
                                            Editar
                                        </button>
                                        <button onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-white hover:bg-red-700 transition-all duration-300 p-2 rounded-lg w-[100px] gap-2 flex justify-center items-center">
                                            <FiTrash2 className="text-lg" />
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                                <div className="flex-grow"></div>
                                <div className="p-2">
                                    <Link to={`/post/${post._id}`} className="px-6 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                        Ver más
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600">No posts available.</p>
            )}
            {editPost && (
                <EditPostModal
                    post={editPost}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveEdit}
                />
            )}
        </div>
    );
};

export default Posts;
