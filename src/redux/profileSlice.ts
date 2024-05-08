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
        PostItem: [] as Array<postItemType>,
        status: null,
        isFollowing: null,
        followingInProgress: null
    } as profileType,
    reducers: {
        addPost: (state, action) => {
            let { userId, fullName, currentProfileImage, NewPostMessage } = action.payload
            state.PostItem.push({
                id: state.PostItem.length + 1,
                userId: userId,
                fullName: fullName,
                usersPhoto: currentProfileImage,
                postMessage: NewPostMessage,
                likesCount: 0,
                isLiked: false,
                answers: []
            })
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
    }, extraReducers: (builder: ActionReducerMapBuilder<profileType>) => {
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

export const {
    addPost, answerComment, setLikeAnswer,
    setLike, acceptCommentChanges, deleteComment, acceptAnswerChanges, deleteAnswer
} = profileSlice.actions;

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