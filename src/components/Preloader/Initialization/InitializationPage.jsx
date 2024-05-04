import Logo from "../../../assets/logo.png";
import Preloader from "../Preloader";


export default function InitializationPage() {
    return <div className="overflow-auto">
        <div className="h-1/5 w-[9.5%] block mt-[15%] mx-auto my-0 border-[none]">
            <div>
                <img src={Logo} alt="Initialize logo in the center of screen"/>
            </div>
            <div className="h-3/6 w-6/12 ml-[25%]">
                <Preloader />
            </div>
        </div>
    </div>
}