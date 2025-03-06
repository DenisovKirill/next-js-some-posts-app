'use client';

import Post from '@/components/post';
import { useOptimistic } from 'react';
import { togglePostLikeStatus } from '@/lib/serverActions/posts';

const Posts = ({ posts }) => {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostsId) => {
      const updatedPostIndex = prevPosts.findIndex((post) => post.id === updatedPostsId);

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };

      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);

      updatedPost.isLiked = !updatedPost.isLiked;

      const newPosts = [...prevPosts];

      newPosts[updatedPostIndex] = updatedPost;

      return newPosts;
    },
  );

  const updatePosts = async (postId) => {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  };

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePosts} />
        </li>
      ))}
    </ul>
  );
};

export default Posts;
