import { useState } from 'react';

import TextEntry from '../entry/text';

const Posts = ({ slug, posts, paginate }) => {
  const [showMore, setShowMore] = useState(3);

  return (
    <>
      <ul>
        {posts.slice(0, paginate ? showMore : undefined).map((post) => {
          return (
            <TextEntry
              key={`post-item-${post.slug}`}
              href="/[slug]"
              as={`/${post.slug}`}
              title={`${post.title}`}
              category={post.category}
            />
          );
        })}
        {paginate && showMore < posts.length && (
          <button
            onClick={() => {
              setShowMore(showMore + 3);
            }}>
            Show More
          </button>
        )}
      </ul>
    </>
  );
};

export default Posts;
