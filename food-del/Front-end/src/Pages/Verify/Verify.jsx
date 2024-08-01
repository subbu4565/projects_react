import {useContext, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import './Verify.css'
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext.jsx";

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const success=searchParams.get('success');
    const order_id = searchParams.get('order_id');
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();
    const verifyPayment= async ()=>{
        console.log(order_id)
        const response= await axios.post(`${url}/api/food/order/verify`,{success,order_id})
        if (response.data.success){
            navigate("/myorders")
        }
        else{
            navigate("/")
        }
    }
    useEffect(() => {
        verifyPayment()
    }, []);
    return(
        <div className="verify">
            <div className="spinner">

            </div>

        </div>
    )
}
export default Verify
//66aba9c0216d64132dbea5a9