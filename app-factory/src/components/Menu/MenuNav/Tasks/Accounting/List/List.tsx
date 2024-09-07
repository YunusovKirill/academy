import './list.css';

function List() {
    return (
        <ul className="list__items">
        <li className="list__items__item">
            <h2 className="list__items__item__title">ВЗН №132313</h2>
            <div className="list__items__item__info">
                <span className="list__items__item__info__title">Отправитель: <span className="list__items__item__info__content">Цех 01 / участок Цеха 01</span></span>
                <span className="list__items__item__info__title">Получатель: <span className="list__items__item__info__content">Цех 02 / участок Цеха 02</span></span>
                <span className="list__items__item__info__title">Дата выдачи: <span className="list__items__item__info__content">15.06.2024</span></span>
            </div>
        </li>
    </ul> 

    )
}

export default List;