import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';
import enIcon from '../assets/icons/en.png';
import ukIcon from '../assets/icons/uk.png';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className={styles.switcher}>
      <button
        className={`${styles.button} ${i18n.language === 'en' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-label="Switch to English"
      >
        <img src={enIcon} alt="English" className={styles.flagIcon} />
      </button>
      <button
        className={`${styles.button} ${i18n.language === 'ua' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('ua')}
        aria-label="Switch to Ukrainian"
      >
        <img src={ukIcon} alt="Ukrainian" className={styles.flagIcon} />
      </button>
    </div>
  );
}

export default LanguageSwitcher;
