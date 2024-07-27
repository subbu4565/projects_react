import react, {useContext} from 'react';
import {StoreContext} from "../../Context/StoreContext.jsx";
import'./Placeorder.css'
function PlaceOrder() {

    const {totalCartItemAmount}=useContext(StoreContext)
    return(
        <form className="place-order">
            <div className="place-order-left-1">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder="First name"/>
                    <input type="text" placeholder="Last name"/>
                </div>
                <input type="email" placeholder="Email adress"/>
                <input type="text" placeholder="Street"/>

                <div className="multi-fields">
                    <input type="text" placeholder="City"/>
                    <input type="text" placeholder="State"/>
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder="Zip code"/>
                    <input type="text" placeholder="Country"/>
                </div>
                <input type="text" placeholder="Phone"/>
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
                                <p>${totalCartItemAmount()===0?0:totalCartItemAmount+2}</p>
                            </div>
                        </div>
                        <button>Proceed to Payment</button>
                    </div>
            </div>


        </form>
    )
}

export default PlaceOrder