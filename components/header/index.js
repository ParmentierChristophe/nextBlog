import Link from 'next/link';
import style from './header.module.css';

const Header = ({ slug, title }) => {
  return (
    <nav className={style.navbar}>
      <div className={style.containerNavbar}>
        <span className={style.brand}>
          <Link href="/">
            <a aria-label="Navigate Home">Crispy </a>
          </Link>
        </span>

        <div>
          <a href="https://github.com/ParmentierChristophe">
            <img className={style.icon} src="/img/GitHub-Mark-32px.png"></img>
          </a>
          <a href="https://twitter.com/theCrispydesign">
            <img className={style.icon} src="/img/twitter.png"></img>
          </a>
          <a href="https://www.linkedin.com/in/christophe-parmentier/">
            <img className={style.icon} src="/img/linkedin.png"></img>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
