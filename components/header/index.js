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

        <div></div>
      </div>
    </nav>
  );
};

export default Header;
