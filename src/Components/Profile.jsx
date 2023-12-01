import React, { useEffect, useState } from 'react'
import './CSS/Profile.css';
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import Modal from './Modal'
import userPic from '../Images/userpic.jpg'
import axios from 'axios'
import { BASE_URL } from '../mydetails'
import Loader from "react-js-loader";
import edit from '../Images/editing (2).png';
import cross from '../Images/close.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Loader from "react-js-loader";
import { useNavigate } from 'react-router-dom';




const Profile = () => {
    const [loginData, setLoginData] = useState(undefined);
    const [load, setLoad] = useState(false);
    const [myPosts, setMyPosts] = useState(undefined);
    const [showEditModal, setShowEditModal] = useState(false);
    // const [but, setBut] = useState(false);

    const navigate = useNavigate();


    const [editedUserData, setEditedUserData] = useState({
        name: '',
        user_name: '',
        email: ''
    });
    const showHideClassName = showEditModal ? 'modal display-block' : 'modal display-none';


    const handleEditModal = () => {
        setEditedUserData({
            name: loginData ? loginData.name : '',
            user_name: loginData ? loginData.user_name : '',
            email: loginData ? loginData.email : ''
        });
        setShowEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveEditedDetails = async () => {
        try {
            setLoad(true)
            const userId = loginData._id;

            const response = await axios.patch(`${BASE_URL}/update/${userId}`, editedUserData);
            console.log('User details updated:', response.data);
            // console.log(response.data.user)
            toast.success('Details Updated Successfully')

            const userDataString = localStorage.getItem('userData');
            const userData = JSON.parse(userDataString);

            userData.response.user_name = response.data.user.user_name;
            userData.response.email = response.data.user.email;
            userData.response.name = response.data.user.name;
            localStorage.setItem('userData', JSON.stringify(userData));

            setLoginData({
                ...loginData,
                name: editedUserData.name,
                user_name: editedUserData.user_name,
                email: editedUserData.email
            });
            setLoad(false)
            setShowEditModal(false);


        } catch (error) {
            setLoad(false)
            toast.error('Error Updating Details')
            console.error('Error updating user details:', error);
        }

    };


    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userData'));
        let uid = data.response._id;
        getAllPosts(uid)
        setLoginData(data.response);
        // console.log(JSON.parse(localStorage.getItem('userData')))
        // console.log(data)
    }, []);

    const getAllPosts = async (uid) => {
        try {
            const response = await axios.get(`${BASE_URL}/userpost/${uid}`);
            // console.log(response.data.response);
            setMyPosts(response.data.response)
        }
        catch (e) {
            console.log(e);
            alert('Please check your Network connection')
        }
    }

    const [showModal, setShowModal] = useState({});
    const handleModal = (postId) => {
        setShowModal(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-head">
                        <img src={userPic} style={{ width: '100px', height: '100px', borderRadius: '150px', marginRight: '15px' }} alt="" />
                        <div className="profile-info">
                            <h4 style={{ color: 'white' }}>{loginData ? loginData.name : ''}</h4>
                            <h5 style={{ color: 'gray' }}>{loginData ? loginData.user_name : ''}</h5>
                            <p style={{ color: 'gray' }}>{loginData ? loginData.email : ''}</p>
                        </div>

                        <div toggle="tooltip" placement="bottom" title="Edit Profile" style={{ margin: '0px auto', outline: 'none', border: 'none', }} onClick={handleEditModal}>
                            <img src={edit} alt="" style={{ width: '30px', height: '30px', outline: 'none' }} />
                        </div>

                        {showEditModal && (
                            <div className={showHideClassName}>
                                <div className="modal-main py-5" style={{ height: '600px' }}>
                                    <div onClick={() => setShowEditModal(false)}>
                                        <img style={{ width: '25px', height: '25px', background: 'lightgray', padding: '5px', borderRadius: '5px', float: 'right' }} src={cross} alt="" />
                                    </div>
                                    <h2 style={{ color: 'white', margin: '10px' }}>Edit Profile</h2>
                                    <div className='field'>
                                        <input
                                            className='inp'
                                            placeholder='Name'
                                            type="text"
                                            id='name'
                                            name='name'
                                            value={editedUserData.name}
                                            onChange={handleInputChange}
                                            autoComplete='off'
                                            required />
                                    </div>

                                    <div className='field'>
                                        <input
                                            className='inp'
                                            placeholder='Username'
                                            type="text"
                                            id='user_name'
                                            name='user_name'
                                            value={editedUserData.user_name}
                                            onChange={handleInputChange}
                                            autoComplete='off'
                                            required />
                                    </div>

                                    <div className='field'>
                                        <input
                                            className='inp'
                                            placeholder='Email'
                                            type="email"
                                            id='email'
                                            name='email'
                                            value={editedUserData.email}
                                            onChange={handleInputChange}
                                            autoComplete='off'
                                            required />
                                    </div>

                                    <div className="text-center my-3">
                                        <button className='savebtn' onClick={saveEditedDetails} >Save</button>

                                    </div>
                                    {load ? (<div className='show-comment' style={{ marginTop: '40px', display: 'flex', background: 'transparent', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
                                        <div>
                                            <Loader type="bubble-scale" bgColor={'#ffc107'} color={'white'} size={70} />
                                            <h6 style={{ color: 'grey' }}>Updating User Details</h6>
                                        </div>
                                    </div>) : null}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="profile-mid">
                        <button className="logout butn text-decoration-none text-white" onClick={() => {localStorage.clear(); toast.success('Logout Successfully'); navigate('/'); }}>Logout</button>
                    </div>
                    <div className="profile-footer">
                        <div className='d-flex justify-content-between align-items-center'>
                            <p style={{ fontSize: 'x-large', color: 'white' }}>My Posts</p>
                            <p style={{ fontSize: 'large', color: 'white' }}>{myPosts ? myPosts.length + ' Posts' : 0 + ' Post'}</p>
                        </div>
                        <div className="myposts">
                            {myPosts ? myPosts.map((data, index) => {
                                return <div key={index}>
                                    <div className='pst' onClick={() => handleModal(data._id)}>
                                        <img className='img' src={`${BASE_URL}/show-photo/${data._id}`} alt="" />
                                    </div>

                                    <Modal
                                        date={new Date(data.date_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        show={showModal[data._id] || false}
                                        handleClose={() => handleModal(data._id)}
                                        userPic={userPic}
                                        username={data.userId.user_name}
                                        bgImg={`${BASE_URL}/show-photo/${data._id}`}
                                        postDesc={data.desc}
                                        postId={data._id}
                                        userId={loginData._id}
                                        getAllPosts={getAllPosts}
                                    />

                                </div>
                            }) : (<div className='text-center'
                                style={{ marginTop: '0px', display: 'flex', background: 'transparent', justifyContent: 'center', alignItems: 'center', zIndex: 15, width: '560px', height: '250px' }}>
                                <div>
                                    <Loader type="bubble-scale" bgColor={'#ffc107'} color={'white'} size={50} />
                                    <h6 style={{ color: 'grey' }}>Loading Posts</h6>
                                </div>
                            </div>)}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;
