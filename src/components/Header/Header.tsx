import "../../App.css"
import logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogOutSystem } from "../../redux/AuthReducer";
import { RootState, useAppDispatch } from "../../redux/ReduxStore";
import { Button } from "antd";
import "../../App.css";

function Header() {
    const [isAuth, login, userId] = useSelector((state: RootState) => [
        state.AuthPage.isAuth,
        state.AuthPage.login,
        state.AuthPage.userId
    ]);
    const dispatch = useAppDispatch();

    return <header className="header flex bg-[white] max-h-[55px] px-10 border-solid border-black border-b-[1px] items-center">
        <NavLink to={"/"}>
            <div className="flex">
                <img src={logo} alt="logo" className="w-[45px] h-[45px]" /><span className="font-bold text-4xl">LinkApp</span>
            </div>
        </NavLink>
        <span className="w-[100%]">{isAuth &&
            <NavLink to={"/user/" + userId}>
                <div className="flex font-bold text-2xl justify-end">
                    {login}<NavLink to={"auth"}><Button className="mx-2" onClick={() => dispatch(LogOutSystem())}>Log Out</Button></NavLink>
                </div>
            </NavLink>}
        </span>
    </header>
}


export default Header;