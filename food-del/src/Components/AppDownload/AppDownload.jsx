import './AppDownload.css'
import {assets} from "../../assets/assets.js";
const AppDownload = () => {
        return(
            <div className="AppDownload" id="mobile-app">
                <p>For better experience download our app <br/> TomatoApp</p>
                <div className="AppDownload-icons">
                    <img src={assets.play_store} alt={""}/>
                    <img src={assets.app_store} alt={""}/>
                </div>
            </div>
        )
}
export default AppDownload;