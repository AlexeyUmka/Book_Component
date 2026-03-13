import './App.css';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Particles from './components/Particles';
import Landing from './components/Landing';
import Book from './components/book';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { i18n } = useTranslation();
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
      {!showBook && <Landing onEnter={() => setShowBook(true)} />}
      {showBook && <Book key={i18n.language} initialPage={i18n.language === 'en' && bookPage >= 23 ? bookPage - 1 : bookPage} onPageChange={setBookPage} />}
    </>
  );
}

export default App;
