import MainMenu from './MainMenu/MainMenu'
import './menunav.css'
import Settings from './Settings/Settings'
import Tasks from './Tasks/Tasks'

function MenuNav () {
    return (
        <nav className='menu'>
            <MainMenu />
            <Tasks />
            <Settings />
        </nav>
    )
}

export default MenuNav