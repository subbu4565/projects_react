
import Navbar from "./Components/Navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import PlaceOrder from "./Pages/Place-order/Placeorder.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import {useState} from "react";
import Login from "./Components/Login/Login.jsx";

function App() {

    const [showLogin, setShowLogin] = useState(false);

  return (
      <>
          {showLogin ?<Login setShowLogin={setShowLogin}/> :<></>}
          <div className="app">
              <Navbar setShowLogin={setShowLogin}/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path={'/order'} element={<PlaceOrder/>}/>
              </Routes>
              <Footer/>

          </div>
      </>

  )
}

export default App
