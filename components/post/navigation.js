import Link from '../link';
import style from './navigation.module.css';

const Previous = ({ previous, next }) => {
  return (
    <div>
      <hr />
      <div className={style.container}>
        <div className={style.globalPreviousNext}>
          <div className={style.previous}>
            <p>Previous</p>
            {previous && (
              <Link href="/[slug]" gray as={`/${previous.slug}`}>
                ← {previous.title}
              </Link>
            )}
          </div>

          <div className={style.next}>
            <p>Next</p>
            {next && (
              <Link href="/[slug]" gray as={`/${next.slug}`}>
                {next.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previous;
