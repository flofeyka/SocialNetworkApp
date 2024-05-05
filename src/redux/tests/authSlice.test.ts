import AuthReducer, {setCurrentPhoto, setUserData} from "../authSlice";
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
    currentUserName: null
};


it("User data should be set", async () => {
    let action:Action = setUserData({id: 1, login: "test", email: "test@test.dev"});


    let newState = AuthReducer(state, action);
 
    expect([newState.userId, newState.login, newState.email]).toStrictEqual([1, "test", "test@test.dev"]);
});

it("The picture should be stated", async () => {
    let action = setCurrentPhoto({
        small: "Small photo test",
        large: "Large photo test"
    });

    let newState = AuthReducer(state, action);

    expect(newState.currentProfileImage).toStrictEqual({
        small: "Small photo test",
        large: "Large photo test"
    });
});

