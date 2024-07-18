import "./Navbar.css"
import {assets} from "../../assets/assets.js";
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {StoreContext} from "../../Context/StoreContext.jsx";


const Navbar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");
    const {totalCartItemAmount} =useContext(StoreContext);

    return(
        <>
            <div className="navbar">
               <Link to={'/'}><img src={assets.logo} className="logo" alt="logo"/></Link>

                <ul className="navbar-menu">
                    <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
                    <a href={'#exploremenu'} onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
                    <a href={'#mobile-app'} onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
                    <a href={'#footer'} onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</a>
                </ul>

                <div className="navbar-right">
                    <img src={assets.search_icon}  alt="search-icon"/>
                    <div className="navbar-search-icon">
                        <Link to={'/cart'}><img src={assets.basket_icon} alt="basket-icon"/></Link>
                        <div className={totalCartItemAmount() === 0 ? "" : "dot"}></div>
                    </div>
                    <div className={totalCartItemAmount()===0?"":"dot"}></div>
                    </div>
                    <button onClick={()=>{setShowLogin(true)}}>sign in</button>

                </div>

        </>
    )
}
export default Navbar;