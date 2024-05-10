import * as Yup from "yup";
import { Button } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import { TextareaAutosize } from '@mui/material';
import { FC } from "react";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { addPost } from "../../../redux/postsSlice";


const CreatePost: FC = () => {
    const dispatch = useAppDispatch();
    const [fullName, currentProfileImage, userId] = useSelector((state: RootState) => 
        [
            state.Auth.login, 
            state.Auth.currentProfileImage.small,
            state.Auth.userId
        ]
    );

    const {register, handleSubmit, reset} = useForm<{message: string}>({
        resolver: yupResolver(Yup.object().shape({
            message: Yup.string().trim().required()
        }))
    });
    const onSubmit = (data: {message: string}) => {
        dispatch(addPost({userId, fullName, currentProfileImage: currentProfileImage, NewPostMessage: data.message}));
        reset();
    }


    return <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center">
        <div className='flex items-center mb-2 max-w-[700px] min-w-[300px]'>
                <TextareaAutosize className="min-h-[40px] .placeholder-opacity-100  min-w-[300px] max-w-[700px] text-2xl overflow-hidden rounded-xl border-solid border-2 border-black resize-none" placeholder={"Что у вас нового?"}
                    {...register("message", {required: true})} />
            <Button type="submit" variant="faded" className="bg-white mx-3">Отправить</Button>
        </div>
    </form>
}

export default CreatePost;