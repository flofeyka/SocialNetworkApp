import React from 'react';
import "./Interections.css";
import { Button } from '@nextui-org/react';
import { useAppDispatch } from '../../../redux/store';
import { setLike } from '../../../redux/postsSlice';

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    postId: number
    likesCount: number
    answerMode: boolean
    setAnswerMode: any
}

function PostInterections(props: Props) {
    const dispatch = useAppDispatch();

    return <div className="interectionsBlock">
        <span>
            <span>
                <Button size="sm" onClick={() => dispatch(setLike(props.postId))}>Лайк {props.likesCount}</Button>
            </span>
        </span>
        <span>
            <Button size="sm" variant="faded" onClick={() => props.setOpen(true)}>Комментарии</Button>
        </span>
        <span>
            <Button size="sm">Поделиться</Button>
        </span>
    </div>
}

export default PostInterections;