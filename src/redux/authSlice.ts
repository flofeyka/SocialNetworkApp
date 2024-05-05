import {AuthAPI, ProfileAPI, SecurityAPI} from "../API/api";
import {authType} from "../types/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        login: null,
        email: null,
        isAuth: false,
        currentProfileImage: {
            small: null,
            large: null
        },
        isFetching: false,
        captchaUrl: null,
        currentUserName: null
    } as authType,
    reducers: {
        setUserData: (state, action) => {
            [state.userId, state.login, state.email] = [action.payload.id, action.payload.login, action.payload.email];
        },
        setLoginStatus: (state, action) => {
            state.isAuth = action.payload
        },
        setCurrentPhoto: (state, action) => {
            state.currentProfileImage = action.payload
        },
        setCaptchaUrl: (state, action) => {
            state.captchaUrl = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(LoginSystem.fulfilled, (state, action) => {
            if(action.payload.resultCode === 0) {
                state.isAuth = true;
                [state.userId, state.login, state.email] = [action.payload.id, action.payload.login, action.payload.email];
            }

            if(action.payload.resultCode === 10) {
                state.captchaUrl = action.payload.captchaUrl;
            }
        });
        builder.addCase(getCurrentLogo.fulfilled, (state, action) => {
            state.currentProfileImage = action.payload;
        });
    }
});

export const {setUserData, setLoginStatus, setCurrentPhoto, setCaptchaUrl} = authSlice.actions;

export const getUserData = () => async (dispatch: any) => {
    const data = await AuthAPI.getUsersData();
    if (data.resultCode === 0) {
        let {id, login, email} = data.data;
        dispatch(setUserData({id, login, email}));
        dispatch(setLoginStatus(true))
    }
}

// export const getCurrentLogo = () => async (dispatch: any, getState: any) => {
//     let userId = getState().AuthPage.userId;
//     let data = await ProfileAPI.getUserProfile(userId);
//     dispatch(setCurrentPhoto(data.photos));
// }

export const getCurrentLogo = createAsyncThunk("auth/usersData/getCurrentLogo", async (_, {getState}: any) => {
    const userId = getState().AuthPage.userId;
    const data = await ProfileAPI.getUserProfile(userId);
    return data.photos;
})



export const LoginSystem = createAsyncThunk("auth/login", async (payload: any, {dispatch}) => {
    const { email, password, rememberMe = false, captcha = null } = payload;
    const data = await AuthAPI.Login(email, password, rememberMe, captcha);
    if(data.resultCode === 0) {
        return data;
    } else if (data.resultCode === 10) {
        dispatch(getCaptchaUrl());
    }
    return null;
})

export const getCaptchaUrl = createAsyncThunk("auth/getCaptchaUrl", async (_, {dispatch}) => {
    const data = await SecurityAPI.getCaptcha();
    return data.url;
})


// export const LoginSystem = (email: string, password: string, rememberMe: boolean, captcha: string | null) => async (dispatch: any) => {
//     const data = await AuthAPI.Login(email, password, rememberMe, captcha);
//     if (data.resultCode === 0) {
//         await dispatch(setLoginStatus(true));
//         await dispatch(getUserData());
//     } else if (data.resultCode === 10) {
//         await dispatch(getCaptchaUrl());
//     }
// };

export const setCaptcha = (url: string | null) => ({type: setCaptchaUrl, url})

export const LogOutSystem = () => async (dispatch: any) => {
    let data = await AuthAPI.LogOut();
    if (data.resultCode === 0) {
        dispatch(setLoginStatus(false));
    }
};

export const setNewCurrentUsersPhoto = (photo: any) => async (dispatch: any) => {
    let data = await AuthAPI.setCurrentPhoto(photo);
    if (data.resultCode === 0) dispatch(setCurrentPhoto(data.photos));
}
export default authSlice.reducer;