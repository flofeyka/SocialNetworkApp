import { useEffect } from "react"
import Posts from "./Posts/Posts";
import { useSelector } from "react-redux";
import { getCurrentLogo } from "../../redux/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";

export default function Feed() {
    const [FeedPosts, userId] = useSelector((state: RootState) => [state.FeedPage.FeedPosts, state.AuthPage.userId]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentLogo());
    }, [userId, dispatch]);

    return (
        <div className="text-xl cursor-pointer m-[15px]">
            <Posts FeedPosts={FeedPosts} />
        </div>
    )
}