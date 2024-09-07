import { useNavigate } from 'react-router-dom';
import '../../menunav.css'
import './accounting.css'

function Accounting() {

    const navigate = useNavigate();

    return (
        <ul className='menu__items menu__items-accounting'>
            <li className='menu__items__item menu__items__item-accounting'>
                <button className='menu__items__item__btn'>Акты инвентаризации</button>
            </li>
            <li className='menu__items__item menu__items__item-accounting'>
                <button className='menu__items__item__btn'>Внутризаводские накладные (Приход)</button>
            </li>
            <li className='menu__items__item menu__items__item-accounting'>
                <button className='menu__items__item__btn' onClick={() => navigate('/list')}>Внутризаводские накладные (Расход)</button>
            </li>
            <li className='menu__items__item menu__items__item-accounting'>
                <button className='menu__items__item__btn'>Лимитные карты (Приход)</button>
            </li>
            <li className='menu__items__item menu__items__item-accounting'>
                <button className='menu__items__item__btn'>Цеховая номенклатура</button>
            </li>
        </ul> 

    )
}

export default Accounting;