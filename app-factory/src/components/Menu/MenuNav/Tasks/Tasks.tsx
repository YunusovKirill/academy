import { useNavigate } from 'react-router-dom'
import '../menunav.css'
import '../Settings/settings.css'

function Tasks () {

    const navigate = useNavigate();

    return (
        <ul className='menu__items'>
            <li className='menu__items__item menu__items__item-settings'>
                <button className='menu__items__item__btn'>Складской учёт</button>
            </li>
            <li className='menu__items__item menu__items__item-settings'>
                <button onClick={() => navigate('/accounting')} className='menu__items__item__btn'>Учёт в производстве</button>
            </li>
        </ul> 
    )
}
export default Tasks