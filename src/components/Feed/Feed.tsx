import {useEffect} from "react"
import Posts from "./Posts/Posts";
import {useSelector} from "react-redux";
import {setCurrentPhoto} from "../../redux/AuthReducer";
import {RootState, useAppDispatch} from "../../redux/ReduxStore";

export default function Feed() {
    const [FeedPosts, userId] = useSelector((state: RootState) => [state.FeedPage.FeedPosts, state.AuthPage.userId]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCurrentPhoto(userId));
    }, [userId]);

    return (
        <div className="text-xl cursor-pointer m-[15px]">
            <Posts FeedPosts={FeedPosts}/>
        </div>
    )
}