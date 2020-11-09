import style from './biography.module.css';

const Biography = () => {
  return (
    <div className={style.imageFigure}>
      <a className={style.imageover} rel="noopener" target="_blank" href="https://twitter.com/theCrispydesign">
        <img
          className={(style.authorImage, style.clickcircle)}
          src="https://user-images.githubusercontent.com/13301795/98523500-47bd3680-2276-11eb-84c9-15d8a8f623c5.jpg"
          alt="Christophe Parmentier- Author"
        />
      </a>

      <figcaption>
        <div className={style.figAuthorFigureTitle}>Christophe Parmentier</div>
        <div className={style.figAuthorFigureTitle}>Hi, I'm Christophe 👋 Welcome to my personal blog</div>
        <div className={style.figAuthorFigureTitle}>
          💈 Front End Engineer @ineatGroup / Freelance Graphic Designer / Ex-trainer #YesWeWeb #Simplon
        </div>
      </figcaption>
    </div>
  );
};

export default Biography;
