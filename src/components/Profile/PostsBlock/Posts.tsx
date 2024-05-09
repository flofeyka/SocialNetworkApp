import { FC, memo, useState } from 'react';
import AddingNewPost from './Post/AddingNewPost/AddingNewPost';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PostItem from '../../PostItem/PostItem';

const Posts: FC = () => {
    const postItem = useSelector((state: RootState) => state.ProfilePage.PostItem);


    const PostElem = [...postItem].reverse().map(post => <PostItem post={post}  />);
    return <div>
        <AddingNewPost />
        <div>
            {PostElem}
        </div>
    </div>

}

export default memo(Posts);