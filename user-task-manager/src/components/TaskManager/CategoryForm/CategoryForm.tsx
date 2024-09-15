import { useState } from "react";
import styles from '../taskManager.module.scss'

interface CategoryFormProps {
    onAddCategory: (name: string) => void;
}
  
const CategoryForm: React.FC<CategoryFormProps> = ({ onAddCategory }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCategory(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Название категории"
        value={name}onChange={(e) => setName(e.target.value)}
        className={styles.input}
        required
      />
      <button type="submit" className={styles.submitButton}>Добавить категорию</button>
    </form>
  );
};

export default CategoryForm;