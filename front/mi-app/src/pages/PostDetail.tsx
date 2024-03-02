import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentSection';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useAuthStore } from '../stores/useAuthStore';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Author {
    _id: string;
    name: string;
    imageUser: string;
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
    imageUrl: string;
    author: Author
    comments?: Comment[];
    createdAt: string;
}

const PostDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const { user } = useAuthStore();
    const [showComments, setShowComments] = useState(false);


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
            <Header />
            <div className="relative h-[600px] flex flex-col justify-center items-center overflow-hidden pt-20 pb-20">
                <img src={post.imageUrl} alt="Hero" className="absolute w-full h-full object-cover z-0" />

                <div className="absolute w-full h-full bg-black opacity-80 z-10"></div>
                <div className="relative z-20">
                    <h1 className="text-5xl mb-10 mt-20 font-semibold text-white">{post.title}</h1>
                    <div className='flex items-center space-x-2'>
                        <p className='text-white'>by {post.author?.name}</p>
                        <div className="w-[20px] border-t border-gray-300 mx-2"></div>
                        <p className="text-white text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
                        <div className="w-[20px] border-t border-gray-300 mx-2"></div>
                        <p className="text-white text-sm">1.6K views</p>
                    </div>
                </div>
            </div>
            <div className='m-10 flex justify-between'>
                <div className='w-2/3'>
                    <p className="p-10 text-[18px]">{post.body}</p>
                    <p className="p-10 text-[18px]">{post.body}</p>
                    <div className="comments-section mt-6 p-5 mb-24">
                        <button
                            className="bg-[#191919] w-full text-white font-bold py-2 px-4 rounded-sm "
                            onClick={() => setShowComments(!showComments)}
                        >
                            VER COMENTARIOS ( {post.comments?.length || 0} )
                        </button>

                        {showComments && (
                            <>
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map((comment) => (
                                        <div key={comment._id} className="bg-gray-100 rounded-md p-5 mb-2 shadow w-1/2">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="flex justify-center  h-[40px] w-[40px]">
                                                    <img src={comment.author.imageUser} alt="Autor" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover', borderRadius: '50%' }} />
                                                </div>
                                                <p className="font-semibold text-[15px]">{comment.author?.name}</p>
                                                <p className="text-[#67727E] text-sm ">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <p className='text-[#67727E]'>{comment.body}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 mt-2">No hay comentarios aún.</p>
                                )}
                                <div className='flex items-center gap-4'>
                                    {user?._id &&
                                        <div className="flex justify-center h-[40px] w-[40px]">
                                            <img src={user.imageUser} alt="post" style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover', borderRadius: '50%' }} />
                                        </div>
                                    }
                                    <CommentForm postId={post._id} />
                                </div>
                            </>
                        )}

                    </div>
                </div>
                <div className='w-[337px] flex flex-col'>
                    <h3 className='font-bold '>Follow Us</h3>
                    <div className='flex gap-4 mt-4 w-full '>
                        <FaFacebook />
                        <FaTwitter />
                        <FaLinkedin />
                        <FaInstagram />
                    </div>
                    <div className='mt-4 text-left flex flex-col'>
                        <p><span>Subscription</span>Subscribe to our newsletter and receive a selection of cool articles every weeks</p>
                        <input type="mail" placeholder='Ingresa tu email' className='mt-4 border p-4' />
                        <button className='mt-4 bg-black text-white p-5 text-lg'>
                            Subscribite
                        </button>
                        <div className='mt-4 flex items-center gap-4'>
                            <input type="checkbox" />
                            <p className='text-[#A9A9A9] text-sm'>
                                By checking this box, you confirm that you have read and are agreeing to our terms of use regarding the storage of the data submitted through this form.

                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    );
};

export default PostDetail;
