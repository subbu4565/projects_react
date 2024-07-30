import React, { createContext, useState ,useEffect} from 'react'
import axios from 'axios'

export const StoreContext=createContext(null)

const StoreContextProvider=(props) => {
    const url="http://localhost:3000"
    const [token,setToken]=useState(null);
    const [cartItems, setCartItems] = useState({})
    const [food_list, setFoodList] = useState([])
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

    const fetchFoodItems=async ()=>{
        try{
            const res=await axios.get(`${url}/api/food/list`);
            if(res.data.success){
                setFoodList(res.data.data);
            }
            else{
                console.error(res.data);
            }
        }
        catch(err){
            console.error(err);
        }
    }
    useEffect(() => {

        const loadData = async () => {
            await fetchFoodItems();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
            }
        }
        loadData()
    }, []);

    const contextValue={
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
        totalCartItemAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider