import '../menunav.css'

function Settings() {
    return (
        <ul className='menu__items'>
            <li className='menu__items__item menu__items__item-settings'>
               <button className='menu__items__item__btn'>Настройка 1</button>
            </li>
            <li className='menu__items__item menu__items__item-settings'>
                <button className='menu__items__item__btn'>Настройка 2</button>
            </li>
        </ul> 
    )
}

export default Settings