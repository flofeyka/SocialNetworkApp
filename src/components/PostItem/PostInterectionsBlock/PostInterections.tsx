import "./Interections.css";
import Like from "./InterectionElements/Like";
import Comments from "./InterectionElements/Comments";
import Share from "./InterectionElements/Share";

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    postId: number
    likesCount: number
}

function PostInterections(props: Props) {

    return <div className="interectionsBlock">
        <Like postId={props.postId} likesCount={props.likesCount} />
        <Comments setOpen={props.setOpen} />
        <Share />
    </div>
}

export default PostInterections;