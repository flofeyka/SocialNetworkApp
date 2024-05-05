import { addPost } from "../../../../../redux/profileSlice";
import { useFormik } from "formik";
import { RootState, useAppDispatch } from "../../../../../redux/store";
import * as Yup from "yup";
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { TextareaAutosize } from '@mui/material';
import { FC } from "react";


const AddingNewPost: FC = () => {
    const dispatch = useAppDispatch();
    const [fullName, currentProfileImage, userId] = useSelector((state: RootState) => 
        [
            state.AuthPage.login, 
            state.AuthPage.currentProfileImage.small,
            state.AuthPage.userId
        ]
    );

    let formik = useFormik({
        initialValues: {
            NewPostMessage: ""
        },
        validationSchema: Yup.object().shape({
            NewPostMessage: Yup.string().trim().required()
        }),
        onSubmit: values => {
            dispatch(addPost({userId, fullName, currentProfileImage: currentProfileImage, NewPostMessage: values.NewPostMessage}));
            values.NewPostMessage = "";
        }
    });


    return <form onSubmit={formik.handleSubmit} className="flex justify-center">
        <div className='flex items-center mb-2 max-w-[700px] min-w-[300px]'>
                <TextareaAutosize name={"NewPostMessage"} className="min-h-[40px] min-w-[300px] max-w-[700px] text-2xl overflow-hidden rounded-xl border-solid border-2 border-black resize-none" placeholder={"Что у вас нового?"}
                    onChange={formik.handleChange}
                    value={formik.values.NewPostMessage} />
            <Button type="submit" variant="faded" className="bg-white mx-3">Отправить</Button>
        </div>
    </form>
}

export default AddingNewPost;