import {getCurrentLogo, getUserData} from "./AuthReducer";
import {createSlice} from "@reduxjs/toolkit";

type InitialStateType = {
    initialized: boolean
}

const appSlice = createSlice({
    name: "app",
    initialState: {
        initialized: false
    } as InitialStateType,
    reducers: {
        setInitialized: (state) => {
            state.initialized = true
        }
    }
});

export const {setInitialized} = appSlice.actions

export const initiliazeApp: any = () => async (dispatch : any) => {
    let promises = [];
    promises.push(dispatch(getUserData()));
    promises.push(dispatch(getCurrentLogo()));
    
    await Promise.all(promises);
    dispatch(setInitialized());
}

export default appSlice.reducer;