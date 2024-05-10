import { FC } from 'react';
import { postItemType } from "../../../types/types";
import CreatePost from '../../PostItem/CreatePost/CreatePost';
import PostItem from '../../PostItem/PostItem';

type Props = {
    FeedPosts: any
}

const Posts: FC<Props> = (props) => {
  return (
    <div>
      <div>
        <CreatePost />
      </div>
      <div className="flex flex-col items-center">
        {props.FeedPosts.map((post: postItemType) => <PostItem post={post} />)}
      </div>
    </div>
  );
};

export default Posts;