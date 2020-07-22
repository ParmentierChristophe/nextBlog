import Link from '../link';

const Previous = ({ previous, next }) => {
  return (
    <div>
      <div>
        {previous && (
          <Link href="/[slug]" gray as={`/${previous.slug}`}>
            <div>← {previous.title}</div>
          </Link>
        )}
      </div>

      <div>
        {next && (
          <Link href="/[slug]" gray as={`/${next.slug}`}>
            <div>{next.title} →</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Previous;
