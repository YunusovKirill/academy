import styles from '../styles/TaskManager.module.scss';

import { useState } from 'react';
import { produce } from 'immer';
import CategoryForm from './CategoryForm/CategoryForm';
import TaskForm from './TaskForm/TaskForm';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}
  
  interface Category {
    id: number;
    name: string;
    tasks: Task[];
}

const TaskManager: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const addCategory = (name: string) => {
        setCategories(produce(categories, draft => {
        draft.push({ id: Date.now(), name, tasks: [] });
        }));
    };

    const removeCategory = (id: number) => {
        setCategories(produce(categories, draft => {
        return draft.filter(category => category.id !== id);
        }));
    };

    const addTask = (categoryId: number, title: string) => {
        setCategories(produce(categories, draft => {
        const category = draft.find(c => c.id === categoryId);
        if (category) {
            category.tasks.push({ id: Date.now(), title, completed: false });
        }
        }));
    };

    const editTask = (categoryId: number, taskId: number, newTitle: string) => {
        setCategories(produce(categories, draft => {
        const category = draft.find(c => c.id === categoryId);
        const task = category?.tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
        }
        }));
    };

    const toggleTaskCompletion = (categoryId: number, taskId: number) => {
        setCategories(produce(categories, draft => {
        const category = draft.find(c => c.id === categoryId);
        const task = category?.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
        }
        }));
    };

    const removeTask = (categoryId: number, taskId: number) => {
        setCategories(produce(categories, draft => {
        const category = draft.find(c => c.id === categoryId);
        if (category) {
            category.tasks = category.tasks.filter(task => task.id !== taskId);
        }
        }));
    };

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Управление задачами</h1>
        <CategoryForm onAddCategory={addCategory} />
        <ul className={styles.categoryList}>
            {categories.map(category => (
            <li key={category.id} className={styles.categoryItem}>
                <h2>{category.name}</h2>
                <TaskForm onAddTask={(title) => addTask(category.id, title)} />
                <ul className={styles.taskList}>
                {category.tasks.map(task => (
                    <li key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
                    {task.title}
                    <div>
                        <button className={styles.button} onClick={() => toggleTaskCompletion(category.id, task.id)}>
                        {task.completed ? 'Ошибка' : 'Выполнено!'}
                        </button>
                        <button className={styles.button} onClick={() => removeTask(category.id, task.id)}>Удалить</button>
                        <button className={styles.button} onClick={() => editTask(category.id, task.id, 'Новое название задачи')}>Редактировать</button>
                    </div>
                    </li>
                ))}
                </ul>
                <button className={styles.removeButton} onClick={() => removeCategory(category.id)}>Удалить категорию</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default TaskManager;