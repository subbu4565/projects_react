import React, { createContext, useState ,useEffect} from 'react'
import {food_list} from "../assets/assets.js";

export const StoreContext=createContext(null)

const StoreContextProvider=(props) => {
    const [cartItems, setCartItems] = useState({})
    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prevState) => ({...prevState,[itemId]:1}));
        }
        else{
            setCartItems((prevState)=>
                ({...prevState, [itemId]:prevState[itemId] + 1}));
        }
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prevState)=>({...prevState,[itemId]:prevState[itemId] - 1}));
    }

    const totalCartItemAmount=()=>{
        let total = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item);
                total += itemInfo.price * cartItems[item];
            }

        }
        return total;
    }



    const contextValue={
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        totalCartItemAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider