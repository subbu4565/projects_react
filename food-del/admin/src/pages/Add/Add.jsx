import'./Add.css'
import { assets } from "../../assets/assets.js";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

const Add = ({url}) => {
    const [img, setImg] = useState(false);
    const [data, setData] = useState({
        name:"",
        description:"",
        category:"salad",
        price:""
    });

    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
    };

    const onChangeHandler = (e) => {
        const name=e.target.name
        const value=e.target.value
        setData((data)=>({...data,[name]:value}))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData=new FormData()
        formData.append('name',data.name);
        formData.append('description',data.description);
        formData.append('category',data.category);
        formData.append('price',Number(data.price));
        formData.append('image',img);
        const res = await axios.post(`${url}/api/food/add`,formData);
        if (res.data.success) {
            console.log(res)
            setData({
                    name:"",
                    description:"",
                    category:"salad",
                    price:""
                })
            setImg(false);
            toast.success(res.data.message);
        }
        else{
            toast.error(res.data.message);
        }

    }

    return(
        <div className="add">
            <form className="flex-col" onSubmit={handleFormSubmit}>
                <div className="add-img-upload frex-col">
                    <p>Upload image</p>
                    <label htmlFor="img">
                        <img src={img? URL.createObjectURL(img):assets.upload_area}
                             alt={""}
                        />
                    </label>
                    <input type={"file"} onChange={handleImageChange} id={"img"} hidden={true}/>
                </div>
                <div className="add-product-name frex-col">
                    <p>Product Name</p>
                    <input type={"text"} onChange={onChangeHandler} name={"name"} value={data.name} placeholder={"Type Here"}/>
                </div>
                <div className="add-product-description frex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} name={"description"}   value={data.description} rows={"6"} placeholder={"Description here"} required={true}/>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>product Category</p>
                        <select name={"category"} onChange={onChangeHandler}>
                            <option value="Salad">Salad</option>
                            <option value="Roles">Roles</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} type={"Number"} name={"price"} value={data.price} placeholder={"$20"}/>
                    </div>
                </div>
                <button type={"submit"} className={"add-btn"}>Add</button>
            </form>
        </div>
    )
}
export default Add