import React from 'react';
import { useNavigate } from 'react-router-dom';
import './footer.css'

const Footer: React.FC = () => {

    const navigate = useNavigate();

    const handleMenuClick = () => {
        navigate('/')
    };

    const handleBackClick = () => {
        navigate(-1)
    };

    return (
        <nav className='footer'>
            <button className='footer__btn' onClick={handleMenuClick}>Меню</button>
            <button className='footer__btn'>Сканер</button>
            <button className='footer__btn' onClick={handleBackClick}>Назад</button>
        </nav>
    )
}

export default Footer;