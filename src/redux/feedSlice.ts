import {FeedPostItemType, FeedsType} from "../types/types";
import {createSlice} from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name: "feed",
    initialState: {
        FeedPosts: [
            {
                id: 1,
                fullName: "Winston Smith",
                usersPhoto: null,
                userId: 2,
                postMessage: "Emmanuel, give me the book pls",
                isReported: false
            }
        ] as Array<FeedPostItemType>
    } as FeedsType,
    reducers: {
        addPostFeed: (state, action) => {
            const {fullName, usersPhoto, userId, postText, isReported} = action.payload
            state.FeedPosts.push({
                id: Object.keys(state.FeedPosts).length + 1,
                fullName: fullName,
                usersPhoto: usersPhoto,
                userId: userId,
                postMessage: postText,
                isReported: isReported
            });
        },
        reportPost: (state, action) => {
            state.FeedPosts.forEach(item => {
                item.isReported = action.payload === item.id
            })
        }
    }
});

export const {addPostFeed, reportPost} = feedSlice.actions;

export default feedSlice.reducer;
