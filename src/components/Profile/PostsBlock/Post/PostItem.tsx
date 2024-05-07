import { FC, memo, useState } from "react";
import { NavLink } from "react-router-dom";
import AnswerItem from "./PostInterectionsBlock/Answers/AnswerItem";
import AddingNewAnswer from "./PostInterectionsBlock/Answers/AddingNewAnswer/AddingNewAnswer";
import PostInterections from "./PostInterectionsBlock/PostInterections";
import user from "../../../../assets/Profile/usersProfileIcon.png";
import details from "../../../../assets/AdditionalyPhoto.png";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { answersType, postItemType } from "../../../../types/types";

type Props = {
  post: postItemType;
  setOpenPost: any;
  openPost: boolean;
};

const PostItem: FC<Props> = ({ post, setOpenPost, openPost }) => {
  const currentUserId = useSelector(
    (state: RootState) => state.AuthPage.userId
  );

  const [answerMode, setAnswerMode] = useState<boolean>(false);

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
          <div
            className="text-[17px] mt-2.5"
            onClick={() => {
              setOpenPost(true);
            }}
          >
            {post.postMessage}
          </div>
          <PostInterections
            postId={post.id}
            likesCount={post.likesCount}
            answerMode={answerMode}
            setAnswerMode={(answerMode: boolean) => {
              setAnswerMode(answerMode);
            }}
          />
        </div>
      </div>
      <div>
        {/* <div>
          {post.answers.map((answer: answersType) => {
            return (
              <AnswerItem
                currentUserId={currentUserId}
                setAnswerMode={(editMode: boolean) => setAnswerMode(editMode)}
                answerMode={answerMode}
                postId={post.id}
                answer={answer}
              />
            );
          })}
        </div>
        <div>{answerMode && <AddingNewAnswer postId={post.id} />}</div> */}
      </div>
    </div>
  );
};

export default memo(PostItem);
