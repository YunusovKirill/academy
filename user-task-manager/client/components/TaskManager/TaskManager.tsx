import styles from './TaskManager.module.scss';

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
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [editedTask, setEditedTask] = useState<string>('');

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

    const editTask = (categoryId: number, taskId: number) => {
        const category = categories.find(c => c.id === categoryId);
        const task = category?.tasks.find(t => t.id === taskId);
        if (task) {
          if (editTaskId === taskId) {
            setCategories(produce(categories, draft => {
              const cat = draft.find(c => c.id === categoryId);
              const t = cat?.tasks.find(t => t.id === taskId);
              if (t) {
                t.title = editedTask;
              }
            }));
            setEditTaskId(null);
          } else {
            setEditTaskId(taskId);
            setEditedTask(task.title);
          }
        }
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
        <ul className={styles.category__list}>
            {categories.map(category => (
            <li key={category.id} className={styles.category__list__item}>
                <h2>{category.name}</h2>
                <TaskForm onAddTask={(title) => addTask(category.id, title)} />
                <ul className={styles.task__list}>
                {category.tasks.map(task => (
                    <li key={task.id} className={styles.task__list__item}>
                    {editTaskId === task.id ? (
                      <div className={styles.task__list__item__edit}>
                        <input
                          type="text"
                          value={editedTask}
                          onChange={(e) => setEditedTask(e.target.value)}
                          placeholder="Введите новое название задачи"
                        />
                        <button onClick={() => editTask(category.id, task.id)}>Сохранить</button>
                      </div>
                    ) : (
                        <div className={styles.task__list__item__done}>
                            <div className={`${task.completed ? styles.completed : ''}`}>{task.title}</div>
                            <div className={styles.task__list__item__done__btn}>
                                <button className={styles.success_button} onClick={() => toggleTaskCompletion(category.id, task.id)}>
                                {task.completed ? 'Отменить' : 'Выполнено!'}
                                </button>
                                <button className={styles.remove_button} onClick={() => removeTask(category.id, task.id)}>Удалить</button>
                                <button onClick={() => editTask(category.id, task.id)}>Редактировать</button>
                            </div>
                        </div>
                    )}
                  </li>
                ))}
                </ul>
                <button className={styles.remove_category_button} onClick={() => removeCategory(category.id)}>Удалить категорию</button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default TaskManager;