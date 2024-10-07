import styles from './header.module.scss';
import favicon from '../../img/favicon.webp';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderSortStore } from '../../store/headerSortStore';
import SearchBar from '../SearchBar/SearchBar';
import SortOptions from '../SortOptions/SortOptions';
import Filters from '../Filters/Filters';
import Dropdown from '../Dropdown/Dropdown';
import CustomSelect from '../CustomSelect/CustomSelect';

const Header: React.FC = () => {
  const location = useLocation();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const { sortBy, setSortBy } = useHeaderSortStore();

  const WatchLaterOptions = [
    { value: 'weight', label: 'Вес' },
    { value: 'date', label: 'Дата добавления' }
  ];

  const isOnAnimeListPage = location.pathname === '/';
  const isOnWatchLaterPage = location.pathname === '/watch-later';

  const handleWatchLaterOptions = (value: string | number) => {
    setSortBy(value as 'weight' | 'date');
  };

  const toggleBurgerMenu = () => setBurgerOpen((prev) => !prev);

  const renderMenu = () => (
    <>
      <SearchBar />
      {isOnAnimeListPage && (
        <>
          <Dropdown label={'Сортировка и фильтрация'}>
            <SortOptions />
            <Filters />
          </Dropdown>
          <Link to="/watch-later" className={styles.header__btn}>
            Отложенное
          </Link>
        </>
      )} 
      {isOnWatchLaterPage && (
        <>
          <Dropdown label={'Сортировка'}>
            <CustomSelect
              options={WatchLaterOptions}
              selected={sortBy}
              onChange={handleWatchLaterOptions}
            />
          </Dropdown>
          <Link to="/" className={styles.header__btn}>
            Список аниме
          </Link>
        </>
      )}
    </>
  );

  return (
    <header className={styles.header}>
      <img src={favicon} alt="Логотип" />
      <button className={styles.burger__button} onClick={toggleBurgerMenu}>
        &#9776;
      </button>

      {/* Десктопное меню */}
      <div className={styles.header__actions}>
        {renderMenu()}
      </div>

      {/* Бургер-меню */}
      <div className={`${styles.burger__menu} ${burgerOpen ? styles.open : ''}`}>
        <button className={styles.burger__close} onClick={toggleBurgerMenu}>
          &times; {/* Кнопка закрытия */}
        </button>
        {renderMenu()}
      </div>
    </header>
  );
};

export default Header;