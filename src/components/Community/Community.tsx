import styles from "./Community.module.css";
import {useSelector} from "react-redux";
import {setFollow} from "../../redux/CommunityReducer";
import CommunityItem from "./CommunityItem/CommunityItem";
import {RootState, useAppDispatch} from "../../redux/ReduxStore";


function Community() {
    const Communities = useSelector((state: RootState) => state.CommunityPage.Communities);
    const dispatch = useAppDispatch();

    return <div className={styles.CommunityContainer}>
        {Communities.map((item: any) => {
            return <CommunityItem CommunityName={item.CommunityName} Description={item.Description}
                                  CommunitiesPhoto={item.CommunitiesPhoto} isFollowed={item.isFollowed}
                                  id={item.id} setFollow={(id: number, isFollowed: boolean) => {
                                      dispatch(setFollow({id, isFollowed}))
                                  }} SubscribesValue={item.SubscribesValue}/>
        })
        }
    </div>
}

export default Community;