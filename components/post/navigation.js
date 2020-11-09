import Link from '../link';
import style from './navigation.module.css';

const Previous = ({ previous, next }) => {
  return (
    <div>
      <hr />
      <div className={style.container}>
        <div className={style.globalPreviousNext}>
          <div className={style.previous}>
            {previous && (
              <div>
                <p>Previous</p>
                <Link href="/[slug]" gray as={`/${previous.slug}`}>
                  ← {previous.title}
                </Link>
              </div>
            )}
          </div>

          <div className={style.next}>
            {next && (
              <div>
                <p>Next</p>
                <Link href="/[slug]" gray as={`/${next.slug}`}>
                  {next.title} →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Previous;
