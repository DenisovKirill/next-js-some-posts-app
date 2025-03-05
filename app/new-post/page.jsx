import PostForm from '@/components/post-form';
import { createPost } from '@/lib/serverActions/posts';

const NewPostPage = () => {
  return <PostForm action={createPost} />;
};

export default NewPostPage;
