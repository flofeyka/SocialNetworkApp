export function getAllUsers(state) {
    return state.Friends.users;
}

export function getTotalUsersCount(state) {
    return state.Friends.totalUsersCount;
}

export function getPageSize(state) {
    return state.Friends.pageSize;
}

export function getProgressInFollowing(state) {
    return state.Friends.followingInProgress;
}

export function getCurrentPage(state) {
    return state.Friends.currentPage;
}

