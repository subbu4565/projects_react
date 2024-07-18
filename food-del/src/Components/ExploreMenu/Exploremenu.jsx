import React from 'react';
import './Exploremenu.css'
import {menu_list} from "../../assets/assets.js";

export default function ExploreMenu({category, setCategory}) {
    return (
        <div className="explore-menu" id="exploremenu">
            <h1>Explore our menu</h1>
            <p className="explore-menu-text">Choose from a diverse menu featuring a delectable array of dishes crafted
                with finest ingredients and culinary expertise.</p>
            <div className="explore-menu-list">
                {menu_list.map((item, index) => {
                    return (
                        <div onClick={()=>setCategory(
                             prev=>prev===item.menu_name?null:item.menu_name)
                        }
                             className="explore-menu-list-item" key={index}>
                            <img className={category===item.menu_name?"active":""}
                                 src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}

            </div>
            <hr/>
        </div>
    )

}