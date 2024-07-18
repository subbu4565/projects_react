import './Fooddisplay.css';
import {useContext} from "react";
import {StoreContext} from "../../Context/StoreContext.jsx";
import FoodItem from "../Fooditem/FoodItem.jsx";


const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext)
    return(
        <>
            <div className="food-display" id="food-display">
                <h1>Top dishes near you</h1>
                <div className="food-display-list">
                    {food_list.map((item,index) => {
                        if(category===null || category===item.category){
                            return (
                                <FoodItem
                                    key={index}
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    description={item.description}
                                    image={item.image}/>
                            )
                        }

                    })}
                </div>
            </div>
        </>
    )

}
export default FoodDisplay;