import { followAPI, UsersAPI } from "../API/api";
import { friendsItemType, FriendsType } from "../types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        users: [] as Array<friendsItemType>,
        SearchMessageText: "",
        pageSize: 52,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] as Array<number>
    } as FriendsType,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        ToggleIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        }
    }, extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action: PayloadAction) => {
            state.isFetching = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.items
            state.totalUsersCount = action.payload.totalCount
            state.isFetching = false
        })
        builder.addCase(Follow.pending, (state, action: PayloadAction) => {
            state.followingInProgress.push(action.payload)
        })
        builder.addCase(Follow.fulfilled, (state, action: PayloadAction<number>) => {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].id === action.payload) {
                    state.users[i].followed = true
                }
            }
        })
        builder.addCase(Follow.rejected, (state, action) => {
            state.followingInProgress = { ...state.followingInProgress.filter(id => id !== action.payload) }
        });
        builder.addCase(unFollow.pending, (state, action) => {
            state.followingInProgress.push(action.payload)
        })
        builder.addCase(unFollow.fulfilled, (state, action) => {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].id === action.payload) {
                    state.users[i].followed = false
                }
            }
        })
        builder.addCase(unFollow.rejected, (state, action) => {
            state.followingInProgress = { ...state.followingInProgress.filter(id => id !== action.payload) }
        });
    }
});

export const { setCurrentPage, ToggleIsFetching } = friendsSlice.actions;

export const getUsers = createAsyncThunk('friends/getUsers', async (payload: any) => {
    const data = await UsersAPI.getUsers(payload.currentPage, 52, payload.term);
    return data;
})

export const Follow = createAsyncThunk("/users/follow", async (userId: number) => {
    const data = await followAPI.follow(userId);
    return data.resultCode === 0 ? userId : 0;
});

export const unFollow = createAsyncThunk("/users/unfollow", async (userId: number) => {
    const data = await followAPI.unfollow(userId)
    return data.resultCode === 0 ? userId : null;
})


export default friendsSlice.reducer;