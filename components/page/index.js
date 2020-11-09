import styles from './page.module.css';
import SEO from '../seo';
import Header from '../header';
import Footer from '../footer';

const Page = ({ header = true, slug, title, showSlug = true, description, image, children }) => {
  return (
    <div className={styles.wrapper}>
      <SEO title={`${title ? `${title}` : 'hey !'}`} description={description} image={image} />
      {showSlug && <Header slug={showSlug && slug} title={showSlug && title} />}
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Page;
