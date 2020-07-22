import Link from 'next/link';

const Header = ({ slug, title }) => {
  return (
    <nav>
      <div>
        <span>
          <Link href="/">
            <a aria-label="Navigate Home">Crispy</a>
          </Link>
          <span>
            -
            {slug ? (
              <b>
                <span>{title}</span>
              </b>
            ) : (
              <>Blog</>
            )}
          </span>
        </span>
      </div>
    </nav>
  );
};

export default Header;
