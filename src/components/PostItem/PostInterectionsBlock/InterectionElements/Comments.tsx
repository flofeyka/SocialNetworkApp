import { Button } from "@nextui-org/react";
import { FC } from "react";

const Comments: FC<{setOpen: (open: boolean) => void}> = ({setOpen}) => {
  return (
    <span>
      <Button variant="faded" radius="full" size="sm" onClick={() => setOpen(true)}>
        Комментарии
      </Button>
    </span>
  );
};

export default Comments;
