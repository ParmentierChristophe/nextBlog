import Link from 'next/link';
import style from './header.module.css';
import useTheme from '../../lib/theme';
import useMounted from '../../lib/use-mounted';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isMounted = useMounted();

  return (
    <nav className={style.navbar}>
      <div className={style.containerNavbar}>
        <span className={style.brandContainer}>
          <Link href="/">
            <a className={style.brand} aria-label="Navigate Home">
              Crispy
            </a>
          </Link>
          <button onClick={toggleTheme} className={style.btn} aria-label="Toggle Theme">
            {isMounted && theme === 'light' ? <i className="fas fa-moon icon"></i> : <i className="fas fa-sun icon"></i>}
          </button>
        </span>

        <div>
          <a href="https://github.com/ParmentierChristophe">
            <i className="fab fa-github icon"></i>
          </a>
          <a href="https://twitter.com/theCrispydesign">
            <i className="fab fa-twitter icon"></i>
          </a>
          <a href="https://www.linkedin.com/in/christophe-parmentier/">
            <i className="fab fa-linkedin-in icon"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
