import React, {FC, useEffect} from 'react'
import styles from "./friends.module.css";
import {useSelector} from "react-redux";
import {getUsers, setCurrentPage} from "../../redux/FriendsReducer";
import FriendsItem from "./FriendsItem/FriendsItem";
import SearchBoxFriends from "./SearchFriends/SearchBox";
import {Pagination} from "antd";
import {RootState, useAppDispatch} from "../../redux/ReduxStore";
import {friendsItemType} from "../../types/types";

function Friends() {
    const [users, totalUsersCount, pageSize, followingInProgress, currentPage] = useSelector((state: any) => [
        state.FriendsPage.users, state.FriendsPage.totalUsersCount, state.FriendsPage.pageSize,
        state.FriendsPage.followingInProgress, state.FriendsPage.currentPage]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers({currentPage: +currentPage}));
    }, [dispatch, currentPage]);

    return (
        <div className="text-xl flex flex-col items-center">
            <div className='my-2'>
                <Pagination defaultCurrent={1} total={+totalUsersCount} onChange={(pageNumber) => {
                    dispatch(setCurrentPage(pageNumber));
                }} current={+currentPage} pageSize={+pageSize} showSizeChanger={false}/>
            </div>
            <div>
                <SearchBoxFriends />
            </div>
            <div>
                {users.map((user: friendsItemType) => {
                    return <FriendsItem followingInProgress={followingInProgress} user={user}/>
                })}
            </div>
        </div>
    )
}

export default Friends;