
import Navbar from "./Components/navbar/Navbar.jsx";
import Sidebar from "./Components/sidebar/Sidebar.jsx";
import {Routes,Route} from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders.jsx";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const url="http://localhost:3000";
    return(
        <>
            <ToastContainer />
            <Navbar/>
            <hr/>
            <div className="app-content">
                <Sidebar/>
                <Routes>
                    <Route path="/add" element={<Add url={url}/>}/>
                    <Route path={'/list'} element={<List url={url}/>}/>
                    <Route path={"/orders"} element={<Orders/>}/>
                </Routes>
            </div>
        </>
    )
}
export default App;