import React, { useState } from 'react'
import './CSS/Registration.css'
import Loader from "react-js-loader";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../mydetails';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const [formState, setFormState] = useState('login');
  const [data, setData] = useState({ name: "", username: "", email: "", password: "" });
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onClickHandler = (state) => {
    setFormState(state);
    setData({ name: "", username: "", email: "", password: "" });
  }
  const showPasswordHandler = (event) => {
    let checked = event?.target?.checked;
    setIsPasswordShown(checked);
  }

  // const signupSubmitHandler = (e) => {
  //   e.preventDefault()
  //   console.log(data.name)
  // }
  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      name: `${data.name}`,
      email: `${data.email}`,
      password: `${data.password}`,
      user_name: `${data.username}`
    };
    setLoad(true);
    try {
      const response = await axios.post(`${BASE_URL}/register`, payload);
      console.log(response);
      // let token = response.data.token
      // let name = response.data.user.name
      // let email = response.data.user.email
      // console.log(token)
      // console.log(name)
      // let user = { ...response.data.user };
      // Saving token to async storage

      // Saving user details to async storage
      setLoad(false);

      // alert('Account has been created successfully.');
      toast.success('Account has been created successfully.')
      onClickHandler('login')



    }
    catch (error) {
      setLoad(false);
      console.log(error);
      if (error.response) {
        if (error.response.status === 422) {
          // User already exists, handle the response
          // alert('Account already exist with this email.');
          toast.error('Account already exist with this email.')

        }
        else if (error.response.status === 500) {
          // alert('Internal Server error.');
          toast.error('Internal Server error.')
        }
        else {
          // alert('Network Error');
          toast.error('Network Error.')

        }
      }
      else {
        // alert('Something went wrong.');
        toast.error('Something went wrong.')

      }

    }
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      email: `${data.email}`,
      password: `${data.password}`
    };
    setLoad(true);
    try {
      const response = await axios.post(`${BASE_URL}/signin`, payload);
      console.log(response);
      setLoad(false);
      localStorage.setItem('userData', JSON.stringify(response.data));
      localStorage.setItem('cate', 'all');

      // alert('Login successfully.');
      toast.success('Login successfully.')

      navigate('/home');
    }
    catch (error) {
      setLoad(false);
      console.log(error);
      if (error.response) {
        if (error.response.status === 400) {
          // User already exists, handle the response
          toast.error('Invalid login Credentials.');
        }
        else if (error.response.status === 500) {
          toast.error('Network Error');
        }
        else {
          toast.error('Network Error.');
        }
      } else {
        toast.error('Something went wrong.');
      }
    }
  };

  //label effect

  // const [isFocused, setIsFocused] = useState(false);

  // const handleFocus = () => {
  //   setIsFocused(true);
  // };

  // const handleBlur = () => {
  //   setIsFocused(false);
  // };

  return (
    <>
      <div className='main'>
        <div className='empty'>
          <h1 className='name' >SkillNexus</h1>
          <h3><i>Connect Through Creativity, Share Your Skills</i></h3>
        </div>
        <div className='side'>

          {/* login */}

          {formState === "login" ? (
            <div className='box '>
              <div>
                <h2>Welcome Back</h2>
                <p>Please login to continue</p>
              </div>
              <form method='POST' className='.form ' onSubmit={(e) => { loginSubmitHandler(e) }}>
                <div className='field'>
                  <input
                    className='inp'
                    placeholder='Email'
                    type="email"
                    id='email'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    autoComplete='off'
                    required />
                </div>

                <div className='field'>
                  {/* <div className={`field floating-label-input ${isFocused ? 'focused' : ''}`}> */}
                  {/* <label htmlFor="password" className={isFocused ? 'label-up' : ''}>Password</label> */}
                  <input
                    className='inp'
                    placeholder='Password'
                    type={isPasswordShown ? "text" : "password"}
                    id='password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    autoComplete='off'
                    required />
                </div>
                <div className='showNhidepass'>
                  <input
                    className='showPass inp'
                    type="checkbox"
                    autoComplete='off'
                    checked={isPasswordShown}
                    onChange={showPasswordHandler} />
                  {isPasswordShown ? <p>Hide Password</p> : <p>Show Password</p>}
                </div>
                <button className='butn' >Login</button>
                <p>Don't have an account?  <span onClick={() => onClickHandler('signup')}> Register</span></p>
                {/* <a href="/home">Myhome</a> */}
              </form>
            </div>
          ) : (

            //Signup

            <div>
              <div>
                <h2>Welcome</h2>
                <p>Please enter your details</p>
              </div>
              <form method='POST' onSubmit={(e) => { signupSubmitHandler(e) }} className='.form '>
                <div className='field'>
                  {/* <div className={`field floating-label-input ${isFocused ? 'focused' : ''}`}> */}
                  {/* <label htmlFor="name" className={isFocused ? 'label-up' : ''} >Name</label> */}
                  <input
                    className='inp'
                    placeholder='Name'
                    type="text"
                    id='name'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    autoComplete='off'
                    required />
                </div>

                <div className='field'>
                  {/* <div className={`field floating-label-input ${isFocused ? 'focused' : ''}`}> */}
                  {/* <label htmlFor="name" className={isFocused ? 'label-up' : ''} >Name</label> */}
                  <input
                    className='inp'
                    placeholder='Username'
                    type="text"
                    id='username'
                    name='username'
                    value={data.username}
                    onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    autoComplete='off'
                    required />
                </div>


                <div className='field'>
                  {/* <div className={`field floating-label-input ${isFocused ? 'focused' : ''}`}> */}
                  {/* <label htmlFor="email" className={isFocused ? 'label-up' : ''}>Email</label> */}
                  <input
                    className='inp'
                    placeholder='Email'
                    type="email"
                    id='email'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    autoComplete='off'
                    required />
                </div>

                <div className='field'>
                  {/* <div className={`field floating-label-input ${isFocused ? 'focused' : ''}`}> */}
                  {/* <label htmlFor="password" className={isFocused ? 'label-up' : ''}>Password</label> */}
                  <input
                    className='inp'
                    placeholder='Password'
                    type={isPasswordShown ? "text" : "password"}
                    id='password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    // onFocus={handleFocus}
                    // onBlur={handleBlur}
                    autoComplete='off'
                    required />
                </div>
                <div className='showNhidepass'>
                  <input
                    className='showPass inp'
                    type="checkbox"
                    autoComplete='off'
                    checked={isPasswordShown}
                    onChange={showPasswordHandler} />
                  {isPasswordShown ? <p>Hide Password</p> : <p>Show Password</p>}
                </div>

                <button className='butn' >Register</button>
                <p>Already have an account?  <span onClick={() => onClickHandler('login')}> Login</span></p>
              </form>
            </div>
          )}
        </div>
        {load ? <div style={{ display: 'flex', background: '#000000bf', position: 'absolute', top: '0', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', zIndex: 15 }}>
          <div>
            <Loader type="bubble-scale" bgColor={'#ffc107'} color={'white'} size={100} />
          </div>
        </div> : null}
      </div>

    </>
  )
}

export default Registration;
