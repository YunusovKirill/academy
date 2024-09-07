import { useNavigate } from 'react-router-dom'
import '../menunav.css'

function MainMenu() {

    const navigate = useNavigate();

    return (
        <ul className='menu__items'>
            <li className='menu__items__item'>
                <button className='menu__items__item__btn' onClick={() => navigate('/tasks')}>Задачи</button>
            </li>
            <li className='menu__items__item'>
                <button className='menu__items__item__btn' onClick={() => navigate('/settings')}>Настройки</button>
            </li>
            <li className='menu__items__item'>
                <button className='menu__items__item__btn'>О системе</button>
            </li>
        </ul> 

    )
}

export default MainMenu