import { FC } from "react";
import user from "../../../../../assets/Profile/usersProfileIcon.png";
import { useSelector } from "react-redux";
import { Button, Input } from "@nextui-org/react";
import { RootState, useAppDispatch } from "../../../../../redux/store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { answerComment } from "../../../../../redux/postsSlice";

const AddingNewAnswer: FC<{ postId: number }> = ({ postId }) => {
  const [currentUserId, name, image] = useSelector((state: RootState) => [
    state.AuthPage.userId,
    state.AuthPage.login,
    state.AuthPage.currentProfileImage.large,
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
          <Input
            {...register("answerMessage", { required: true })}
            className="text-[25px] rounded-[10px] mx-2"
            autoFocus={true}
          />
        </span>
        <Button
          type="submit"
          className="w-[50px] h-10 rounded-[10px] border-[none] mx-4"
        >
          Send
        </Button>
      </div>
    </form>
  );
};

export default AddingNewAnswer;
