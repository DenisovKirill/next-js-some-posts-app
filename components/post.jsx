import Image from 'next/image';
import { formatDate } from '@/lib/format';
import { togglePostLikeStatus } from '@/lib/serverActions/posts';
import LikeButton from '@/components/like-icon';

const Post = ({ post, action }) => {
  const { title, image, content, userFirstName, createdAt, isLiked, id } = { ...post };

  return (
    <article className="post">
      <div className="post-image">
        <Image src={image} alt={title} width={500} height={500} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{title}</h2>
            <p>
              Shared by {userFirstName} on <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            </p>
          </div>
          <div>
            <form action={action.bind(null, id)} className={isLiked ? 'liked' : ''}>
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{content}</p>
      </div>
    </article>
  );
};

export default Post;
