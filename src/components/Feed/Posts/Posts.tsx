import { FC, useState } from 'react';
import AddNewPost from './AddNewPost/AddNewPost';
import { FeedPostItemType, postItemType } from "../../../types/types";
import PostItem from '../../PostItem/PostItem';

type Props = {
    FeedPosts: any
}

const Posts: FC<Props> = (props) => {
  return (
    <div>
      <div>
        <AddNewPost />
      </div>
      <div className="flex flex-col items-center">
        {props.FeedPosts.map((post: postItemType) => <PostItem post={post} />)}
      </div>
    </div>
  );
};

export default Posts;