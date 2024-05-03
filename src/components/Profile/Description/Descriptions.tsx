import { FC, memo, useEffect, useState } from "react";
import styles from "./Descriptions.module.css"
import user from "../../../assets/Profile/usersProfileIcon.png"
import { getFollowingData, getProfile, getStatus, setStatusProfile } from "../../../redux/ProfileReducer";
import FollowBlock from "./FollowBlock/Follow";
import AboutMeBlock from "./AboutMeBlock/AboutMe";
import { RootState, useAppDispatch } from "../../../redux/ReduxStore";
import { useSelector } from "react-redux";

const Descriptions: FC<{ LinkedUserId: number }> = ({ LinkedUserId }) => {
    const [fullName, currentUsersPhoto, isFollowing, currentUserId, followingInProgress,
        profileStatus] = useSelector((state: RootState) => [
            state.ProfilePage.profileData.fullName,
            state.ProfilePage.profileData.photos.large,
            state.ProfilePage.isFollowing,
            state.AuthPage.userId,
            state.ProfilePage.followingInProgress,
            state.ProfilePage.status
        ]);

    const [editMode, setEditMode] = useState<boolean>(false);
    const [status, setStatus] = useState<string>(profileStatus);
    console.log(status);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getStatus(LinkedUserId));
        dispatch(getFollowingData(+LinkedUserId));
        dispatch(getProfile(+LinkedUserId));
    }, [LinkedUserId, profileStatus, dispatch]);


    return <div className={styles.desc}>
        <div className={styles.Logo}>
            <img src={currentUsersPhoto || user} alt="" />
            <span>
                {LinkedUserId !== currentUserId ? <FollowBlock
                    LinkedUserId={LinkedUserId} isFollowing={isFollowing}
                    followingInProgress={followingInProgress} /> : null}
            </span>
        </div>
        <div className={styles.DescriptionContainer}>
            <div className={styles.name}>
                {fullName}
            </div>
            <span>
                {!editMode ? <div onDoubleClick={() => {
                    setEditMode(LinkedUserId === currentUserId);
                }} className={styles.status}>
                    {status}
                </div> : <div>
                    <input className={styles.inputStatus} onChange={event => { setStatus(event.target.value); }}
                        autoFocus={true} onBlur={() => {
                            setEditMode(false);
                            dispatch(setStatusProfile(status));
                        }} value={status}>
                    </input>
                </div>}
            </span>
            <span>
                <AboutMeBlock LinkedUserId={LinkedUserId} />
            </span>
        </div>
    </div>
}

export default memo(Descriptions);