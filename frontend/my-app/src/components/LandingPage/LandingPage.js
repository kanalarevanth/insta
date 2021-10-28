import React from 'react';
import './LandingPage.css'
import image1 from './LandingPageImg/image1.png'
import { Link} from 'react-router-dom';
export default function LandingPage(){
    return (
        <div className="container"> 
        <div className="body">
            <div className="LandingImage"> 
                <img src={image1}  alt="loadingimage" /> 
            </div>
            <div className="text"> 
                <h1>10x Team 04</h1> 
                <div className="button">
                    <Link to={'./login'}><button className="loginbutton">Login</button></Link>
                    <Link to={'./SignUp'}><button className="signbutton">SignUp</button></Link>
                </div>
            </div> 
            </div>
        </div>
    )
}