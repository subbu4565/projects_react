
import Navbar from "./Components/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Placeorder from "./Pages/Place-order/Placeorder.jsx";

function App() {


  return (
    <div className="app">
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path={'/order'} element={<Placeorder/>}/>
        </Routes>

    </div>
  )
}

export default App
