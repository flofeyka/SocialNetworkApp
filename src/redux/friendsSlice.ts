import { followAPI, UsersAPI } from "../API/api";
import { FilterFriendsType, friendsItemType, FriendsType } from "../types/types";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        users: [] as Array<friendsItemType>,
        SearchMessageText: "",
        pageSize: 52,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        filter: {
            term: '' as string,
            friend: null as null | boolean
        } as FilterFriendsType,
        followingInProgress: [] as Array<number>
    } as FriendsType,
    reducers: {
        setFilter(state, action: PayloadAction<{ term: string, friend: null | boolean }>) {
            state.filter = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        ToggleIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        }
    }, extraReducers: (builder: ActionReducerMapBuilder<FriendsType>) => {
        builder.addCase(getUsers.pending, (state, action: PayloadAction) => {
            state.isFetching = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<{items: Array<friendsItemType>, totalCount: number}>) => {
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
        builder.addCase(Follow.rejected, (state, action: PayloadAction<any>) => {
            state.followingInProgress = { ...state.followingInProgress.filter(id => id !== action.payload) }
        });
        builder.addCase(unFollow.pending, (state, action: PayloadAction<any>) => {
            state.followingInProgress.push(action.payload)
        })
        builder.addCase(unFollow.fulfilled, (state, action: PayloadAction<any>) => {
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].id === action.payload) {
                    state.users[i].followed = false
                }
            }
        })
        builder.addCase(unFollow.rejected, (state, action: PayloadAction<any>) => {
            state.followingInProgress = { ...state.followingInProgress.filter(id => id !== action.payload) }
        });
    }
});

export const { setCurrentPage, ToggleIsFetching, setFilter } = friendsSlice.actions;

export const getUsers = createAsyncThunk('friends/getUsers', async (payload: { currentPage: number, filter: FilterFriendsType}) => {
    const {currentPage, filter} = payload;
    const data = await UsersAPI.getUsers(currentPage, 52, filter.term, filter.friend);
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