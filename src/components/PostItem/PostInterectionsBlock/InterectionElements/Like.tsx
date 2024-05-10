import { Button } from "@nextui-org/react";
import { useAppDispatch } from "../../../../redux/store";
import { setLike } from "../../../../redux/postsSlice";
import { FC } from "react";

const Like: FC<{ postId: number; likesCount: number }> = (props) => {   
    const dispatch = useAppDispatch();
  return (
    <span>
      <Button className="mr-2" radius="full" variant="faded" size="sm" onClick={() => dispatch(setLike(props.postId))}>
        Лайк {props.likesCount}
      </Button>
    </span>
  );
};

export default Like;
