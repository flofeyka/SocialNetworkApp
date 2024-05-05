import FeedReducer, {addPostFeed, reportPost} from "../feedSlice";
import {FeedsType} from "../../types/types";

let state: FeedsType = {
    FeedPosts: [
        {
            id: 1,
            fullName: "Winston Smith",
            usersPhoto: null,
            userId: 2,
            postMessage: "Emmanuel, give me a book pls",
            isReported: false
        }
    ],
}

it("Post in feed should be added", async () => {
    const action = addPostFeed({fullName: "Test user", usersPhoto: null, postText: "Test text", userId: 1, isReported: false});

    const newState = FeedReducer(state, action);
    expect(newState.FeedPosts[1]).toStrictEqual({
        id: 2,
        fullName: "Test user",
        usersPhoto: null,
        userId: 1,
        postMessage: "Test text",
        isReported: false
    });
});

it("Post in feed should be reported", async () => {
    const action = reportPost(1);

    const newState = FeedReducer(state, action);

    expect(newState.FeedPosts[0].isReported).toBe(true);
});

