import'./Orders.css'
import {useEffect, useState} from "react";
import axios from 'axios'
import {assets} from "../../assets/assets.js";
const Orders = () => {
    const [data,setData] = useState([])
    const url="http://localhost:3000"

    const fetchData = async () => {
        const response= await axios.get(`${url}/api/food/order/orders/list`)
        if (response.data.success){
            setData(response.data.data)
            console.log(response.data)
        }
        else{
            console.error(response.data.message)
        }
    }
    const statusHandler = async(e,orderId)=>{
        const response= await axios.post(`${url}/api/food/order/status`,{
            orderId,
            status: e.target.value
        })
        if (response.data.success){
            await fetchData()
        }
        else{
            console.error(response.data.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, []);

    return(
        <div className="order-add">
            <h3>Order Page</h3>
            <div className="order-list">
                {data.map((order,i)=>(
                    <div key={i} className={"order-item"}>
                        <img src={assets.parcel_icon} alt=""/>
                        <div>
                            <p className={"order-item-food"}>
                                {order.items.map((item, idx) => (
                                    idx === order.items.length - 1
                                        ? `${item.name} x${item.quantity}`
                                        : `${item.name} x${item.quantity}, `
                                ))}
                            </p>
                            <p className={"order-item-name"}>
                                {order.address.firstName+" "+order.address.lastName}
                            </p>
                            <div className={"order-item-address"}>
                                <p>{order.address.street+","}</p>
                                <p>{order.address.city+","+order.address.state+","+order.address.zipcode+","+order.address.country}</p>

                            </div>
                            <p className={"order-item-phone"}>{order.address.phone}</p>
                    </div>
                        <p>Items:{order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                            <option value={"Food Processing"}>Food Processing</option>
                            <option value={"Out for delivery"}>Out for delivery</option>
                            <option value={"Delivered"}>Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Orders;