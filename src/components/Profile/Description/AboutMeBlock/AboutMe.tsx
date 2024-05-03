import styles from "./AboutMe.module.css";
import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import AboutMeEdit from "./AboutMeEdit/AboutMeEdit";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/ReduxStore";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";



const AboutMeBlock: FC<{ LinkedUserId: number }> = ({ LinkedUserId }) => {
    const [fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts,
        currentUserId] = useSelector((state: RootState) => [
            state.ProfilePage.profileData.fullName,
            state.ProfilePage.profileData.aboutMe,
            state.ProfilePage.profileData.lookingForAJob,
            state.ProfilePage.profileData.lookingForAJobDescription,
            state.ProfilePage.profileData.contacts,
            state.AuthPage.userId
        ]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editMode, setEditMode] = useState<boolean>(false);


    return <div className={styles.AboutMeBlock}>
        <div>
            <Button className="flex" onClick={() => {
                !isOpen ? onOpen() : onClose();
            }}>Основные данные
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" className="p-4">
                <ModalContent>
                    {!editMode && <div>
                        <div className="mb-4">
                            <h3>Основные данные</h3>
                            <li><b>Имя</b>: {fullName}</li>
                            <li><b>Пользовательская ссылка</b>: <NavLink
                                to={`/user/${LinkedUserId}`}>linkapp.com/user/{LinkedUserId}</NavLink></li>
                            <li><b>Уникальный айди</b>: {LinkedUserId}</li>
                            <li><b>Обо мне</b>: <span className={styles.aboutMeText}>{aboutMe}</span></li>
                        </div>
                        {!lookingForAJob || <div>
                            <h3>Я ищу работу.</h3>
                            <li>{lookingForAJobDescription}</li>
                        </div>
                        }
                        <div className={styles.contacts}>
                            {/* {Object.keys(contacts).every(item => !item) && <div className={styles.otherSocial}>
                                            <h3>Другие социальные сети</h3>
                                            {Object.keys(contacts).map(item => {
                                                if (contacts[item] != null) return <li key={item}><b>{item}</b>: <a
                                                    href={"https://" + contacts[item]}>{contacts[item]}</a></li>
                                                return null;
                                            })}
                                        </div>
                                        } */}
                        </div>
                        {currentUserId === LinkedUserId && <Button className="mt-3" onClick={() => {
                            setEditMode(true)
                        }}>Редактировать
                        </Button>
                        }

                    </div>}
                    {editMode && <AboutMeEdit contacts={contacts} fullName={fullName} aboutMe={aboutMe} lookingForAJob={lookingForAJob}
                        lookingForAJobDescription={lookingForAJobDescription} currentUserId={currentUserId} LinkedUserId={LinkedUserId}
                        editMode={editMode} setEditMode={(editMode: boolean) => {
                            setEditMode(editMode)
                        }} />}
                </ModalContent>
            </Modal>
        </div>
    </div>
}

export default AboutMeBlock;