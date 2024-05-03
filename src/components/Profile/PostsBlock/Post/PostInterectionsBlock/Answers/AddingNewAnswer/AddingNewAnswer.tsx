import { FC } from "react";
import styles from "./AddingNewAnswer.module.css";
import user from "../../../../../../../assets/Profile/usersProfileIcon.png";
import {answerComment} from "../../../../../../../redux/ProfileReducer";
import {useFormik} from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch } from "../../../../../../../redux/ReduxStore";
import { useSelector } from "react-redux";


const AddingNewAnswer:FC<{postId: number}> = ({postId}) => {
    const [currentUserId, name, image] = useSelector((state: RootState) => [
        state.AuthPage.userId,
        state.AuthPage.currentUserName,
        state.AuthPage.currentProfileImage.large
    ])
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            answerMessage: ""
        },
        validationSchema: Yup.object().shape({
            answerMessage: Yup.string().trim().required()
        }),
        onSubmit: values => {
            dispatch(answerComment({
                id: postId, userId: currentUserId, name,
                image, message: values.answerMessage
            }
        ));
            values.answerMessage = "";
        }
    })

    return <form className={styles.answerBlock} onSubmit={formik.handleSubmit}>
        <div className={styles.answerBlock}>
            <span>
            <img className={styles.inputAnswerImg}
                 src={image || user} alt="" />
            </span>
            <span>
                <input name={"answerMessage"} className={styles.inputAnswer} autoFocus={true}
                       onChange={formik.handleChange} value={formik.values.answerMessage}/>
            </span>
            <button className={styles.answerButton}>Send</button>
        </div>
    </form>
}

export default AddingNewAnswer;