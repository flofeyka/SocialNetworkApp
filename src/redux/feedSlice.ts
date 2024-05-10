import { postItemType } from "../types/types";
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
  },
  reducers: {}
});

export default feedSlice.reducer;
