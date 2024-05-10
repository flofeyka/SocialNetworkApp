import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import AboutMeEdit from "./AboutMeEdit/AboutMeEdit";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";



const AboutMeBlock: FC<{ LinkedUserId: number }> = ({ LinkedUserId }) => {
    const [fullName, aboutMe, lookingForAJob, lookingForAJobDescription, contacts,
        currentUserId] = useSelector((state: RootState) => [
            state.Profile.profileData.fullName,
            state.Profile.profileData.aboutMe,
            state.Profile.profileData.lookingForAJob,
            state.Profile.profileData.lookingForAJobDescription,
            state.Profile.profileData.contacts,
            state.Auth.userId
        ]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editMode, setEditMode] = useState<boolean>(false);


    return <div>
        <Button className="flex mt-3 h-[30px]" variant="faded" onClick={() => {
            !isOpen ? onOpen() : onClose();
        }}>Основные данные
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size="xl" className="p-4">
            <ModalContent>
                {!editMode && <div>
                    <div className="mb-4">
                        <h1 className="mb-2 font-bold">Основные данные</h1>
                        <li><b>Имя</b>: {fullName}</li>
                        <li><b>Пользовательская ссылка</b>: <NavLink
                            to={`/user/${LinkedUserId}`}>linkapp.com/user/{LinkedUserId}</NavLink></li>
                        <li><b>Уникальный айди</b>: {LinkedUserId}</li>
                        <li><b>Обо мне</b>: <span>{aboutMe}</span></li>
                    </div>
                    {!lookingForAJob || <div>
                        <h3>Я ищу работу.</h3>
                        <li>{lookingForAJobDescription}</li>
                    </div>
                    }
                    <div>
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
}

export default AboutMeBlock;