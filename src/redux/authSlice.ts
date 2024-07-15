import { AuthAPI, ProfileAPI, SecurityAPI } from "../API/api";
import { authType } from "../types/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    currentProfileImage: {
      small: null,
      large: null,
    },
    isFetching: false,
    captchaUrl: null,
    currentUserName: null,
    errorMessage: null,
  } as authType,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LoginSystem.fulfilled, (state: authType, action) => {
      if (action.payload.resultCode === 0) {
        state.isAuth = true;
        [state.userId, state.login, state.email] = [
          action.payload.id,
          action.payload.login,
          action.payload.email,
        ];
      }

      if (action.payload.resultCode === 10) {
        state.captchaUrl = action.payload.captchaUrl;
      }
    });
    builder.addCase(
      getCurrentLogo.fulfilled,
      (
        state: authType,
        action: PayloadAction<{ small: string | null; large: string | null }>
      ) => {
        state.currentProfileImage = action.payload;
      }
    );
    builder.addCase(
      getUserData.fulfilled,
      (
        state: authType,
        action: PayloadAction<{ resultCode: number; data: { id: number; login: string; email: string } }>
      ) => {
        if(action.payload.resultCode === 0) {
        const { id, login, email } = action.payload.data;
        state.userId = id;
        state.login = login;
        state.email = email;
        state.isAuth = true;
        state.isFetching = false;
        }
      }
    );
    builder.addCase(getUserData.pending, (state: authType) => {
      state.isFetching = true;
    });
    builder.addCase(
      getUserData.rejected,
      (state: authType, action: PayloadAction<any>) => {
        state.errorMessage = action.payload?.message;
      }
    );
    builder.addCase(
      getCaptchaUrl.fulfilled,
      (state: authType, action: PayloadAction<string>) => {
        state.captchaUrl = action.payload;
      }
    );
    builder.addCase(
      LogOutSystem.fulfilled,
      (state: authType, action: PayloadAction<boolean>) => {
        if (action) {
          state.isAuth = false;
          state.userId = null;
          state.login = null;
          state.email = null;
          state.currentProfileImage = {
            small: null,
            large: null,
          };
          state.currentUserName = null;
          state.errorMessage = null;
        }
      }
    );
    builder.addCase(
      setNewCurrentUsersPhoto.fulfilled,
      (
        state: authType,
        action: PayloadAction<{
          resultCode: number;
          photos: { small: string | null; large: string | null };
        }>
      ) => {
        if (action.payload.resultCode === 0) {
          state.currentProfileImage = action.payload;
        }
      }
    );
  },
});

export const getUserData = createAsyncThunk("auth/getData", async () => {
  const data = await AuthAPI.getUsersData();
  return data;
});

export const getCurrentLogo = createAsyncThunk(
  "auth/usersData/getCurrentLogo",
  async (_, { getState }: any) => {
    const userId = getState().Auth.userId;
    const data = await ProfileAPI.getUserProfile(userId);
    return data.photos;
  }
);

export const LoginSystem = createAsyncThunk(
  "auth/login",
  async (payload: any, { dispatch }) => {
    const { email, password, rememberMe = false, captcha = null } = payload;
    const data = await AuthAPI.Login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      return data;
    } else if (data.resultCode === 10) {
      return dispatch(getCaptchaUrl());
    }
    return null;
  }
);

export const getCaptchaUrl = createAsyncThunk(
  "auth/getCaptchaUrl",
  async (_, { dispatch }) => {
    const data = await SecurityAPI.getCaptcha();
    return data.url;
  }
);

export const LogOutSystem = createAsyncThunk("auth/logout", async () => {
  const data = await AuthAPI.LogOut();
  if (data.resultCode === 0) {
    return true;
  }
  return false;
});

export const setNewCurrentUsersPhoto = createAsyncThunk(
  "auth/setNewCurrentUsersPhoto",
  async (photo: any, { dispatch }) => {
    const data = await AuthAPI.setCurrentPhoto(photo);
    if (data.resultCode === 0) return data;
  }
);

export default authSlice.reducer;
