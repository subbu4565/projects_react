import './Login.css'
import {useState} from "react";
import {assets} from "../../assets/assets.js";

const Login = ({setShowLogin}) => {
    const [currentState, setCurrentState] = useState("signup")
    return(
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className="logo" alt="logo"/>
                </div>
                <div className="login-popup-inputs">
                    {currentState === "signup" ? <input type="text" placeholder="your name"/>:<></>}
                    <input type="email" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                </div>
                {currentState === "signup" ? <button>Sign up</button> : <button>login</button>}
                <div className="log-in-condition">
                    <input type={"checkbox"}  />
                    <p>By clicking you are agreeing to the terms and conditions?</p>
                </div>
                    {currentState === "signup" ?
                        <p>Already has an account?<span onClick={()=>setCurrentState("login")} >click here</span></p>:
                        <p>create a new account?<span onClick={() => setCurrentState("signup")} >click here</span></p>}
            </form>
        </div>
    )
}
export default Login;