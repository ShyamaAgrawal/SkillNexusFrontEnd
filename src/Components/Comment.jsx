import React, { useState } from 'react'
import './CSS/Comment.css'
// import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'
import { BASE_URL } from '../mydetails'
import cross from '../Images/close.png';
import Loader from "react-js-loader";
import userPic from '../Images/userpic.jpg';
import dlt from '../Images/delete.png';

const Comment = ({ handleClose, userId, postId, allComments, getComments }) => {
    const [comment, setComment] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const showHideClassName = showDeleteModal ? 'modal display-block' : 'modal display-none';

    // const [allComments, setAllComments] = useState(undefined);

    const uploadComment = async () => {
        const payload = {
            comment: `${comment}`,
            postId: `${postId}`,
            userId: `${userId}`
        };
        if (payload.comment === '') {
            toast.warning('Cannot add empty comment')
            return
        }

        // console.log(payload)
        try {
            const response = await axios.post(`${BASE_URL}/write-comment`, payload);
            // console.log(response);
            toast.success('Comment added.')
            setComment('');
            getComments();

        }
        catch (e) {
            console.log(e)
            toast.error('Network Error.')
        }
    }
    const handleDelete = async (cmtId) => {
        try {
            const res = await axios.delete(`${BASE_URL}/delete-comment/${cmtId}`);
            getComments();
            setShowDeleteModal(false);
            toast.success('Comment Deleted Successfully')
            // console.log(res)
        }
        catch (e) {
            console.log(e);
            toast.error('Unable to delete comment')
        }
    }

    return (
        <>
            <div className="comments-area">
                <div className="d-flex justify-content-between">
                    <h3 style={{ color: '#AFAFAF' }}>Add Your Comment</h3>
                    <div onClick={handleClose}>
                        <img style={{ width: '25px', height: '25px', background: '#AFAFAF', padding: '5px', borderRadius: '5px' }}
                            src={cross} alt="" />
                    </div>
                </div>
                <div className="addComment m-2">
                    <img className='dp' src={userPic} alt="" />
                    <div className="form-floating w-100 mx-3 d-flex flex-column">
                        <textarea className="form-control"
                            placeholder="Leave a comment here"
                            rows="3"
                            id="floatingTextarea"
                            style={{ resize: 'none', backgroundColor: '#262626', color: 'white' }}
                            value={comment}
                            onChange={(e) => { setComment(e.target.value) }}
                            required>
                        </textarea>

                        {/* <label for="floatingTextarea">Comments</label> */}
                        <button className="addCmt butn text-decoration-none text-center " style={{ fontSize: 'large', width: '150px' }} onClick={uploadComment}>Add Now</button>
                    </div>
                </div>

                <div className="comments">
                    <h6 style={{ color: 'white' }}>All Comments</h6>
                    {allComments ? (<div className="show-comment">
                        {allComments.length !== 0 ? allComments.map((cmt, idx) => {
                            return <div className="cmt" key={idx}>
                                <img src={userPic} style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '10px' }} alt="" />
                                <div className="cmt-info w-100 mx-3">
                                    <div className="line d-flex justify-content-between">
                                        <p style={{ color: 'gray' }}>{cmt.userId.user_name}</p>
                                        <p style={{ color: 'gray' }}>{new Date(cmt.date_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p style={{ color: 'white' }}>{cmt.comment}</p>
                                        {cmt.userId._id === userId ? <div>
                                            <div onClick={() => setShowDeleteModal(true)} className="dlt" style={{ width: '30px', height: '30px', border: '1px solid white', borderRadius: '5px', padding: '1px', textAlign: 'center' }}>
                                                <img src={dlt} alt="" style={{ width: '20px', height: '20px', }} />
                                            </div>
                                            {showDeleteModal && (
                                                <div className={showHideClassName} style={{ height: '550px', marginTop: '15px' }}>
                                                    <div className="modal-main py-5" style={{ height: '200px', width: '400px' }}>
                                                        <div onClick={() => setShowDeleteModal(false)}>
                                                            <img style={{ width: '25px', height: '25px', background: 'lightgray', padding: '5px', borderRadius: '5px', float: 'right' }} src={cross} alt="" />
                                                        </div>
                                                        <h6 style={{ color: 'white', margin: '10px' }}>Are you sure you want to delete your comment  ?</h6>

                                                        <div className="text-center my-3" onClick={() => { handleDelete(cmt._id) }}>
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
                            </div>
                        }) : <p className='mt-4' style={{ color: 'gray', textAlign: 'center' }}>No Comments</p>}
                    </div>) :
                        (<div className='show-comment' style={{ marginTop: '100px', display: 'flex', background: 'transparent', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
                            <div>
                                <Loader type="bubble-scale" bgColor={'#ffc107'} color={'white'} size={50} />
                                <h6 style={{ color: 'grey' }}>Loading Comments</h6>
                            </div>
                        </div>)}

                </div>
            </div>
        </>
    )
}

export default Comment;

































// import React from 'react'
// import dp from '../Images/logobg.jpg'
// import './CSS/Comment.css'
// import { NavLink } from 'react-router-dom'
// import cross from '../Images/close.png';


// const Comment = ({handleClose}) => {
//     const comments = [
//         {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         },
//         {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         },
//         {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         }, {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         },
//         {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         }, {
//             userpic: '../Images/bg.jpg',
//             username: "_shyama ",
//             comment: "Kuch bhi hfdjgakjedshsnmsf",
//             date: "Nov 20, 2023"
//         },
//     ]
//     return (
//         <>
//             <div className="comments-area">
//                 <div className="d-flex justify-content-between">
//                     <h3 style={{ color: 'darkgreen' }}>Add Your Comment</h3>
//                     <div onClick={handleClose}>
//                         <img style={{ width: '25px', height: '25px', background: 'lightgray', padding: '5px', borderRadius: '5px' }} src={cross} alt="" />
//                     </div>
//                 </div>
//                 <div className="addComment m-2">
//                     <img className='dp' src={dp} alt="" />
//                     <div className="form-floating w-100 mx-3 d-flex flex-column">
//                         <textarea className="form-control" placeholder="Leave a comment here" rows="3" id="floatingTextarea"
//                             style={{ resize: 'none' }}></textarea>
//                         {/* <label for="floatingTextarea">Comments</label> */}
//                         <NavLink className="addCmt butn text-decoration-none text-center " style={{ fontSize: 'large', width: '150px' }} to="/">Add Now</NavLink>
//                     </div>
//                 </div>
//                 <div className="comments">
//                     <h6>All Comments</h6>
//                     <div className="show-comment">
//                         {comments.map((cmt,idx) => {
//                             return <div className="cmt" key={idx}>
//                                 <img src={cmt.userpic} style={{ width: '40px', height: '40px', borderRadius: '50%', margin: '10px' }} alt="" />
//                                 <div className="cmt-info w-100 mx-3">
//                                     <div className="line d-flex justify-content-between">
//                                         <p style={{ color: 'gray' }}>{cmt.username}</p>
//                                         <p>{cmt.date}</p>
//                                     </div>
//                                     <p>{cmt.comment}</p>
//                                 </div>
//                             </div>
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Comment;
