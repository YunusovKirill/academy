// -------------------Добавление элемента в список-------------------

function addListItem(number) {
    const ul = document.querySelector('.list__items');

    for (let i = 1; i <= number; i++) {
        const li = document.createElement('li');
        li.className = 'list__items__item';

        li.innerHTML = `
            <h2 class="list__items__item__title">ВЗН №${Math.floor(Math.random() * 1000000)}</h2>
            <div class="list__items__item__info">
                <span class="list__items__item__info__title">Отправитель: <span class="list__items__item__info__content">Цех 01</span></span>
                <span class="list__items__item__info__title">Получатель: <span class="list__items__item__info__content">Цех 02</span></span>
                <span class="list__items__item__info__title">Дата выдачи: <span class="list__items__item__info__content">15.06.2024</span></span>
            </div>

        `;

        ul.appendChild(li);
    }
}

addListItem(8);

// -------------------Модальное окно-------------------

document.getElementById('header__btn__search').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'grid';
});

document.getElementById('close__btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('cancel__btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

// Закрытие по клику вне окна
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
});
