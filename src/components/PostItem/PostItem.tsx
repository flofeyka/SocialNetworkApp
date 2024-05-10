import { NavLink } from "react-router-dom";
import PostInterections from "./PostInterectionsBlock/PostInterections";
import { postItemType } from "../../types/types";
import user from "../../assets/Profile/usersProfileIcon.png";
import details from "../../assets/AdditionalyPhoto.png";
import { FC, memo, useState } from "react";
import PostModal from "./PostModal/PostModal";

type Props = {
  post: postItemType;
};

const PostItem: FC<Props> = ({ post }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div key={post.id}>
      <div className="text-[15px] flex border w-[580px] shadow-xl border-[none] min-h-[100px] max-h-[400px] overflow-hidden text-ellipsis bg-[white] break-all mb-2.5 p-2.5 rounded-[15px]">
        <div>
          <img
            src={post.usersPhoto || user}
            alt=""
            className="w-[80px] h-[80px] rounded-full border-1 border-solid border-black"
          />
        </div>
        <div className="basis-[250px] grow ml-[15px]">
          <div>
            <NavLink to={`/user/${post.userId}`}>
              <div className="font-bold text-[25px] inline-block text-[black]">
                {post.fullName}
              </div>
            </NavLink>
            <span>
              <button className="block clear-right float-right h-[20px] w-[20px] rounded-[10px] border-[none] hover:transition-all hover:duration-[0.3s] hover:ease-linear">
                <img src={details} alt="details" />
              </button>
            </span>
          </div>
          <div className="text-[17px] mt-2.5">{post.postMessage}</div>
          <PostInterections
            open={open}
            setOpen={(open: boolean) => setOpen(open)}
            postId={post.id}
            likesCount={post.likesCount}
          />
        </div>
        <div>
            <PostModal postMessage={post.postMessage} open={open} postId={post.id} answers={post.answers} likesCount={post.likesCount} 
            isLiked={post.isLiked} setOpen={(open: boolean) => setOpen(open)} usersPhoto={post.usersPhoto}
            fullName={post.fullName}/>
        </div>
      </div>
      
    </div>
  );
};

export default memo(PostItem);
