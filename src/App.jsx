import './App.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Particles from './components/landing/Particles';
import Footer from './components/footer';
import Book from './components/book';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { i18n, t } = useTranslation();
  const [showBook, setShowBook] = useState(false);
  const [bookPage, setBookPage] = useState(0);

  useEffect(() => {
    const lang = i18n.language === 'ua' ? 'ua' : 'en';
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-en', lang === 'en');
    document.body.classList.toggle('lang-ua', lang === 'ua');

    return () => {
      document.body.classList.remove('lang-en');
      document.body.classList.remove('lang-ua');
    };
  }, [i18n.language]);

  return (
    <>
      <LanguageSwitcher />
      <Particles />
      {!showBook && (
        <div className="mainContainer">
          <div className="mainContent">
            <h1>K2 Gameworks</h1>
            <p>{t('landing.tagline')}</p>
            <button className="enterButton" onClick={() => setShowBook(true)}>
              {t('landing.button-text')}
            </button>
          </div>
          <Footer />
        </div>
      )}
      {showBook && (
        <>
          <button className="backButton" onClick={() => setShowBook(false)}>
            ← {t('landing.back-button')}
          </button>
          <Book key={i18n.language} initialPage={bookPage} onPageChange={setBookPage} />
        </>
      )}
    </>
  );
}

export default App;
