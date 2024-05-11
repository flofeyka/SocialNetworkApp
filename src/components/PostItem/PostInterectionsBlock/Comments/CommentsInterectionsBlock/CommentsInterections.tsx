import {useDispatch} from "react-redux";
import { Button } from "@nextui-org/react";
import "../../Interections.css"
import { FC } from "react";
import { setLikeAnswer } from "../../../../../redux/postsSlice";

type Props = {
    answerId: number;
    postId: number;
    likesCount: number;
}

const CommentsInterections: FC<Props> = (props) => {
    const dispatch = useDispatch();
    return <div className="interectionsBlock">
        <span>
            <Button size="sm" onClick={() => {
                dispatch(setLikeAnswer({answerId: props.answerId, postId: props.postId}));
            }}>Лайк {props.likesCount}</Button>
        </span>
        <span>
            <Button size="sm">Ответить</Button>
        </span>
        <span>
            <Button size="sm">Поделиться</Button>
        </span>
    </div>
}

export default CommentsInterections;