import { FC, memo, useState } from 'react';
import styles from "./AnswerItem.module.css";
import user from "../../../../../../assets/Profile/usersProfileIcon.png";
import { acceptAnswerChanges } from "../../../../../../redux/ProfileReducer";
import { useDispatch } from "react-redux";
import AnswerInterections from "./AnswerInterectionsBlock/AnswerInterections";
import { answersType } from "../../../../../../types/types";
import details from "../../../../../../assets/AdditionalyPhoto.png"


type Props = {
    answer: answersType
    currentUserId: number | null
    answerMode: boolean
    postId: number
    setAnswerMode: any
}

const AnswerItem: FC<Props> = ({ answer, currentUserId, answerMode, postId, setAnswerMode }) => {
    const [editMode, setEditMode] = useState(false);
    const [answerMessage, setAnswerMessage] = useState(answer.answerMessage);
    const dispatch = useDispatch();

    return <div key={answer.id} className={styles.answerItem}>
        <div className={styles.imageBlock}>
            <img className={styles.answerImg}
                src={answer.usersImage || user} alt="" />
        </div>
        <div className={styles.commentBlock}>
            <div className={styles.fullName}>
                {answer.answerName}
                <span className={styles.detailsBlock}>
                    <button className={styles.details}><img src={details} alt="details"/></button>
                </span>
            </div>
            {editMode && currentUserId === answer.userId ? <div>
                <input value={answerMessage} onChange={(event) => {
                    setAnswerMessage(event.target.value)
                }} autoFocus={true} />
                <button onClick={() => {
                    dispatch(acceptAnswerChanges({ answerId: answer.id, newMessage: answerMessage, postId: postId }));
                    setEditMode(false)
                }}>Принять</button>
            </div> :
                <div className={styles.answerMessage}>
                    {answer.answerMessage}
                </div>
            }
            <span>
                <AnswerInterections answerMode={answerMode} setAnswerMode={setAnswerMode}
                    answerId={answer.id} likesCount={answer.likesCount} postId={postId} />
            </span>
        </div>
    </div>
}

export default memo(AnswerItem);