import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PostItem from '../../PostItem/PostItem';
import CreatePost from '../../PostItem/CreatePost/CreatePost';

const Posts: FC = () => {
    const postItem = useSelector((state: RootState) => state.Posts.PostItem);


    const PostElem = [...postItem].reverse().map(post => <PostItem post={post}  />);
    return <div>
        <CreatePost />
        <div>
            {PostElem}
        </div>
    </div>

}

export default memo(Posts);