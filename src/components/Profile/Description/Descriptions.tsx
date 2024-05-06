import { FC, memo, useEffect, useState } from "react";
import user from "../../../assets/Profile/usersProfileIcon.png"
import { getFollowingData, getProfile, getStatus, setStatusProfile } from "../../../redux/profileSlice";
import FollowBlock from "./FollowBlock/Follow";
import AboutMeBlock from "./AboutMeBlock/AboutMe";
import { RootState, useAppDispatch } from "../../../redux/store";
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
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getStatus(LinkedUserId));
        dispatch(getFollowingData(+LinkedUserId));
        dispatch(getProfile(+LinkedUserId));
    }, [LinkedUserId, isFollowing, profileStatus, dispatch]);


    return <div className="apply align-top text-xl flex flex-wrap p-6 justify-center bg-[white] p-[15px] rounded-[15px] shadow-xl">
        <div className="w-[150px]">
            <img className="w-[130px] h-[130px] rounded-full" src={currentUsersPhoto || user} alt="" />
            <span>
                {LinkedUserId !== currentUserId ? <FollowBlock
                    LinkedUserId={LinkedUserId} isFollowing={isFollowing}
                    followingInProgress={followingInProgress} /> : null}
            </span>
        </div>
        <div className="basis-[250px] grow-[2] mt-[-5px] ml-[15px] hover:transition-all">
            <div className="text-[35px] font-bold inline align-top mb-2.5">
                {fullName}
            </div>
            <span>
                {!editMode ? <div onDoubleClick={() => {
                    setEditMode(LinkedUserId === currentUserId);
                }} className="text-xl mt-[10px]">
                    {profileStatus}
                </div> : <div>
                    <input className="text-xl h-[25px] w-full rounded-[15px]" placeholder={profileStatus} onChange={event => setStatus(event.target.value)}
                        autoFocus={true} onBlur={() => {
                            setEditMode(false);
                            dispatch(setStatusProfile(status));
                        }} value={status}>
                    </input>
                </div>}
            </span>
            <span className="mt-[10px]">
                <AboutMeBlock LinkedUserId={LinkedUserId} />
            </span>
        </div>
    </div>
}

export default memo(Descriptions);