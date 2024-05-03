import styles from './AddNewPost.module.css'
import { useSelector } from "react-redux";
import { addPost } from "../../../../redux/ProfileReducer";
import { addPostFeed } from "../../../../redux/FeedReducer";
import { RootState, useAppDispatch } from "../../../../redux/ReduxStore";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { TextareaAutosize } from '@mui/material';
import { Button } from '@nextui-org/react';


function AddNewPost() {
    const [userId, usersPhoto, fullName] = useSelector((state: RootState) => [
        state.AuthPage.userId,
        state.AuthPage.currentProfileImage.large,
        state.AuthPage.login]);
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            NewPostMessage: ""
        },
        validationSchema: Yup.object().shape({
            NewPostMessage: Yup.string().trim().required()
        }),
        onSubmit: (values: any) => {
            dispatch(addPost({
                userId, fullName, currentProfileImage: usersPhoto,
                NewPostMessage: values.NewPostMessage, likesCount: 0, isLiked: false
            }));
            dispatch(addPostFeed({ fullName: fullName, usersPhoto: usersPhoto, postText: values.NewPostMessage, userId: userId }));
        }
    })



    return <form onSubmit={formik.handleSubmit}>
        <div className={styles.NewPostBlock}>
            <span>
                <TextareaAutosize name={"NewPostMessage"} className={styles.NewPost}
                    placeholder='Что у вас нового?' value={formik.values.NewPostMessage} onChange={formik.handleChange}/>
            </span>
            <span>
                <Button type="submit" variant="faded" className="h-[30px] bg-white flex m-[5px]">
                    Отправить
                </Button>
            </span>
        </div>
    </form>
}

export default AddNewPost;