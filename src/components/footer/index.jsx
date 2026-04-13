import styles from './styles.module.css';

function Footer() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.links}>
        <span>Contacts</span>
        <div className={styles.socialMedia}>
          <a
            href="https://www.youtube.com/watch?v=Z-0z04IOzhI"
            target="_blank"
            rel="noreferrer"
            aria-label="Open YouTube video">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
      <div className={styles.contacts}>
        <span>ceo@k2gameworks.com</span>
      </div>
      <div className={styles.contactWithUs}>
        <span>© 2026 K2 Gameworks LLC, Inc. All rights reserved.</span>
      </div>
    </div>
  );
}
export default Footer;
