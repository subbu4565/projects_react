import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.jsx";
import './Cart.css'



export default function Cart() {
    const { food_list, cartItems, removeFromCart,totalCartItemAmount,url } = useContext(StoreContext)
    const navigate = useNavigate()
    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title" id={"title"}>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className=" cart-items-title cart-items-data" >
                                    <img src={url+"/uploads/"+item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className={"cross"}>x</p>
                                </div>
                                <hr />
                            </div>

                        )

                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${totalCartItemAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fees</p>
                            <p>${totalCartItemAmount()===0?0:2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>${totalCartItemAmount()===0?0:totalCartItemAmount()+2}</p>
                        </div>
                    </div>
                    <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
                </div>
                <div className="cart-promo">
                <p>Enter promo code</p>
                    <div className="cart-promo-input">
                        <input type={"text"} placeholder={"Enter your code"} />
                        <button>Apply</button>
                    </div>
                </div>
            
            </div>
        </div>
    )

}