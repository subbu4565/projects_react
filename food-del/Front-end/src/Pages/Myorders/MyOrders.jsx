import './MyOrders.css';
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext.jsx";
import axios from "axios";
import { assets } from "../../assets/assets.js";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/food/order/orders`, {}, { headers: { token } });
            if (response.data.success) {
                setOrders(response.data.data);
                console.log(response.data.data);
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {orders.map((order, index) => (
                    // FIX: Adding return statement
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="Profile Icon"/>
                        <p>
                            {order.items.map((item, idx) => {

                                if (idx === order.items.length - 1) {
                                    return item.name + " x" + item.quantity
                                }
                                else {
                                    return item.name + " x" + item.quantity + ","
                                }
                            })}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;