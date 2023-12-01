import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import './CSS/Navbar.css'
import plus from '../Images/plus.png';
import home from '../Images/home.png'
import homeActive from '../Images/homeActive.png'


const Navbar = () => {
    const [loginData, setLoginData] = useState(undefined);
    const [selectedCategory, setSelectedCategory] = useState('all');
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('userData'));
        setLoginData(data.response);
        let category = localStorage.getItem('cate');
        setSelectedCategory(category)
        // console.log(JSON.parse(localStorage.getItem('userData')))

    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Update selected category when it changes
        console.log(e.target.value)
        localStorage.setItem('cate', e.target.value);
        // getAllPosts();
    };

    const location = useLocation();
    let nav = document.querySelector(".navbar");
    window.onscroll = () => {
        if (document.documentElement.scrollTop > 50)
            nav.classList.add("navbar-scrolled");
        else
            nav.classList.remove("navbar-scrolled");
    }
    return (
        <>
            <nav className="navi navbar navbar-expand-lg navbar-light ">
                <h1 className='title'>SkillNexus</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {location.pathname === '/home' ? <li className='nav-item select-dropdown d-flex align-items-center' >
                            <p style={{ color: 'gray', margin: 'auto 5px' }}>Category:</p>
                            <select
                                className='form-select my-auto'
                                aria-label='Default select example'
                                style={{ background: 'none', border: 'none', color: 'white', outline: 'none' }}
                                value={selectedCategory} // Set the value to the selected category state
                                onChange={handleCategoryChange} // Handle category change
                            >
                                <option value='all' style={{ color: 'gray', backgroundColor: '#323232' }}>Choose Category</option>
                                <option value='Poetry' style={{ color: 'gray', backgroundColor: '#323232' }}>Poetry</option>
                                <option value='Quotes' style={{ color: 'gray', backgroundColor: '#323232' }}>Quotes</option>
                                <option value='Art' style={{ color: 'gray', backgroundColor: '#323232' }}>Art</option>
                            </select>
                        </li> : null}
                        <li className="nav-item active home">
                            <NavLink className="nav-link my-2" to="/home">
                                {location.pathname === '/home' ? <img src={homeActive} style={{ width: '30px', height: '30px' }} alt="" /> :
                                    <img src={home} style={{ width: '30px', height: '30px' }} alt="" />}
                                <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className=" nav-link" to="/create">
                                <div className='create p-0'>
                                    <div className='plus-icon'>
                                        <img src={plus} alt="" />
                                    </div>
                                    <p style={{ fontSize: 'large', margin: 'auto', color: location.pathname === '/create' ? '#ffc107' : 'white' }}>create</p>
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                <div className="profile p-0">
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <p className='name-icon my-auto'>{loginData ? loginData.name.charAt(0) : ''}</p>
                                    </div>
                                    <p className='my-0' style={{ color: '#AFAFAF' }}>{loginData ? loginData.name.split(' ')[0] : ''}</p>
                                </div>
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-link my-2" to="#">Logout</NavLink>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
