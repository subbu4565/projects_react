import'./Add.css'
import {assets} from "../../assets/assets.js";
import {useState} from "react";


const Add = () => {
    const [img, setImg] = useState(false);

    const handleImageChange = (e) => {
            console.log("Image selected:", e.target.files[0]);
            setImg(e.target.files[0]);
    };

    return(
        <div className="add">
            <form className="flex-col">
                <div className="add-img-upload frex-col">
                    <p>Upload image</p>
                    <label htmlFor="img">
                        <img src={img? URL.createObjectURL(img):assets.upload_area}
                             onChange={handleImageChange}
                             alt={""}
                        />
                    </label>
                    <input type={"file"} id={"img"} hidden={true}/>
                </div>
                <div className="add-product-name frex-col">
                    <p>Product Name</p>
                    <input type={"text"} name={"name"} placeholder={"Type Here"}/>
                </div>
                <div className="add-product-description frex-col">
                    <p>Product description</p>
                    <textarea name={"description"} rows={"6"} placeholder={"Description here"} required={true}/>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>product Category</p>
                        <select name={"category"}>
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
                        <input type={"Number"} name={"price"} placeholder={"$20"}/>
                    </div>
                </div>
                <button type={"submit"} className={"add-btn"}>Add</button>
            </form>
        </div>
    )
}
export default Add