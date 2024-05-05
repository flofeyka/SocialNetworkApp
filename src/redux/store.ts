import dialogsSlice from "./dialogsSlice";
import profileSlice from "./profileSlice";
import friendsSlice from "./friendsSlice";
import feedSlice from "./feedSlice";
import authSlice from "./authSlice";
import communitySlice from "./communitySlice";
import appSlice from "./appSlice";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        MsgPage: dialogsSlice,
        ProfilePage: profileSlice,
        FeedPage: feedSlice,
        FriendsPage: friendsSlice,
        AuthPage: authSlice,
        CommunityPage: communitySlice,
        App: appSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


export default store;