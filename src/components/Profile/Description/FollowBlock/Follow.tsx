import { FC } from "react";
import { Follow, unFollow } from "../../../../redux/ProfileReducer";
import { useAppDispatch } from "../../../../redux/ReduxStore";
import { Button } from "@nextui-org/react";


const FollowBlock: FC<{ LinkedUserId: number; isFollowing: boolean; followingInProgress: boolean }> = (props) => {
    const dispatch = useAppDispatch();

    return <div className="mt-1">
        {!props.isFollowing
            ? <Button className="min-w-[125px]" size="lg" variant="faded" onClick={() => dispatch(Follow(props.LinkedUserId))}
                disabled={props.followingInProgress}>Подписаться
            </Button>
            :
            <Button className="min-w-[125px]" size="lg" variant="faded" onClick={() => dispatch(unFollow(props.LinkedUserId))
            } disabled={props.followingInProgress}>Отписаться
            </Button>
        }
    </div>
}

export default FollowBlock;