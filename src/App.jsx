import './App.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Particles from './components/landing/Particles';
import Footer from './components/footer';
import Book from './components/book';
import LanguageSwitcher from './components/LanguageSwitcher';

const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 900;
const MOBILE_PAGE_WIDTH = 590;
const MOBILE_PAGE_HEIGHT = 700;

function isMobileViewport() {
  return window.innerWidth < 768;
}

function getBookScale() {
  if (isMobileViewport()) {
    return Math.min(window.innerWidth / MOBILE_PAGE_WIDTH, window.innerHeight / MOBILE_PAGE_HEIGHT);
  }
  return Math.min(window.innerWidth / DESIGN_WIDTH, window.innerHeight / DESIGN_HEIGHT);
}

function App() {
  const { i18n, t } = useTranslation();
  const [showBook, setShowBook] = useState(false);
  const [bookPage, setBookPage] = useState(0);
  const [scale, setScale] = useState(getBookScale);
  const [isMobile, setIsMobile] = useState(isMobileViewport);

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

  useEffect(() => {
    const onResize = () => {
      setScale(getBookScale());
      setIsMobile(isMobileViewport());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <LanguageSwitcher scale={showBook ? scale : 1} />
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
          <button
            className="backButton"
            style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
            onClick={() => setShowBook(false)}>
            ← {t('landing.back-button')}
          </button>
          <Book
            key={`${i18n.language}-${isMobile}`}
            scale={scale}
            isMobile={isMobile}
            initialPage={bookPage}
            onPageChange={setBookPage}
          />
        </>
      )}
    </>
  );
}

export default App;
