import Link from 'next/link';
import style from './header.module.css';
import useTheme from '../../lib/theme';

const Header = ({ slug, title }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={style.navbar}>
      <div className={style.containerNavbar}>
        <span className={style.brandContainer}>
          <Link href="/">
            <a className={style.brand} aria-label="Navigate Home">
              Crispy
            </a>
          </Link>
          <button onClick={toggleTheme} aria-label="Toggle Theme">
            AZR
          </button>
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
