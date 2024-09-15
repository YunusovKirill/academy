import { useState } from "react";
import styles from '../taskManager.module.scss'

interface TaskFormProps {
    onAddTask: (title: string) => void;
}
  
const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
        <input
            type="text"
            placeholder="Название задачи"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
        />
        <button type="submit" className={styles.submitButton}>Добавить задачу</button>
        </form>
    );
};

  export default TaskForm;