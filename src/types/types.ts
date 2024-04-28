export type contactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}

export type profileDataType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: null | string
    fullName: string
    contacts: contactsType
    photos: {
        small: null | string
        large: null | string
    }
}

export type answersType = {
    id: number,
    postId: number,
    answerName: string,
    usersImage: string | null,
    userId: number,
    answerMessage: string,
    isLiked: boolean,
    likesCount: number
}

export type postItemType = {
    id: number
    userId: number
    fullName: string
    usersPhoto: string | null
    postMessage: string
    likesCount: number
    isLiked: boolean
    answers: Array<answersType>
}

export type photosType = {
    small: null | string
    large: null | string
}


export type profileType = {
    profileData: profileDataType | any
    currentUserId: number | null
    isFetching: boolean
    PostItem: Array<postItemType>
    status: null | string
    isFollowing: null | boolean
    followingInProgress: null | boolean
}

export type authType = {
    userId: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    currentProfileImage: any
    isFetching: boolean
    captchaUrl: null | string,
    currentUserName: string | null
}

export type CommunitiesType = {
    id: number
    ownerId: number
    isFollowed: boolean
    name: string

}

export type communityType = {
    Communities: Array<CommunitiesType>
}

export type MessagesType = {
    id: number
    message: string
    userId: number
    fullName: string
    usersPhoto: null | string
}

export type DialogsItemType = {
    id: number,
    userId: number,
    name: string,
    usersImage: string | null
    lastMessage: string | null
    date: string
}

export type DialogsType = {
    Dialogs: Array<DialogsItemType>
    Messages: Array<MessagesType>
}

export type FeedPostItemType = {
    id: number
    fullName: string
    usersPhoto: string | null
    userId: number
    postMessage: string
    isReported: boolean
}

export type FeedsType = {
    FeedPosts: Array<FeedPostItemType>
}

export type friendsItemType = {
    id: number
    name: string
    status: string | null
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

export type FriendsType = {
    users: Array<friendsItemType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<any>
    
}