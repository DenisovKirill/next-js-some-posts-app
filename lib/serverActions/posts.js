'use server';

import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { redirect } from 'next/navigation';
import { uploadImage } from '@/lib/serverActions/cloudinary';
import { revalidatePath } from 'next/cache';

export const createPost = async (_, formData) => {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];

  if (!title || !title.trim().length) {
    errors.push('Title is required');
  }
  if (!content || !content.trim().length) {
    errors.push('Content is required');
  }
  if (!image || image.size === 0) {
    errors.push('Image is required');
  }

  if (errors.length) {
    return { errors };
  }

  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(`An error have occurred ${error.message}`);
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });

  revalidatePath('/feed');
  redirect('/feed');
};

export const togglePostLikeStatus = async (postId) => {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/feed');
};
