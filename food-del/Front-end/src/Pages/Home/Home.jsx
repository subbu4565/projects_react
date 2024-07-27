import react from 'react';
import Header from "../../Components/Header/Header.jsx";
import './Home.css'
import Navbar from "../../Components/Navbar/Navbar.jsx";
import ExploreMenu from "../../Components/ExploreMenu/Exploremenu.jsx";
import {useState} from "react";
import FoodDisplay from "../../Components/Fooddisplay/Fooddisplay.jsx";
import AppDownload from "../../Components/AppDownload/AppDownload.jsx";


export default function Home() {
    const [category, setCategory] = useState(null);
    return(
        <>
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory}/>
            <FoodDisplay category={category} />
            <AppDownload/>
        </>
    )
}