import { useNavigate } from 'react-router-dom'
import '../menu.css'
import '../Settings/settings.css'

function Tasks () {

    const navigate = useNavigate();

    return (
        <ul className='menu__items'>
            <li className='menu__items__item menu__items__item-settings'>Складской учёт</li>
            <li className='menu__items__item menu__items__item-settings' onClick={() => navigate('/accounting')}>Учёт в производстве</li>
        </ul> 
    )
}
export default Tasks