import './Login.css'
import {useContext, useState} from "react";
import {assets} from "../../assets/assets.js";
import axios from "axios";
import {toast} from "react-toastify";
import {StoreContext} from "../../Context/StoreContext.jsx";

const Login = ({setShowLogin}) => {
    const { url,setToken }=useContext(StoreContext)
    const [currentState, setCurrentState] = useState("login")
    const [data, setData] = useState({
        name:"",
        email:"",
        password:""
    });
    let newUrl=url
    const onchangeHandler = (e) => {
            const name = e.target.name;
            const value = e.target.value;
            setData((data)=>({...data,[name]:value}))

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentState === "signup"){
           newUrl+="/api/food/user/register"
        }
        else{
            newUrl+="/api/food/user/login"
        }
        console.log(data)
        const res= await axios.post(newUrl,data)

        if(res.data.success){
            toast.success(res.data.success)
            setToken(res.data.jwtToken)
            console.log(res.data.jwtToken)
            localStorage.setItem("token",res.data.jwtToken)
            setShowLogin(false)
        }
        else{
            toast.error(res.data.message)
        }
    }

    return(
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={handleSubmit} >
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className="logo" alt="logo"/>
                </div>
                <div className="login-popup-inputs">
                    {currentState === "signup" ? <input type="text" name="name" onChange={onchangeHandler} value={data.name} placeholder="your name" />:<></>}
                    <input type="email"  placeholder="Email" name="email"  onChange={onchangeHandler} value={data.email} />
                    <input type="password" placeholder="Password" name="password" onChange={onchangeHandler} value={data.password} />
                </div>
                {currentState === "signup" ? <button type={"submit"}>Sign up</button> : <button>login</button>}
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