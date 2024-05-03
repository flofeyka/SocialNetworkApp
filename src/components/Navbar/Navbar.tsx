import {useEffect} from 'react';
import '../../App.css'
import "./Nav.css"
import {NavLink} from 'react-router-dom'
import user from "../../assets/Profile/usersProfileIcon.png"
import feed from "../../assets/Navbar/feed.png"
import messanger from "../../assets/Navbar/messenger.png"
import music from "../../assets/Navbar/music.png"
import video from "../../assets/Navbar/video.png"
import settings from "../../assets/Navbar/setting.png"
import friends from "../../assets/Navbar/friends.png"
import community from "../../assets/Navbar/community.png"
import {useSelector} from "react-redux";
import {getCurrentLogo} from "../../redux/AuthReducer";
import {RootState, useAppDispatch} from "../../redux/ReduxStore";

function Navbar() {
    const [usersPhoto, fullName, userId] = useSelector((state: RootState) => [
        state.AuthPage.currentProfileImage.small,
        state.AuthPage.login,
        state.AuthPage.userId
    ]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentLogo());
    }, [usersPhoto, dispatch]);

    return <nav className="Nav">
        <NavLink to={"/user/" + userId}>
            <button><img className='rounded-full' src={usersPhoto || user} alt=""/>{fullName}</button>
        </NavLink>
        <NavLink to="/feed">
            <button><img src={feed} alt="Feed"/>Новости</button>
        </NavLink>
        <NavLink to="/chat">
            <button type='submit'><img src={messanger} alt="Messanger"/>Мессенджер</button>
        </NavLink>
        <NavLink to="/community">
            <button type='submit'><img src={community} alt="Community"/>
                Сообщества
            </button>
        </NavLink>
        <NavLink to="/music">
            <button><img src={music} alt="Music"/>
                Музыка
            </button>
        </NavLink>
        <NavLink to="/videos">
            <button><img src={video} alt="Video"/>
                Видео
            </button>
        </NavLink>
        <NavLink to={"/Friends"}>
            <button>
                <img src={friends} alt="Friends"/>
                Друзья
            </button>
        </NavLink>
        <NavLink to="/settings">
            <button><img src={settings} alt="Settings"/>
                Настройки
            </button>
        </NavLink>
    </nav>
};

export default Navbar;