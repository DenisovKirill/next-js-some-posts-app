import Image from 'next/image';
import { formatDate } from '@/lib/format';
import LikeButton from '@/components/like-icon';

const imageLoader = (config) => {
  const { src } = config;
  const urlStart = src.split('/upload')[0];
  const urlEnd = src.split('/upload')[1];
  const transformations = `w_200,q_${config.quality}`;

  const transformedUrl = [urlStart, '/upload/', transformations, urlEnd].join('');

  return transformedUrl;
};

const Post = ({ post, action }) => {
  const { title, image, content, userFirstName, createdAt, isLiked, id } = { ...post };

  return (
    <article className="post">
      <div className="post-image">
        <Image loader={imageLoader} src={image} alt={title} fill quality={50} />
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
