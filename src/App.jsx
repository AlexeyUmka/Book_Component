import './App.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Particles from './components/Particles';
import Landing from './components/Landing';
import Book from './components/book';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { i18n } = useTranslation();
  const [showBook, setShowBook] = useState(false);

  return (
    <>
      <LanguageSwitcher />
      <Particles />
      {!showBook && <Landing onEnter={() => setShowBook(true)} />}
      {showBook && <Book key={i18n.language} shouldOpen={true} />}
    </>
  );
}

export default App;
