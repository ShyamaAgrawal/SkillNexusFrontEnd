import React, { useState } from 'react'
import './CSS/Card.css'
// import img from '../Images/logobg.jpg';
import heart from '../Images/heart.png';
import comment from '../Images/comment.png'
import redHeart from '../Images/heart (1).png';
import Comment from './Comment';
import { BASE_URL } from '../mydetails';
import axios from 'axios';
import dlt from '../Images/delete.png'
import cross from '../Images/close.png';
import { toast } from 'react-toastify'


const Card = ({ userPic, username, bgImg, postDesc, likes, date, userId, postId, fromProfile, handleClose, getAllPosts }) => {
    const [isliked, setIsLiked] = useState(false);
    const [isDisplayed, setIsDisplayed] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [allComments, setAllComments] = useState(undefined);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const showHideClassName = showDeleteModal ? 'modal display-block' : 'modal display-none';

    const getComments = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/allcomments/${postId}`);
            console.log(response.data.response);
            setAllComments(response.data.response)
            // toast.success('Comments fetched.')
        }
        catch (e) {
            console.log(e)
            // toast.error('Network Error.')
        }
    }

    const handleDelete = async (postId) => {
        try {
            const res = await axios.delete(`${BASE_URL}/delete-post/${postId}`);
            setShowDeleteModal(false);
            toast.success('Post Deleted Successfully')
            console.log(res)
            handleClose();
            getAllPosts(userId);
        }
        catch (e) {
            setShowDeleteModal(false);
            console.log(e);
            toast.error('Unable to delete post')
        }
    }
    


    return (
        <>
            <div className={`cards ${fromProfile ? 'from-profile' : ''}`}>
                <div className={`card ${clicked ? 'clicked-style' : ''}`} onClick={() => setClicked(!clicked)}>
                    <div className="card-head">
                        <div className='user-head'>
                            <div className='user-pic'>
                                <img src={userPic} alt="Error" />
                            </div>
                            <div className="user-info">
                                <h5 style={{ color: 'white' }}>{username}</h5>
                                <p style={{ color: 'gray' }}>{date}</p>
                            </div>
                        </div>
                        <div className="icon">
                            {fromProfile ? <div>
                                {/* {console.log(postId)} */}
                                <div onClick={() => setShowDeleteModal(true)} className="dlt" style={{ width: '50px', height: '50px', border: '1px solid white', borderRadius: '5px', padding: '6px', textAlign: 'center' }}>
                                    <img src={dlt} alt="" style={{ width: '35px', height: '35px', }} />
                                </div>
                                {showDeleteModal && (
                                    <div className={showHideClassName} style={{ height: '550px', marginTop: '15px' }}>
                                        <div className="modal-main py-5" style={{ height: '200px', width: '400px' }}>
                                            <div onClick={() => setShowDeleteModal(false)}>
                                                <img style={{ width: '25px', height: '25px', background: 'lightgray', padding: '5px', borderRadius: '5px', float: 'right' }} src={cross} alt="" />
                                            </div>
                                            <h6 style={{ color: 'white', margin: '10px' }}>Are you sure you want to delete your post  ?</h6>

                                            <div className="text-center my-3" onClick={() => { handleDelete(postId) }}>
                                                <button className='savebtn' >Yes</button>

                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                                :
                                null}
                        </div>
                    </div>
                    <div className='card-img'>
                        <img src={bgImg} alt="Error" />

                    </div>
                    <div className="card-desc">
                        {postDesc}
                    </div>
                    <div className='cardFooter'>
                        <div className="heart" >
                            <div>
                                {isliked ? <div onClick={() => setIsLiked(false)}>
                                    <img src={redHeart} alt="Error" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                                </div> :
                                    <div onClick={() => setIsLiked(true)}>
                                        <img src={heart} alt="Error" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                                    </div>}
                            </div>
                            <p>{likes}</p>
                        </div>
                        <div className='side-cmts' onClick={() => { setIsDisplayed(false); setIsDisplayed(!isDisplayed); getComments() }}>
                            <img src={comment} alt="Error" style={{ width: '30px', height: '30px' }} />
                        </div>
                    </div>
                </div>
                <div className={`comment-component ${isDisplayed ? 'comment-show' : ''}`}>
                    {
                        isDisplayed && <Comment
                            getComments={getComments}
                            handleClose={() => {
                                setIsDisplayed(!isDisplayed);
                                setClicked(!clicked)
                            }}
                            postId={postId}
                            userId={userId}
                            allComments={allComments} />
                    }
                </div>
            </div>
        </>
    )
}

export default Card;
