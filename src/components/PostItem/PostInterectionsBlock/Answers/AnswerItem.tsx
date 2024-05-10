import { FC, memo, useState } from 'react';
import user from "../../../../assets/Profile/usersProfileIcon.png";
import { useDispatch } from "react-redux";
import AnswerInterections from "./AnswerInterectionsBlock/AnswerInterections";
import { answersType } from '../../../../types/types';
import { acceptAnswerChanges } from '../../../../redux/postsSlice';
// import details from "../../../../../../assets/AdditionalyPhoto.png"


type Props = {
    answer: answersType
    currentUserId: number | null
    postId: number
}

const AnswerItem: FC<Props> = ({ answer, currentUserId, postId }) => {
    const [editMode, setEditMode] = useState(false);
    const [answerMessage, setAnswerMessage] = useState(answer.answerMessage);
    const dispatch = useDispatch();

    return <div key={answer.id} className="bg-[white] mb-1 mt-1 border-[none] flex w-[500px] mb-[5px] p-2.5 rounded-[15px]">
        <div>
            <img className="w-[50px] h-[50px] justify-center rounded-[100%] border-solid border-[black] border-[1px]"
                src={answer.usersImage || user} alt="" />
        </div>
        <div className="basis-[250px] grow ml-[7px]">
            <div className="font-bold text-[15px]">
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
                <div className="max-w-[400px] mt-[5px]">
                    {answer.answerMessage}
                </div>
            }
            <span>
                <AnswerInterections answerId={answer.id} likesCount={answer.likesCount} postId={postId} />
            </span>
        </div>
    </div>
}

export default memo(AnswerItem);