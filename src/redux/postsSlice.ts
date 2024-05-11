import { createSlice } from "@reduxjs/toolkit";
import { postItemType } from "../types/types";

const postsSlice = createSlice({
    name: "posts", 
    initialState: {
        PostItem: [] as Array<postItemType>,
        FeedPosts: [] as Array<postItemType>
    },
    reducers: {
        addPost: (state, action) => {
            let { userId, fullName, currentProfileImage, NewPostMessage } = action.payload
            const newPost = {
                id: state.PostItem.length + 1,
                userId: userId,
                fullName: fullName,
                usersPhoto: currentProfileImage,
                postMessage: NewPostMessage,
                likesCount: 0,
                isLiked: false,
                answers: []
            }
            state.PostItem.push(newPost);
            state.FeedPosts.push(newPost);
        },
        answerComment: (state, action) => {
            const { id, name, image, userId, message } = action.payload
            state.PostItem.forEach(post => {
                if (post.id === id) {
                    post.answers.push({
                        id: post.answers.length + 1,
                        postId: id,
                        answerName: name,
                        usersImage: image,
                        userId,
                        answerMessage: message,
                        isLiked: false,
                        likesCount: 0
                    });
                }
                ;
            });
        },
        setLikeAnswer: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.forEach(answer => {
                    if (answer.id === action.payload.answerId && post.id === action.payload.postId) {
                        answer.likesCount = !answer.isLiked ? answer.likesCount + 1 : answer.likesCount - 1;
                        answer.isLiked = !answer.isLiked;
                    }
                    ;
                });
            });
        },
        setLike: (state, action) => {
            state.PostItem.forEach(post => {
                if (post.id === action.payload) {
                    post.likesCount = !post.isLiked ? post.likesCount + 1 : post.likesCount - 1;
                    post.isLiked = !post.isLiked;
                }
            });
        },
        acceptCommentChanges: (state, action) => {
            state.PostItem.forEach(post => {
                post.postMessage = post.id === action.payload.id ? action.payload.newMessage : post.postMessage;
            });
        },
        deleteComment: (state, action) => {
            state.PostItem.splice(action.payload - 1, 1);
        },
        acceptAnswerChanges: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.forEach(answer => {
                    answer.answerMessage = answer.id === action.payload.answerId && post.id === action.payload.postId
                        ? action.payload.newMessage : answer.answerMessage;
                })
            })
        },
        deleteAnswer: (state, action) => {
            state.PostItem.forEach(post => {
                post.answers.splice(action.payload - 1, 1);
            });
        }
    }
})

export const {
    addPost, answerComment, setLikeAnswer,
    setLike, acceptCommentChanges, deleteComment, acceptAnswerChanges, deleteAnswer
} = postsSlice.actions;

export default postsSlice.reducer;