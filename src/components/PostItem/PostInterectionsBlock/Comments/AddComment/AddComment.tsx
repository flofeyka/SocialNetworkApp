import { FC } from "react";
import user from "../../../../../assets/Profile/usersProfileIcon.png";
import { useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import { RootState, useAppDispatch } from "../../../../../redux/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { answerComment } from "../../../../../redux/postsSlice";
import { TextareaAutosize } from "@mui/material";

const AddComment: FC<{ postId: number }> = ({ postId }) => {
  const [currentUserId, name, image] = useSelector((state: RootState) => [
    state.Auth.userId,
    state.Auth.login,
    state.Auth.currentProfileImage.large,
  ]);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<{ answerMessage: string }>({
    resolver: yupResolver(
      Yup.object().shape({
        answerMessage: Yup.string().trim().required(),
      })
    ),
  });
  const onSubmit = (data: { answerMessage: string }) => {
    dispatch(
      answerComment({
        id: postId,
        userId: currentUserId,
        name,
        image,
        message: data.answerMessage,
      })
    );
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <span>
          <img
            className="max-w-[40px] max-h-10 rounded-full"
            src={image || user}
            alt=""
          />
        </span>
        <span>
          <TextareaAutosize
            {...register("answerMessage", { required: true })}
            className="text-[25px] ml-2 rounded-[10px] min-h-[40px] w-[335px] overflow-hidden border-[1px] border-[#808080] focus:border-[#0070f3] resize-none"
            autoFocus={true}
          />
        </span>
        <Button
          type="submit" variant="faded"
          className="w-[50px] h-10 rounded-[10px] border-[none] mx-2 font-semibold"
        >
          Отправить
        </Button>
      </div>
    </form>
  );
};

export default AddComment;
