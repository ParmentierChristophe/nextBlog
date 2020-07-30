import Head from 'next/head';

import Navigation from './navigation';
import Page from '../page';
import style from './post.module.css';

const Post = ({ title, slug, html, hidden, description, date, previous, next }) => {
  return (
    <div>
      <Page slug={slug} title={title} description={description}>
        <Head>
          {hidden && <meta name="robots" content="noindex" />}
          {date && <meta name="date" content={date} />}
        </Head>
        <div className={style.container}>
          <span>
            {slug ? (
              <b>
                <span className={style.title}> {title} </span>
              </b>
            ) : (
              ''
            )}
          </span>

          <article
            dangerouslySetInnerHTML={{
              __html: `${html}`,
            }}
          />
        </div>
      </Page>
      <Navigation previous={previous} next={next} />
    </div>
  );
};

export default Post;
