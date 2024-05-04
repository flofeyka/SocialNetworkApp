import { NavLink } from "react-router-dom";
import user from "../../../../assets/Profile/usersProfileIcon.png"
// import details from "../../../../assets/AdditionalyPhoto.png"
import { FeedPostItemType } from "../../../../types/types";
import { FC } from "react";


const PostItem: FC<{ post: FeedPostItemType, setOpenPost: (openPost: boolean) => void }> = ({ post, setOpenPost }) => {
    return (
        <div className="text-[15px] flex border w-[550px] min-h-[100px] max-h-[400px] overflow-hidden text-ellipsis bg-[white] break-all mb-2.5 p-2.5 rounded-[10px] border-[solid]">
            <div>
                <img src={post.usersPhoto || user} alt="" className="h-[80px] w-[80px] rounded-full border-1 border-solid border-black" />
            </div>
            <div className="basis-[250px] grow ml-[15px]">
                <div>
                    <NavLink to={`/user/${post.userId}`}>
                        <div className="font-bold text-[25px] inline-block text-black">
                            {post.fullName}
                        </div>
                    </NavLink>
                    {/* <span className={styles.detailsBlock}>
                        <button className={styles.details}><img src={details} alt="details"/></button>
                    </span> */}
                </div>
                <div className="text-[17px] mt-2.5" onClick={() => {
                    setOpenPost(true);
                }}>
                    {post.postMessage}
                </div>
            </div>
        </div>
    )
}

export default PostItem;