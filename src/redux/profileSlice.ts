import { ProfileAPI, followAPI } from "../API/api";
import { postItemType, profileDataType, profileType } from "../types/types";
import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profileData: {
            photos: {
                large: null,
                small: null
            }
        } as profileDataType,
        currentUserId: null,
        isFetching: true,
        status: null,
        isFollowing: null,
        followingInProgress: null
    } as profileType,
    reducers: {}, 
    extraReducers: (builder: ActionReducerMapBuilder<profileType>) => {
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<profileDataType>) => {
            state.profileData = action.payload;
        })
        builder.addCase(setStatusProfile.fulfilled, (state, action: PayloadAction<string | null>) => {
            state.status = action.payload;
        })
        builder.addCase(getFollowingData.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.isFollowing = action.payload;
        })
        builder.addCase(getStatus.fulfilled, (state, action: PayloadAction<string | null>) => {
            action.payload ? state.status = action.payload : state.status = "Статус отсутствует :)";
        })
        builder.addCase(Follow.pending, (state, action: PayloadAction) => {
            state.followingInProgress = true;
        })
        builder.addCase(Follow.fulfilled, (state, action: PayloadAction) => {
            state.isFollowing = true;
            state.followingInProgress = false;
        })
        builder.addCase(unFollow.pending, (state, action: PayloadAction) => {
            state.followingInProgress = true;
        })
        builder.addCase(unFollow.fulfilled, (state, action: PayloadAction) => {
            state.isFollowing = false;
            state.followingInProgress = false;
        })
        builder.addCase(editProfile.fulfilled, (state, action:PayloadAction<profileDataType>) => {
            state.profileData = action.payload;
        })
    }
});

export const getStatus = createAsyncThunk("profile/getStatus", async (userId: number) => {
    return await ProfileAPI.getProfileStatus(userId);
})
export const getProfile = createAsyncThunk('profile/getProfile', async (userId: number) => {
    return await ProfileAPI.getUserProfile(userId)
});

export const setStatusProfile = createAsyncThunk('profile/setStatus', async (status: string | null) => {
    const data = await ProfileAPI.setProfileStatus(status);
    if(data.resultCode === 0) {
        return status;
    }
    return null;
})

export const getFollowingData = createAsyncThunk('profile/getFollowingData', async (userId: number) => {
    return await ProfileAPI.getFollowingData(userId);
}
)
export const Follow = createAsyncThunk('profile/follow', async (id: number) => {
    return await followAPI.follow(id);
})

export const unFollow = createAsyncThunk('profile/unfollow', async (id: number) => {
    return await followAPI.unfollow(id);
});

export const editProfile = createAsyncThunk('profile/editProfile', async (data: any) => {
    return await ProfileAPI.editProfileData(data);
})


export default profileSlice.reducer;