import React from 'react';
import "./Interections.css";
import { Button } from '@nextui-org/react';
import { useAppDispatch } from '../../../redux/store';
import { setLike } from '../../../redux/profileSlice';

type Props = {
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
                <Button size="sm" onClick={() => {
                    dispatch(setLike(props.postId))
                }}>Лайк {props.likesCount}</Button>
            </span>
        </span>
        <span>
            <Button size="sm" variant="faded" onClick={() => {
                props.setAnswerMode(!props.answerMode ? true : false)
            }}>Ответить</Button>
        </span>
        <span>
            <Button size="sm">Поделиться</Button>
        </span>
    </div>
}

export default PostInterections;