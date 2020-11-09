import style from './footer.module.css';
const Footer = () => {
  return (
    <div className={style.signatureContainer}>
      <p>
        Made with ♥️ by <a href="https://twitter.com/theCrispydesign">Christophe Parmentier</a>
      </p>
    </div>
  );
};

export default Footer;
