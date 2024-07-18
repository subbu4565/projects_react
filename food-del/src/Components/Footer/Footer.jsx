import react from "react";
import './Footer.css'
import { assets } from "../../assets/assets.js";
export default function Footer() {
    return(
        <div className="footer" id="footer">
         <div className="footer-content">
             <div className="footer-content-left">
                 <img src={assets.logo} className="logo" alt="logo"/>
                 <p>This a website for eating best dishes</p>
                 <div  className="footer-social-icons">
                     <img src={assets.facebook_icon} alt=""/>
                     <img src={assets.twitter_icon} alt=""/>
                     <img src={assets.linkedin_icon} alt=""/>
                 </div>
             </div>
             <div className="footer-content-center">
                    <h2>COMPANY</h2>
                 <ul>
                     <li>Home</li>
                     <li>About Us</li>
                     <li>Delivery</li>
                     <li>Contact Us</li>
                 </ul>
             </div>
             <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                 <ul>
                     <li>+14053320529</li>
                     <li>contactus@food-del.com</li>
                 </ul>
             </div>

         </div>
            <hr/>

            <div className="footer-content-copyright">
                <p>&copy; 2024 tomato.com - All rights reserved.</p>
            </div>
        </div>
    )
}
