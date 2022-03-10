import React from 'react'
import {IoMdNotificationsOutline} from "react-icons/io"
import profile from "../../assets/images/profile.png"
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
        <div className="navbarwrapper">
            <div className='d-flex justify-content-end'>
                <div>
                <IoMdNotificationsOutline className='navbarwrapper__notification'/>
                <div className='navbarwrapper__notification--circle'></div>
                </div>
                <div className='d-flex navbarwrapper__profile'>
                    <figure>
                        <img src={profile} alt="" />
                    </figure>
                    <span className='navbarwrapper__profile--name'>Anderson</span>
                </div>
                <div>
                    <Link to="/login">
                    <button className='navbarwrapper__logoutbtn'>Log out</button>
                    </Link>
                </div>

            </div>
        </div>
    </>
  )
}

export default NavBar