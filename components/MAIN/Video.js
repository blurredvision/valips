import {
    DotsHorizontalIcon,
    HeartIcon
} from '@heroicons/react/outline'

import {
    HeartIcon as HeartIconFilled
} from '@heroicons/react/solid'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import Moment from 'react-moment';


function Video({id, username, userImg, img, caption}) {
    const {data: session} = useSession();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(
        () => 
        onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), (snapshot) => setComments(snapshot.docs)), [db, id]
    );

    useEffect(
        () => onSnapshot(collection(db, 'posts', id, 'likes'), (snapshop) => 
        setLikes(snapshop.docs)
    ),
    [db, id]
    );

    useEffect(
        () => 
        setHasLiked(likes.findIndex((like) => like.id == session?.user?.uid) !== -1), [likes]
    )

    const likePost = async () =>{
        if(hasLiked){
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
        } else{
            await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
                username: session.user.username
            })
        }
    }

    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'),{
            comment: commentToSend,
            username: session.user.username,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        })
    }

    
    return (
        <div className='bg-white my-7 border rounded-sm'>
            {/* Header */}
        <div className='flex items-center p-5'>
            <img src={userImg} className="rounded-full h-12 w-12 object-contain border p-1 mr-3" alt="" />
            <p className='flex-1 font-bold'>{username}</p>
            <DotsHorizontalIcon className='h-5' />
        </div>
            {/* Video */}
        <video controls src={img} className='object-cover w-full' alt=''/>
            {/* Buttons */}
            {session && (
            <div className='flex justify-between px-4 pt-4'>
                <div className='flex space-x-4'>
                    {hasLiked ? (
                        <HeartIconFilled onClick={likePost} className='btn text-red-500'/>
                    ) : (
                        <HeartIcon onClick={likePost} className='btn'/>
                    )}
                </div>
            </div>
            )}
            {/* caption */}
            <p className='p-5 truncate'>
                {likes.length > 0 && (
                    <p className='font-bold mb-1'>{likes.length} likes</p>
                )}
                <span className='font-bold mr-1'>{username} </span>
                {caption}
            </p>
            {/* comments */}
            {comments.length > 0 && (
                <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
                    {comments.map(comment => ( 
                        <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                            <img className='h-7 rounded-full' src={comment.data().userImage} alt="" />
                            <p className='text-sm flex-1'><span className='font-bold'>{comment.data().username} </span>{comment.data().comment}</p>

                            <Moment fromNow className='pr-5 text-xs'>
                                {comment.data().timestamp?.toDate()}
                            </Moment>
                        </div>
                    ))}
                </div>
            )}
            {/* input box */}
            {session && (
            <form className='flex items-center p-4'>
                    <input 
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className="border-none flex-1 focus:ring-0 outline-none bg-gray-50" 
                        placeholder='Add a comment...'
                        type="text" />
                    <button 
                        type="submit" 
                        disabled={!comment} 
                        onClick={sendComment}  
                        className='font-semibold text-blue-400'
                    >
                        Post
                    </button>
            </form>
            )}
        </div>
    )
}

export default Video
