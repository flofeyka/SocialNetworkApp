import profileReducer, {
    acceptAnswerChanges,
    acceptCommentChanges,
    addPost,
    answerComment, deleteAnswer,
    deleteComment, setLike, setLikeAnswer} from "../profileSlice";
import ProfileReducer from "../profileSlice";
import {profileDataType, profileType} from "../../types/types";

let state : profileType = {
    profileData: {
        photos: {
            small: null,
            large: null
        }
    } as profileDataType,
    currentUserId: null,
    isFetching: true,
    PostItem: [{
        id: 1,
        userId: 2532,
        fullName: "Test Name #1",
        usersPhoto: null,
        postMessage: "Test Message #1",
        likesCount: 5313,
        isLiked: true,
        answers: [{
            id: 1,
            postId: 1,
            answerName: "Test Name #2",
            usersImage: null,
            userId: 1,
            answerMessage: "Test answer #1",
            isLiked: false,
            likesCount: 123
        }]
    }],
    status: null,
    isFollowing: null,
    followingInProgress: null
};



it("New post should be added", () => {
    let action = addPost({userId: 5, fullName: "Test Name #2", currentProfileImage: null, NewPostMessage: "Test Message #2",
        likesCount: 6542, isLiked: true});

    let newState = profileReducer(state, action);

    expect(newState.PostItem[1]).toStrictEqual({
        id: 2,
        userId: 5,
        fullName: "Test Name #2",
        usersPhoto: null,
        postMessage: "Test Message #2",
        likesCount: 6542,
        isLiked: true,
        answers: []
    });
});

it("Post should be deleted", () => {
    let action = deleteComment(1);

    let newState = ProfileReducer(state, action);

    expect(newState.PostItem.length).toBe(0);
});

it("Post should be edited", () => {
    let action = acceptCommentChanges({id: 1, newMessage: "EDIT TEST"});

    let newState = ProfileReducer(state, action);
    expect(newState.PostItem[0].postMessage).toBe("EDIT TEST");
});

it("Post shouldn't be liked", () => {
    let action = setLike(1);

    let newState = profileReducer(state, action);

    expect(newState.PostItem[0].isLiked).toBe(false)
})

it("New answer should be added", () => {
    let action = answerComment({id: 1, userId: 1, name: "Test answer #2", image: null,
        message: "Test answer message #2", likesCount: 123, isLiked: false});

    let newState = ProfileReducer(state, action);

    expect(newState.PostItem[0].answers[1]).toStrictEqual({
        id: 2,
        postId: 1,
        answerName: "Test answer #2",
        usersImage: null,
        userId: 1,
        answerMessage: "Test answer message #2",
        isLiked: false,
        likesCount: 123
    })
});

it("Answer should be edited", () => {
    let action = acceptAnswerChanges({postId: 1, newMessage: "EDITED ANSWER", answerId: 1})

    let newState = ProfileReducer(state, action);

    expect(newState.PostItem[0].answers[0].answerMessage).toBe("EDITED ANSWER");
});

it("Answer should be deleted", () => {
    let action = deleteAnswer(1);

    let newState = profileReducer(state, action);

    expect(newState.PostItem[0].answers.length).toBe(0);
});

it("The answer should be liked", () => {
    let action = setLikeAnswer({answerId: 1, postId: 1});

    let newState = profileReducer(state, action);

    expect(newState.PostItem[0].answers[0].isLiked).toBe(true);
});