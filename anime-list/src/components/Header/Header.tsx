import styles from './header.module.scss';
import favicon from '../../img/favicon.webp'

import { Link, useLocation } from 'react-router-dom';
import { useHeaderSortStore } from '../../store/headerSortStore';
import SearchBar from '../SearchBar/SearchBar';
import SortOptions from '../SortOptions/SortOptions';
import Filters from '../Filters/Filters';
import Dropdown from '../Dropdown/Dropdown';
import CustomSelect from '../CustomSelect/CustomSelect';

const Header: React.FC = () => {
    const location = useLocation();

    const isOnAnimeListPage = location.pathname === '/';
    const isOnWatchLaterPage = location.pathname === '/watch-later';

    const { sortBy, setSortBy } = useHeaderSortStore();

    const WatchLaterOptions = [
        { value: 'weight', label: 'Вес' },
        { value: 'date', label: 'Дата добавления' },
      ];
    
    const handleWatchLaterOptions = (value: string) => {
        setSortBy(value as 'weight' | 'date');
    };

    return (
        <header className={styles.header}>
            <img src={favicon} alt="Логотип" />
            <SearchBar />
            <div className={styles.header__actions}>
                {isOnAnimeListPage && (
                <>
                    <div className={styles.header__anime__list}>
                        <Dropdown label={'Сортировка и фильтрация'}>
                            <SortOptions />
                            <Filters />
                        </Dropdown>
                        <Link to="/watch-later" className={styles.header__btn}>
                            Отложенное
                        </Link>
                    </div>
                </>
                )}

                {isOnWatchLaterPage && (
                <>
                    <div className={styles.header__wl__page}>
                        <div className={styles.header__wl__page__sort}>
                            <Dropdown label={'Сортировка'}>
                                <CustomSelect
                                    options={WatchLaterOptions}
                                    selected={sortBy}
                                    onChange={handleWatchLaterOptions}
                                />
                            </Dropdown>
                        </div>
                        <Link to="/" className={styles.header__btn}>
                            Список аниме
                        </Link>
                    </div>
                </>
                )}
            </div>
        </header>
    );
};

export default Header;