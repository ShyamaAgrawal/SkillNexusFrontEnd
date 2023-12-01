import React, { useEffect, useState } from 'react'
import './CSS/CreatePost.css'
import Navbar from './Navbar'
import cross from '../Images/close.png';
// import preview from '../Images/logobg.jpg';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Loader from "react-js-loader";
import { BASE_URL } from '../mydetails';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';



const CreatePost = () => {
    const [file, setFile] = useState();
    // const [allPost, setAllPost] = useState();
    const [previewUrl, setPreviewUrl] = useState(null);
    const [desc, setDesc] = useState('');
    const [loginData, setLoginData] = useState(undefined);
    const [load, setLoad] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // const navigate = useNavigate();
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userData'));
        setLoginData(data.response);
        // console.log(JSON.parse(localStorage.getItem('userData')))
    }, []);
    const navigate = useNavigate();

    // console.log(loginData._id, desc)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleUpoad = async (e) => {
        try {
            setLoad(true);
            const formdata = new FormData()
            formdata.append('file', file)
            formdata.append('userId', loginData._id)
            formdata.append('desc', desc)
            formdata.append('category',selectedCategory)
            console.log(file)
            // console.log(formdata)
            if (file.size > 1048576) {
                alert('Image should be lesser than 1 mb.');
                return;
            }
            const res = await axios.post(`${BASE_URL}/create-post`, formdata);
            console.log(res)
            setLoad(false);
            toast.success('Post Uploaded Succesfully');
            // alert('post uploaded successfully.')
            // window.location.reload();
            // navigate('/create');


        }
        catch (e) {
            setLoad(false);
            toast.error('Error Uploading Post');
            // alert('Network Error.')
            console.log(e)
        }

    }

    return (
        <>
            <Navbar />
            <div className="create-post m-0 p-5 ">
                {/* <form className='create-form ' onSubmit={handleUpoad}> */}
                <div className="create-form">
                    <div className="d-flex justify-content-between ">
                        <h2 style={{ color: 'white' }}>Create Your Post</h2>
                        <NavLink to="/home"><img style={{ width: '25px', height: '25px', background: '#AFAFAF', padding: '5px', borderRadius: '5px' }} src={cross} alt="" /></NavLink>
                    </div>
                    <div className='select-dropdown d-flex align-items-center justify-content-between my-2'>
                        <p style={{ color: 'gray', margin: 'auto 5px' }}>Category:</p>
                        <select
                                className='form-select my-auto'
                                aria-label='Default select example'
                                style={{ background: 'none', border: 'none', color: 'white', outline: 'none' }}
                                value={selectedCategory} // Set the value to the selected category state
                                onChange={(e)=>{setSelectedCategory(e.target.value)}} // Handle category change
                            >
                                <option value='all' style={{ color: 'gray', backgroundColor: '#323232' }}>Choose Category</option>
                                <option value='Poetry' style={{ color: 'gray', backgroundColor: '#323232' }}>Poetry</option>
                                <option value='Quotes' style={{ color: 'gray', backgroundColor: '#323232' }}>Quotes</option>
                                <option value='Art' style={{ color: 'gray', backgroundColor: '#323232' }}>Art</option>
                            </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label" style={{color:'white'}}>Add File</label>
                        <input style={{backgroundColor:'black'}} className="form-control p-0" type="file" id="formFile" onChange={(e) => { handleFileChange(e) }} />
                    </div>
                    <div className="preview " style={{backgroundColor:'transparent'}}>
                        {file ? <img src={previewUrl} alt="" /> : <h4 style={{color:'#AFAFAF'}}>Image Preview</h4>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label " style={{color:'white'}}>Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" maxLength={150} rows="3" style={{ resize: 'none',backgroundColor:'transparent' ,color:'white'}} value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>
                    </div>
                    
                    <div className='text-center'>
                        <button type="submit" className="butn btn btn-primary mx-auto" onClick={handleUpoad}>Post</button>
                    </div>
                </div>
                {/* </form> */}
            </div>
            {load ? <div style={{ position: 'absolute', top: 0, display: 'flex', background: 'transparent', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
                <div style={{ marginTop: '100px' }}>
                    <Loader type="bubble-scale" bgColor={'#ffc107'} color={'white'} size={100} />
                </div>
            </div> : null}
        </>
    )
}

export default CreatePost;