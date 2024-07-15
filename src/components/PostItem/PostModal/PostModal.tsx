import { FC } from "react";
import AnswerItem from "../PostInterectionsBlock/Comments/CommentsItem";
import AddingNewAnswer from "../PostInterectionsBlock/Comments/AddComment/AddComment";
import user from "../../../assets/Profile/usersProfileIcon.png";
import { answersType } from "../../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Like from "../PostInterectionsBlock/InterectionElements/Like";
import Share from "../PostInterectionsBlock/InterectionElements/Share";

type Props = {
  postId: number;
  answers: answersType[];
  likesCount: number;
  setOpen: (open: boolean) => void;
  open: boolean;
  usersPhoto: string | null;
  isLiked: boolean;
  fullName: string;
  postMessage: string;
};

const PostModal: FC<Props> = (props) => {
  const currentUserId = useSelector(
    (state: RootState) => state.Auth.userId
  );
  return (
    <div>
      {props.open && (
        <div className="w-screen h-screen fixed z-50 bg-[rgba(0,0,0,0.5)] top-0 left-0 flex justify-center items-center overflow-y-auto	">
          <div className="min-h-[300px] max-h-[100vh] max-w-[500px] break-words">
            <div className="bg-[white] rounded-[15px] p-3.5">
              {/* <div>
                <button
                  type="button"
                  className="w-[25px] h-[25px]"
                  onClick={() => props.setOpen(false)}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div> */}
              <div className="flex">
                <img alt="usersIcon"
                  className="flex rounded-full w-[65px] h-[65px] flex"
                  src={props.usersPhoto || user}
                />
                <span className="ml-3">
                  <div className="flex font-bold text-[23px]">
                    {props.fullName}
                  </div>
                  <div className="text-gray-600">Date</div>
                </span>
              </div>
              <div className="my-2 mx-1">{props.postMessage}</div>
              <div>
                <Like postId={props.postId} likesCount={props.likesCount}/>
                <Share/>
              </div>
            </div>
            <div className="border-gray-400 pt-1">
              <div className="flex flex-col items-center">
                {props.answers.map((answer: answersType) => {
                  if (answer.postId === props.postId) {
                    return (
                      <AnswerItem
                        currentUserId={currentUserId}
                        postId={props.postId}
                        answer={answer}
                      />
                    );
                  }
                })}
              </div>
              <div className="p-2 pt-3 bg-[white] rounded-[15px] mt-1">
                <AddingNewAnswer postId={props.postId} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
