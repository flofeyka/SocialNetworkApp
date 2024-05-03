import React from 'react';
import styles from "./NewPost.module.css";
import {addPost} from "../../../../../redux/ProfileReducer";
import {useFormik} from "formik";
import {RootState, useAppDispatch} from "../../../../../redux/ReduxStore";
import * as Yup from "yup";
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { TextareaAutosize } from '@mui/material';


function AddingNewPost(props: any) {
    const dispatch = useAppDispatch();
    const [currentFullName, currentProfileImage] = useSelector((state: RootState) => [state.AuthPage.login, state.AuthPage.currentProfileImage]);

    let formik = useFormik({
        initialValues: {
            NewPostMessage: ""
        },
        validationSchema: Yup.object().shape({
            NewPostMessage: Yup.string().trim().required()
        }),
        onSubmit: values => {
            dispatch(addPost({
                userId: props.currentUserId, fullName: currentFullName,
                currentProfileImage: currentProfileImage.small, NewPostMessage: values.NewPostMessage,
                likesCount: 0, isLiked: false
            }));
            values.NewPostMessage = "";
        }
    });


    return <form onSubmit={formik.handleSubmit} className={styles.newPostContainer}>
        <div className='flex items-center mb-2'>
            <TextareaAutosize name={"NewPostMessage"} className={styles.newpost} placeholder={"Что у вас нового?"}
                   onChange={formik.handleChange}
                   value={formik.values.NewPostMessage}/>
            <Button type="submit" variant="faded" className="bg-white mx-3">Отправить</Button>
        </div>

    </form>
}

export default AddingNewPost;