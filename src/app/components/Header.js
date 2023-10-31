import { useRouter } from 'next/router';
import styles from "./header.css"; 

const Header = () => {
  const router = useRouter();

  const navigateBar = (path) => {
    router.push(path);
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <nav>
            <div className={styles.navContainer}>
              <a href="/" onClick={(e) => { e.preventDefault(); navigateBar('/') }}>Cat Facts</a>
              <a href="/home" onClick={(e) => { e.preventDefault(); navigateBar('/home') }}>Intelligence</a>
            </div>
          </nav>
        </div>
      </header>
      <hr className={styles.separateline} />
    </div>
  );
};

export default Header;


