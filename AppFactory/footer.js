const footer = document.createElement('footer');

footer.innerHTML = `
    <nav class="footer">
        <button class="footer__btn">Меню</button>
        <button class="footer__btn">Сканер</button>
        <button id="footer__btn-back" class="footer__btn">Назад</button>
    </nav>
`;

document.body.appendChild(footer);

document.getElementById('footer__btn-menu').addEventListener('click', function() {
    window.location.href = 'index.html';
});

document.getElementById('footer__btn-back').addEventListener('click', function() {
    history.back();
});
