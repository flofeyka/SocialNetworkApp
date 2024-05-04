import { memo } from "react";
import Descriptions from "./Description/Descriptions";
import Posts from "./PostsBlock/Posts";
import { useParams } from "react-router-dom";

function Profile() {
    let LinkedUserId: any = useParams().userId;

    return <div>
        <div>
            <Descriptions LinkedUserId={+LinkedUserId} />
        </div>
        <div className="flex justify-center mt-2.5">
            <Posts />
        </div>

    </div>
};

export default memo(Profile);