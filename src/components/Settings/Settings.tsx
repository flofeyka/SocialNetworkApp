import React, {useState} from "react";
import styles from "./Settings.module.css"
import user from "./../../assets/Profile/usersProfileIcon.png"
import {setNewCurrentUsersPhoto} from "../../redux/AuthReducer";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../redux/ReduxStore";
import { Input } from "@nextui-org/react";
import { setStatusProfile } from "../../redux/ProfileReducer";


const Settings: React.FC = () => {
    const [currentUserPhoto, status] = useSelector((state: RootState) => [state.AuthPage.currentProfileImage.large, state.ProfilePage.status])

    const [photo, setPhoto] = useState<File>();
    const dispatch = useAppDispatch();
    const [newStatus, setNewStatus] = useState<string>(status)


    function getCurrentPhoto(event: any) {
        setPhoto(event.target.files)
    }

    return <div>
        <div>
            <div>
                <img className={styles.usersPhoto} src={currentUserPhoto || user} alt={"User's avatar"}/>
            </div>
            <div>
                <input type={"file"} onChange={getCurrentPhoto}/>
                <div>
                    <button onClick={() => {
                        dispatch(setNewCurrentUsersPhoto(photo));
                    }}>Update
                    </button>
                </div>
            </div>
        </div>
        <div className={styles.UsersDescriptionBlock}>
            <div>
                FullName: <input/>
            </div>
            <div>
                Status: <Input placeholder={status} value={newStatus} onChange={(e) => setNewStatus(e.target.value)} onBlur={() => dispatch(setStatusProfile(newStatus))}/>
            </div>
            <div>
                Nickname: flofeyka <button>Change nickname</button>
            </div>
        </div>
        <div>
            <div>
                E-mail: <input/>
            </div>
            <div>
                <button>Change</button>
            </div>
            <div>
                Password: <button>Change Password</button>
            </div>
        </div>

    </div>
}

export default Settings;
