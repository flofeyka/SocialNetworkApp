import { FeedPostItemType, FeedsType } from "../types/types";
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
        isReported: false,
      },
    ] as Array<FeedPostItemType>,
  } as FeedsType,
  reducers: {
    addPostFeed: (state, action: PayloadAction<{
        fullName: string;
        usersPhoto: string | null;
        userId: number;
        postMessage: string;
        isReported: boolean;
      }>) => {
      const { fullName, usersPhoto, userId, postMessage, isReported } =
        action.payload;
      state.FeedPosts.push({
        id: Object.keys(state.FeedPosts).length + 1,
        fullName: fullName,
        usersPhoto: usersPhoto,
        userId: userId,
        postMessage: postMessage,
        isReported: isReported,
      });
    },
    reportPost: (state, action: PayloadAction<number>) => {
      state.FeedPosts.forEach((item) => {
        item.isReported = action.payload === item.id;
      });
    },
  },
});

export const { addPostFeed, reportPost } = feedSlice.actions;

export default feedSlice.reducer;
