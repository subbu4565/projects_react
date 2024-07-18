import React, { createContext, useState ,useEffect} from 'react'
import {food_list} from "../assets/assets.js";

export const StoreContext=createContext(null)

const StoreContextProvider=({ children }) => {
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
    useEffect(() => {
        console.log(cartItems)
    }, [cartItems]);

    const contextValue={
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider