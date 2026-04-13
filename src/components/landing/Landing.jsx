import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Landing.css';

export default function Landing({ onEnter }) {
  const { t } = useTranslation();
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    // give animation time to complete before calling callback
    setTimeout(onEnter, 600);
  };

  return (
    <div className={`landing ${isExiting ? 'landing-exit' : 'landing-enter'}`}>
      <div className="landing-content">
        <h1 className="landing-title">{t('landing.game-name')}</h1>
        <button className="landing-button" onClick={handleEnter}>
          {t('landing.button-text')}
        </button>
      </div>
    </div>
  );
}
