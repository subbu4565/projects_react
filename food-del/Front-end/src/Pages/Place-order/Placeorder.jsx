import react, {useContext, useEffect, useState} from 'react';
import {StoreContext} from "../../Context/StoreContext.jsx";
import'./Placeorder.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
function PlaceOrder() {

    const {totalCartItemAmount,token,food_list,cartItems,url}=useContext(StoreContext)
    const [data, setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data)=>({...data,[name]:value}))
    }
    const placeOrderHandler = async (e) => {
        e.preventDefault()
        let orderItems=[]
        console.log(cartItems)
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo=item
                itemInfo["quantity"]=cartItems[item._id]
                console.log(itemInfo)
                orderItems.push(itemInfo)
            }
        })
        let orderData={
            address:data,
            items:orderItems,
            amount:totalCartItemAmount()+2
        }
        let response=await axios.post(url+"/api/food/order", orderData,{headers:{token}})
        if(response.data.success){
            const {session_url}=response.data
            window.location.replace(session_url);
        }
        else{
            alert("Error occurred")
        }
    }
    const navigate =useNavigate()

    useEffect(()=>{
        if(!token){
            navigate('/cart')
        }
        else if(totalCartItemAmount()===0)
        {
            navigate('/cart')
        }
    })

    return(
        <form className="place-order" onSubmit={placeOrderHandler}>
            <div className="place-order-left-1">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" required={true} name={"firstName"} onChange={onChangeHandler} value={data.firstName} placeholder="First name"/>
                    <input type="text" required={true} name={"lastName"} onChange={onChangeHandler} value={data.lastName} placeholder="Last name"/>
                </div>
                <input type="email" required={true} name={"email"} onChange={onChangeHandler} value={data.email} placeholder="Email adress"/>
                <input type="text" required={true} name={"street"} onChange={onChangeHandler} value={data.street} placeholder="Street"/>

                <div className="multi-fields">
                    <input type="text" required={true} name={"city"} onChange={onChangeHandler} value={data.city} placeholder="City"/>
                    <input type="text" required={true} name={"state"} onChange={onChangeHandler} value={data.state} placeholder="State"/>
                </div>
                <div className="multi-fields">
                    <input type="text" required={true} name={"zipcode"} onChange={onChangeHandler} value={data.zipcode} placeholder="Zip code"/>
                    <input type="text" required={true} name={"country"} onChange={onChangeHandler} value={data.country} placeholder="Country"/>
                </div>
                <input type="text" required={true} name={"phone"} onChange={onChangeHandler} value={data.phone} placeholder="Phone"/>
            </div>

            <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${totalCartItemAmount()}</p>
                            </div>
                            <hr/>
                            <div className="cart-total-details">
                                <p>Delivery Fees</p>
                                <p>${totalCartItemAmount()===0?0:2}</p>
                            </div>
                            <hr/>
                            <div className="cart-total-details">
                                <p>Total</p>
                                <p>${totalCartItemAmount()===0?0:totalCartItemAmount()+2}</p>
                            </div>
                        </div>
                        <button type={"submit"}>Proceed to Payment</button>
                    </div>
            </div>


        </form>
    )
}

export default PlaceOrder