import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import HTMLFlipBook from 'react-pageflip';
import styles from './styles.module.css';
import wingedHussar from '../../assets/images/Winged_Hussar_opt.webp';
import cossackSerdyuk from '../../assets/images/Cossack_Serdyuk_opt.webp';
import Ottoman_Elite_Janissary from '../../assets/images/Ottoman_Elite_Janissary_opt.webp';
import belts from '../../assets/images/belts_opt.webp';
import background from '../../assets/images/background_book_opt.webp';
import button from '../../assets/images/button_old_opt.webp';
import cornerLeft from '../../assets/images/corner_left_opt.webp';
import cornerRight from '../../assets/images/corner_right_opt.webp';
import bookMark1 from '../../assets/images/book_mark_1_opt.webp';
import bookMark2 from '../../assets/images/book_mark_2_opt.webp';
import bookMark3 from '../../assets/images/book_mark_3_opt.webp';

const sketches = [wingedHussar, cossackSerdyuk, Ottoman_Elite_Janissary];

// компонент страницы
const Page = forwardRef(function Page({ children, onClick, className = '' }, ref) {
  return (
    <div ref={ref} className={`${styles.page} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
});

function Book({ shouldOpen = false }) {
  const { t } = useTranslation();
  const bookRef = useRef(null);
  const preOpenShiftTimeoutRef = useRef(null);
  const unlockTimeoutRef = useRef(null);
  const beltsHideTimeoutRef = useRef(null);
  const hasAutoOpenedRef = useRef(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPreOpenShift, setIsPreOpenShift] = useState(false);
  const [isCoverUnlocking, setIsCoverUnlocking] = useState(false);
  const [isBeltsHidden, setIsBeltsHidden] = useState(false);

  // sections shown in the sidebar bookmarks. labels are now translated.
  const sections = [
    { label: t('bookmarks.characters'), page: 1, image: bookMark1 },
    { label: t('bookmarks.mechanics'), page: 3, image: bookMark2 },
    { label: t('bookmarks.socialMedia'), page: 5, image: bookMark3 },
  ];

  const contentPages = [
    {
      title: t('pages.page1.title'),
      text: t('pages.page1.text'),
    },
    {},
    {
      title: t('pages.page3.title'),
      text: t('pages.page3.text'),
    },
    {},
    {
      title: t('pages.page5.title'),
      text: t('pages.page5.text'),
    },
    {},
  ];
  const totalPages = contentPages.length + 1;

  const runOpenSequence = useCallback(
    (pageFlip) => {
      if (!pageFlip || isCoverUnlocking) {
        return;
      }

      setIsCoverUnlocking(true);
      setIsBeltsHidden(false);

      beltsHideTimeoutRef.current = window.setTimeout(() => {
        setIsBeltsHidden(true);
      }, 420);

      preOpenShiftTimeoutRef.current = window.setTimeout(() => {
        setIsPreOpenShift(true);
      }, 430);

      unlockTimeoutRef.current = window.setTimeout(() => {
        pageFlip.flipNext();
        setIsCoverUnlocking(false);
      }, 900);
    },
    [isCoverUnlocking],
  );

  // trigger auto-open if shouldOpen is true (only once)
  useEffect(() => {
    if (shouldOpen && !hasAutoOpenedRef.current) {
      hasAutoOpenedRef.current = true;
      // small delay to ensure flipbook is mounted and ready
      const delayedOpen = window.setTimeout(() => {
        const pageFlip = bookRef.current?.pageFlip();
        runOpenSequence(pageFlip);
      }, 100);

      return () => window.clearTimeout(delayedOpen);
    }
  }, [runOpenSequence, shouldOpen]);

  // clean up timeouts
  useEffect(() => {
    return () => {
      if (preOpenShiftTimeoutRef.current) {
        window.clearTimeout(preOpenShiftTimeoutRef.current);
      }

      if (unlockTimeoutRef.current) {
        window.clearTimeout(unlockTimeoutRef.current);
      }

      if (beltsHideTimeoutRef.current) {
        window.clearTimeout(beltsHideTimeoutRef.current);
      }
    };
  }, []);

  // событие нажатия на страницы
  const handlePageClick = (event) => {
    // размеры и позиция элемента
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const isLeftSideClick = event.clientX < centerX;
    // ссылка на методы книги
    const pageFlip = bookRef.current?.pageFlip();

    if (!pageFlip) {
      return;
    }

    // если клик по левой стороне, перевернуть назад
    if (isLeftSideClick) {
      if (currentPage <= 0) {
        return;
      }

      pageFlip.flipPrev();
      return;
    }

    // чтобы последняя страница не перелистывалась
    if (currentPage >= totalPages - 1) {
      return;
    }

    pageFlip.flipNext();
  };

  // jump to a specific page via bookmark click
  const handleBookmarkClick = (page) => {
    const pageFlip = bookRef.current?.pageFlip();
    if (pageFlip) {
      pageFlip.flip(page);
    }
  };

  const handleOpenButtonClick = () => {
    if (currentPage !== 0 || isCoverUnlocking || isPreOpenShift) {
      return;
    }

    const pageFlip = bookRef.current?.pageFlip();

    if (!pageFlip) {
      return;
    }

    runOpenSequence(pageFlip);
  };

  return (
    <div className={styles.bookContainer}>
      <div className={`${styles.wrap} ${isPreOpenShift ? styles.preOpenShift : ''}`}>
        {/* bookmarks sidebar attached to the book */}
        <div className={`${styles.bookmarks} ${currentPage > 0 ? styles.bookmarksOpen : ''}`}>
          {sections.map((sec) => (
            <button
              key={sec.label}
              type="button"
              className={`${styles.bookmark} ${currentPage === sec.page ? styles.activeBookmark : ''}`}
              onClick={() => handleBookmarkClick(sec.page)}
              aria-label={t('ariaLabels.goToPage', { section: sec.label })}>
              <img src={sec.image} alt={sec.label} className={styles.bookmarkImage} />
            </button>
          ))}
        </div>
        <img className={styles.backgroundBook} src={background} alt="background_book" />

        <div className={styles.bookLayer}>
          <HTMLFlipBook
            ref={bookRef}
            width={440}
            height={500}
            minWidth={360}
            maxWidth={740}
            minHeight={470}
            maxHeight={920}
            showCover
            disableFlipByClick
            useMouseEvents={false}
            mobileScrollSupport={false}
            onFlip={(event) => {
              setCurrentPage(event.data);

              if (event.data === 0) {
                setIsBeltsHidden(false);
                setIsPreOpenShift(false);
              }
            }}
            className={styles.flipBook}>
            {/* обложка + ремни + кнопка */}
            <Page
              className={`${styles.coverPage} ${isCoverUnlocking ? styles.coverUnlocking : ''}`}>
              <img
                src={belts}
                alt="Belts"
                className={`${styles.coverBelts} ${isBeltsHidden ? styles.coverBeltsHidden : ''}`}
              />
              <button
                type="button"
                className={styles.coverButton}
                onClick={handleOpenButtonClick}
                aria-label={t('ariaLabels.openBook')}>
                <img src={button} alt="Open book" className={styles.coverButtonImage} />
              </button>
            </Page>

            {contentPages.map((page, index) => {
              const isSecondPage = index % 2 === 1;
              const isLeftPage = index % 2 === 0;
              const sketchIndex = Math.floor(index / 2) % sketches.length;

              return (
                <Page
                  key={`${page.title || 'page'}_${index}`}
                  onClick={handlePageClick}
                  className={`${isSecondPage ? styles.secondPage : ''} ${isLeftPage ? styles.leftPage : styles.rightPage}`}>
                  {isSecondPage ? (
                    <>
                      <img
                        src={cornerRight}
                        alt="Folded page corner right"
                        className={styles.cornerRight}
                      />
                      <img
                        src={sketches[sketchIndex]}
                        alt={`Sketch ${sketchIndex + 1}`}
                        className={styles.sketchImage}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src={cornerLeft}
                        alt="Folded page corner"
                        className={styles.cornerLeft}
                      />
                      <h2 className={styles.title}>{page.title}</h2>
                      <p className={styles.text}>{page.text}</p>
                    </>
                  )}
                </Page>
              );
            })}
          </HTMLFlipBook>
        </div>
      </div>
    </div>
  );
}

export default Book;
