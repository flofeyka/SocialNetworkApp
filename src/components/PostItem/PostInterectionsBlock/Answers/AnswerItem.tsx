import { FC, memo, useState } from 'react';
import user from "../../../../assets/Profile/usersProfileIcon.png";
import { useDispatch } from "react-redux";
import AnswerInterections from "./AnswerInterectionsBlock/AnswerInterections";
import { answersType } from '../../../../types/types';
import { acceptAnswerChanges } from '../../../../redux/profileSlice';
// import details from "../../../../../../assets/AdditionalyPhoto.png"


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

    return <div key={answer.id} className="bg-[white] border flex w-[575px] mb-[5px] p-2.5 border-t-black border-b-black">
        <div>
            <img className="w-[70px] h-[70px] justify-center rounded-[100%] border-solid border-[black] border-[1px]"
                src={answer.usersImage || user} alt="" />
        </div>
        <div className="basis-[250px] grow ml-[7px]">
            <div className="font-bold text-[20px]">
                {answer.answerName}
                {/* <span className={styles.detailsBlock}>
                    <button className={styles.details}><img src={details} alt="details"/></button>
                </span> */}
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
                <div className="max-w-[500px] mt-[5px]">
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