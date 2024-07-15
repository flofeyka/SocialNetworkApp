import { FC, useEffect } from 'react'
import { useSelector } from "react-redux";
import { getUsers, setCurrentPage } from "../../redux/friendsSlice";
import FriendsItem from "./FriendsItem/FriendsItem";
import SearchBoxFriends from "./SearchFriends/SearchBox";
import { Pagination } from "antd";
import { RootState, useAppDispatch } from "../../redux/store";
import { friendsItemType } from "../../types/types";
import { useNavigate } from 'react-router-dom';

const Friends:FC = () => {
    const [users, totalUsersCount, pageSize, followingInProgress, currentPage, filter] = useSelector((state: any) => [
        state.Friends.users,
        state.Friends.totalUsersCount,
        state.Friends.pageSize,
        state.Friends.followingInProgress,
        state.Friends.currentPage,
        state.Friends.filter
    ]);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

  // useEffect(() => {
  //   navigate({
  //     pathname: "/users",
  //     search: `?term=${filter.term}&friend=${filter.friend}`,
  //   });
  // }, [filter]);

  useEffect(() => {
    dispatch(
      getUsers({currentPage: +currentPage, filter })
    );
  }, [dispatch, currentPage, filter]);

    return (
        <div className="text-xl flex flex-col items-center">
            <div className='my-2'>
                <Pagination defaultCurrent={1} total={+totalUsersCount} onChange={(pageNumber) => {
                    dispatch(setCurrentPage(pageNumber));
                }} current={+currentPage} pageSize={+pageSize} showSizeChanger={false} />
            </div>
            <div>
                <SearchBoxFriends filter={filter}/>
            </div>
            <div>
                {Array.isArray(users) && users.map((user: friendsItemType) => {
                    return <FriendsItem followingInProgress={followingInProgress} user={user} />
                })}
            </div>
        </div>
    )
}

export default Friends;