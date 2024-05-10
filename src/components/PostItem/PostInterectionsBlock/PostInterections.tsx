import "./Interections.css";
import Like from "./InterectionElements/Like";
import Comments from "./InterectionElements/Comments";
import Share from "./InterectionElements/Share";
import { FC } from "react";

type Props = {
    setOpen: (open: boolean) => void
    postId: number
    likesCount: number
}

const PostInterections: FC<Props> = (props) => {

    return <div className="interectionsBlock">
        <Like postId={props.postId} likesCount={props.likesCount} />
        <Comments setOpen={props.setOpen} />
        <Share />
    </div>
}

export default PostInterections;