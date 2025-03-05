'use server';

import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';

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

  await storePost({
    imageUrl: '',
    title,
    content,
    userId: 1,
  });

  redirect('/feed');
};
