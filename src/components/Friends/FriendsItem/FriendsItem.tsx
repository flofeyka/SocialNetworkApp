import { NavLink } from 'react-router-dom';
import usersIcon from "../../../assets/Profile/usersProfileIcon.png";
import { friendsItemType } from "../../../types/types";
import { useAppDispatch } from "../../../redux/ReduxStore";
import { Follow, unFollow } from "../../../redux/FriendsReducer";
import { Button } from '@nextui-org/react';

type Props = {
    followingInProgress: any
    user: friendsItemType
}

function FriendsItem({ user, ...props }: Props) {
    const dispatch = useAppDispatch();

    return <div className="flex w-[650px] justify-center bg-white p-4 rounded-2xl shadow-xl mb-2">
        <div className="flex flex-col w-[100px]">
            <div>
                <NavLink to={"/user/" + user.id}>
                    <img src={usersIcon || user.photos.small} alt="" className="flex-wrap min-h-[30px] max-h-[100px] min-w-[20px] max-w-[100px] mb-1" />
                </NavLink>
            </div>
            {user.followed
                ?
                <Button variant="bordered" disabled={props.followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                        dispatch(unFollow(user.id));
                    }}>Отписаться</Button>
                :
                <Button variant="bordered" disabled={props.followingInProgress.some((id: number) => id === user.id)}
                    onClick={() => {
                        dispatch(Follow(user.id));
                    }}>Подписаться</Button>
            }
        </div>
        <div className="basis-92 grow ml-[15px]">
            <div className="font-bold text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                {user.name || "Неизвестный пользователь"}
            </div>
            <div className="w-[200px] mt-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                {user.status || "Статус отсутствует :)"}
            </div>
        </div>
    </div>
}

export default FriendsItem;