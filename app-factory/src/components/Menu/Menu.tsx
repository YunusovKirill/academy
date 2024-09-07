import { useNavigate } from 'react-router-dom';
import './menu.css'

function Menu () {

    const navigate = useNavigate();

    return (
        <ul className='menu__items'>
            <li className='menu__items__item' onClick={() => navigate('/tasks')}>Задачи</li>
            <li className='menu__items__item' onClick={() => navigate('/settings')}>Настройки</li>
            <li className='menu__items__item'>О системе</li>
        </ul> 
    )
}

export default Menu;