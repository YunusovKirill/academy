import { useNavigate } from 'react-router-dom';
import '../../menu.css'
import './accounting.css'

function Accounting() {

    const navigate = useNavigate();

    return (
        <ul className='menu__items menu__items-accounting'>
            <li className='menu__items__item menu__items__item-accounting'>Акты инвентаризации</li>
            <li className='menu__items__item menu__items__item-accounting'>Внутризаводские накладные (Приход)</li>
            <li className='menu__items__item menu__items__item-accounting' onClick={() => navigate('/list')}>Внутризаводские накладные (Расход)</li>
            <li className='menu__items__item menu__items__item-accounting'>Лимитные карты (Приход)</li>
            <li className='menu__items__item menu__items__item-accounting'>Цеховая номенклатура</li>
        </ul> 

    )
}

export default Accounting;