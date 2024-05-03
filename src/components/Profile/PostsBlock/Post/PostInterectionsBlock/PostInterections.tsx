import React from 'react';
import styles from "./PostInterections.module.css";
import {setLike} from "../../../../../redux/ProfileReducer";
import {useAppDispatch} from "../../../../../redux/ReduxStore";
import { Button } from '@nextui-org/react';

type Props = {
    postId: number
    likesCount: number
    answerMode: boolean
    setAnswerMode: any
}

function PostInterections(props: Props) {
    const dispatch = useAppDispatch();

    return <div className={styles.interectionsBlock}>
        <span>
            <span>
                <Button size="sm" className={styles.isLikedButton} onClick={() => {
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