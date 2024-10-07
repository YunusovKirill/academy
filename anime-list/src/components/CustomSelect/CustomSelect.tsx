import styles from './customSelect.module.scss';
import { useState } from 'react';

interface CustomSelectProps {
  options: { value: string, label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selected);

  return (
    <div className={styles.custom__select}>
      <div onClick={toggleDropdown}>
        <span>{selectedOption ? selectedOption.label : 'Показать все'}</span>
      </div>
      <div className={`${styles.custom__select__options} ${isOpen ? styles['custom__select__options--open'] : ''}`}>
        {options.map(option => (
          <div
            key={option.value}
            className={`${styles.custom__select__options__option} ${option.value === selected ? styles['custom__select__options__option--selected'] : ''}`}
            onClick={() => handleSelectOption(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;