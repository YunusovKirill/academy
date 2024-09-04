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

// -------------------Валидация-------------------

document.addEventListener('DOMContentLoaded', function () {
    const validate = new window.JustValidate('#form', {
        errorFieldCssClass: 'is-invalid',
        errorLabelStyle: {
            color: '#FF0000',
            fontSize: '12px',
        },
    });

    validate
        .addField('#number', [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения',
            },
            {
                rule: 'number',
                errorMessage: 'Номер ВЗН должен содержать только числа',
            },
            {
                rule: 'minNumber',
                value: 0,
                errorMessage: 'Номер ВЗН не может быть отрицательным',
            },
            {
                rule: 'maxNumber',
                value: 99999999999999999999,
                errorMessage: 'Номер ВЗН не должен превышать 20 цифр',
            },
            {
                validator: (value) => {
                    return Number.isInteger(Number(value));
                },
                errorMessage: 'Номер ВЗН должен быть целым числом',
            },
        ])

        .addField('#sender', [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения',
            },
            {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Отправитель должен содержать не более 50 символов',
            },
        ])

        .addField('#receiver', [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения',
            },
            {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Получатель должен содержать не более 50 символов',
            },
        ])

        .addField('#start__date', [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения',
            },
            {
                validator: (value) => {
                    const startDate = new Date(value);
                    return startDate.getFullYear() >= 2020;
                },
                errorMessage: 'Дата начала не может быть раньше 2020 года',
            },
        ])

        .addField('#end__date', [
            {
                rule: 'required',
                errorMessage: 'Поле обязательно для заполнения',
            },
            {
                validator: (value) => {
                    const endDate = new Date(value);
                    const today = new Date();
                    return endDate <= today;
                },
                errorMessage: 'Дата окончания не может быть позже сегодняшнего дня',
            },
        ])
        .onSuccess((event) => {
            const submitButton = document.getElementById('submit__btn');
            submitButton.innerHTML = '';
            submitButton.classList.add('success-icon');

            setTimeout(() => {
                submitButton.classList.add('hidden'); 
            }, 2000);

            setTimeout(() => {
                submitButton.classList.remove('success-icon', 'hidden');
                submitButton.innerHTML = 'Поиск';
            }, 2200);
        });
});