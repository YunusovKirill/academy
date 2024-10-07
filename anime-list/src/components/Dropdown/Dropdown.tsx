import { useState } from 'react';
import styles from './dropdown.module.scss'

interface DropdownProps {
  label: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdown__toggle} onClick={toggleDropdown}>
        {label}
      </button>
      {isOpen && <div className={styles.dropdown__content}>{children}</div>}
    </div>
  );
};

export default Dropdown;