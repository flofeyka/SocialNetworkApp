import React, { Suspense, useEffect } from "react";
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { initiliazeApp } from "./redux/AppReducer";
import { Provider, useDispatch, useSelector } from "react-redux";
import InitializationPage from "./components/Preloader/Initialization/InitializationPage.jsx";
import store, { RootState } from "./redux/ReduxStore";
import { NextUIProvider } from "@nextui-org/react";


const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Header = React.lazy(() => import("./components/Header/Header"));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const Login = React.lazy(() => import("./components/Auth/Login/Login"));
const Register = React.lazy(() => import("./components/Auth/Register/Register"));
const Chat = React.lazy(() => import("./pages/ChatPage"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Friends = React.lazy(() => import("./components/Friends/Friends"));
const Feed = React.lazy(() => import("./components/Feed/Feed"));
const Community = React.lazy(() => import("./components/Community/Community"));
const Video = React.lazy(() => import("./components/Video/Video"));
const Music = React.lazy(() => import("./components/Music/Music"));
const Settings = React.lazy(() => import("./components/Settings/Settings"));


const App: React.FC = () => {
    const [initialized, isAuth]: any = useSelector((state: RootState) => [state.App.initialized, state.AuthPage.isAuth]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initiliazeApp());
    }, [isAuth, dispatch]);

    if (!initialized) {
        return <InitializationPage />
    } else if (!isAuth) {
        return <Suspense fallback={<InitializationPage />}>
            <div className="AuthContainer">
                <Routes>
                    <Route path='*' element={<Navigate to="/auth" />} />
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
        </Suspense>

    }

    return <div className='m-0 grid gap-2 bg-[aliceblue] min-h-screen h-[100%] grid-rows-[2fr] grid-col-[10fr]'>
        <Header />
        <Navbar />
        <div className="rounded-xl min-h-[92vh] w-[60%] ml-auto mr-auto block">
            <div className="rounded">
                <Routes>
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/user/:userId' element={<Profile />} />
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/chat/:dialogId' element={<Chat />} />
                    <Route path='/community' element={<Community />} />
                    <Route path="/friends" element={<Friends />} />
                    <Route path='/videos' element={<Video />} />
                    <Route path='/music' element={<Music />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='*' element={<Navigate to="/feed" />} />
                </Routes>
            </div>
        </div>
    </div>
}

function AppProvider() {
    return <Suspense fallback={<InitializationPage />}>
        <BrowserRouter>
            <NextUIProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </NextUIProvider>
        </BrowserRouter>
    </Suspense>

}

export default AppProvider;
