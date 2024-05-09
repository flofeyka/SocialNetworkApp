import { FeedPostItemType, FeedsType, postItemType } from "../types/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
        isLiked: false,
        likesCount: 0,
        answers: []
      },
    ] as Array<postItemType>,
  } as FeedsType,
  reducers: {
    addPostFeed: (state, action: PayloadAction<{
        fullName: string;
        usersPhoto: string | null;
        userId: number;
        postMessage: string;
      }>) => {
      const { fullName, usersPhoto, userId, postMessage } =
        action.payload;
      state.FeedPosts.push({
        id: Object.keys(state.FeedPosts).length + 1,
        fullName: fullName,
        usersPhoto: usersPhoto,
        userId: userId,
        postMessage: postMessage,
        likesCount: 0,
        isLiked: false,
        answers: []
        });
    },
  },
});

export const { addPostFeed } = feedSlice.actions;

export default feedSlice.reducer;
