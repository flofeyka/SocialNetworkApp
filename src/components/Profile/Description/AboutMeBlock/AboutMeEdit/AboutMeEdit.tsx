import React, { FC, useState } from 'react';
import { editProfile } from '../../../../../redux/ProfileReducer';
import { useAppDispatch } from "../../../../../redux/ReduxStore";
import { contactsType, profileDataType } from "../../../../../types/types";
import { useFormik } from "formik";
import styles from "./aboutMeEdit.module.css";


type Props = {
    fullName: string
    aboutMe: any
    lookingForAJob: boolean
    lookingForAJobDescription: any
    contacts: any
    editMode: boolean
    setEditMode: any
    currentUserId: number
    LinkedUserId: number
}

const AboutMeEdit: FC<Props> = ({ editMode, setEditMode, ...props }) => {
    const dispatch = useAppDispatch();
    const [editSocialMode, setEditSocialMode] = useState(false)


    const formik = useFormik({
        initialValues: {
            fullName: props.fullName,
            aboutMe: props.aboutMe,
            lookingForAJob: props.lookingForAJob,
            lookingForAJobDescription: props.lookingForAJobDescription,
            contacts: props.contacts,
        },
        onSubmit: values => {
            dispatch(editProfile(values));
            setEditMode(false);
        }
    });
    return <div className={styles.beforeAboutMeContainer}>
        {editMode && <form onSubmit={formik.handleSubmit}>
            <h4>Основные данные</h4>
            <li><b>Имя</b>: <input name={"fullName"} id={"fullName"} placeholder={"Имя"}
                onChange={formik.handleChange}
                value={formik.values.fullName} /></li>
            <li><b>Обо мне</b>: <input name="aboutMe" id={"aboutMe"} placeholder="Обо мне"
                onChange={formik.handleChange}
                value={formik.values.aboutMe} /></li>
            <h4>Ищу работу: </h4>
            <div>
                <input name={"lookingForAJob"} type={"checkbox"} onChange={formik.handleChange}
                    checked={formik.values.lookingForAJob} />Я ищу работу
            </div>
            <div>
                <textarea name={"lookingForAJobDescription"} placeholder={"Описание"} onChange={formik.handleChange}
                    value={formik.values.lookingForAJobDescription} />
            </div>
            {editSocialMode ? <span><span>
                <h4>Другие социальные сети</h4>
                {Object.keys(props.contacts).map((item: any) => {
                    return <li key={item}><b>{item}</b>: <input placeholder={item} id={item} name={`contacts.${item}`}
                        value={formik.values.contacts[item]}
                        onChange={formik.handleChange} /></li>
                })}
            </span><button onClick={() => {
                setEditSocialMode(false);
            }}>Свернуть</button></span>
                : <div><h4>Другие социальные сети: <button onClick={() => { setEditSocialMode(true) }}>Развернуть</button></h4></div>}
            <span>
                <button>Принять</button>
            </span>
        </form>
        }
        {props.currentUserId === props.LinkedUserId && !editMode && <button onClick={() => {
            setEditMode(true);
        }}>Редактировать</button>}
    </div>
}

export default AboutMeEdit;