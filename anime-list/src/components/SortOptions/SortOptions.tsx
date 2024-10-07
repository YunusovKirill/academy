import styles from './sortOptions.module.scss';
import { useSortStore } from '../../store/sortStore';
import CustomSelect from '../CustomSelect/CustomSelect';

const options = [
  { value: 'popularity', label: 'Популярности' },
  { value: 'score', label: 'Рейтингу' },
  { value: 'favorites', label: 'Избранному' },
  { value: 'episodes', label: 'Количеству эпизодов' },
  { value: 'start', label: 'Начало' },
  { value: 'end', label: 'Конец' },
];

const SortOptions: React.FC = () => {
  const { sortCriteria, setSortCriteria } = useSortStore();

  return (
    <div className={styles.sort__options}>
      <label htmlFor="sort">Сортировать по:</label>
      <CustomSelect 
        options={options} 
        selected={sortCriteria} 
        onChange={setSortCriteria} 
      />    
    </div>
  );
};

export default SortOptions;