import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NavLink } from "react-router-dom";
import PostInterections from "./PostInterectionsBlock/PostInterections";
import { Modal, ModalContent } from "@nextui-org/react";
import { answersType, postItemType } from "../../types/types";
import AnswerItem from "./PostInterectionsBlock/Answers/AnswerItem";
import AddingNewAnswer from "./PostInterectionsBlock/Answers/AddingNewAnswer/AddingNewAnswer";
import user from "../../assets/Profile/usersProfileIcon.png";
import details from "../../assets/AdditionalyPhoto.png";
import { FC, memo, useState } from "react";

type Props = {
    post: postItemType;
  };
  

const PostItem: FC<Props> = ({ post }) => {
    const currentUserId = useSelector(
      (state: RootState) => state.AuthPage.userId
    );
  
    const [open, setOpen] = useState<boolean>(false);
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
            <div className="text-[17px] mt-2.5">
              {post.postMessage}
            </div>
            <PostInterections open={open} setOpen={(open: boolean) => setOpen(open)}
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
          <Modal size="xl" isOpen={open} onClose={() => setOpen(false)}>
            <ModalContent>
              <div className="flex p-3">
                <img
                  className="flex rounded-full w-[65px] h-[65px] flex"
                  src={post.usersPhoto || user}
                />
                <span className="ml-3">
                  <div className="flex font-bold text-[23px]">
                    {post.fullName}
                  </div>
                  <div className="text-gray-600">Date</div>
                </span>
              </div>
              <div className="ml-3">{post.postMessage}</div>
              <div className="border-t border-gray-400 mt-3 pt-1">
                <div className="flex flex-col items-center">
                  {post.answers.map((answer: answersType) => {
                    if (answer.postId === post.id) {
                      return (
                        <AnswerItem
                          currentUserId={currentUserId}
                          setAnswerMode={(editMode: boolean) =>
                            setAnswerMode(editMode)
                          }
                          answerMode={answerMode}
                          postId={post.id}
                          answer={answer}
                        />
                      );
                    }
                  })}
                </div>
                <div className="p-3">
                  <AddingNewAnswer postId={post.id} />
                </div>
              </div>
            </ModalContent>
          </Modal>
        </div>
      </div>
    );
  };
  
  export default memo(PostItem);
  