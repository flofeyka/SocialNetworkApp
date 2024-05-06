import AuthReducer from "../authSlice";
import {authType} from "../../types/types";
import { Action } from "redux";

let state : authType = {
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
    currentUserName: null,
    errorMessage: ""
};

