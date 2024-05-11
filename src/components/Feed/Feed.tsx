import Posts from "./Posts/Posts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Feed() {
    const FeedPosts = useSelector((state: RootState) => state.Posts.FeedPosts);

    return (
        <div className="text-xl cursor-pointer m-[15px]">
            <Posts FeedPosts={FeedPosts} />
        </div>
    )
}