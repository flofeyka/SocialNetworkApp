import { FC } from "react";
import styles from "./AddingNewAnswer.module.css";
import user from "../../../../../../../assets/Profile/usersProfileIcon.png";
import {answerComment} from "../../../../../../../redux/ProfileReducer";
import {useFormik} from "formik";
import * as Yup from "yup";
import { RootState, useAppDispatch } from "../../../../../../../redux/ReduxStore";
import { useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";


const AddingNewAnswer: FC<{postId: number}> = ({postId}) => {
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

    return <form onSubmit={formik.handleSubmit}>
        <div className="flex">
            <span>
            <img className={styles.inputAnswerImg}
                 src={image || user} alt="" />
            </span>
            <span>
                <Input name={"answerMessage"} className={styles.inputAnswer} autoFocus={true}
                       onChange={formik.handleChange} value={formik.values.answerMessage}/>
            </span>
            <Button type="submit" className={styles.answerButton}>Send</Button>
        </div>
    </form>
}

export default AddingNewAnswer;