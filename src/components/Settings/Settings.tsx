import React, { useState } from "react";
import user from "./../../assets/Profile/usersProfileIcon.png"
import { setNewCurrentUsersPhoto } from "../../redux/authSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { Input } from "@nextui-org/react";
import { setStatusProfile } from "../../redux/profileSlice";


const Settings: React.FC = () => {
    const [currentUserPhoto, status] = useSelector((state: RootState) => [state.Auth.currentProfileImage.large, state.Profile.status])

    const [photo, setPhoto] = useState<File>();
    const dispatch = useAppDispatch();
    const [newStatus, setNewStatus] = useState<string>(status)


    return <div>
        <div>
            <img className="h-[150px] w-[150px] rounded-full" src={currentUserPhoto || user} alt={"User's avatar"} />
        </div>
        <div>
            <input type="file" onChange={e => e.target.files && setPhoto(e.target.files[0])} />
            <div>
                <button onClick={() => {
                    dispatch(setNewCurrentUsersPhoto(photo));
                }}>Update
                </button>
            </div>
        </div>
        <div>
            <div>
                FullName: <input />
            </div>
            <div>
                Status: <Input placeholder={status} value={newStatus} onChange={(e) => setNewStatus(e.target.value)} onBlur={() => dispatch(setStatusProfile(newStatus))} />
            </div>
            <div>
                Nickname: flofeyka <button>Change nickname</button>
            </div>
        </div>
        <div>
            <div>
                E-mail: <input />
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
