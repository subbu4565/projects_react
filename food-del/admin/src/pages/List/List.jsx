import './List.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const List = ({url}) => {
    const [list, setList] = useState([])
    const fetchList=async ()=>{
        const res = await axios.get(`${url}/api/food/list`);
        const x=res.data.data
        console.log(x)
        if (res.data.success){
            setList(x);
        }
        else{
            toast.error(res.data.message)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            await fetchList();
        };

        fetchData().then(res=>{
            if(res.status === 200){
                console.log(res.data)
            }
            else{
                console.log(res.data.message)
            }
        });
    }, []);

    const deleteFoodItem = async (foodID)=>{
        const res = await axios.delete(`${url}/api/food/delete/${foodID}`)
        if (res.data.success){
            toast.success(res.data.message)
            await fetchList()
        }
        else{
            toast.error(res.data.message)
        }
    }
    return(
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item,index)=>{
                    return(
                        <div key={index} className="list-table-format">
                            <img src={`${url}/uploads/${item.image}`} alt={""}/>
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p className={"cursor"} onClick={()=>deleteFoodItem(item._id)}>x</p>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}
export default List



