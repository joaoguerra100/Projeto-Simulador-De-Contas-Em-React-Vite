import { useContext, useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import {AuthContext} from '../../contexts/AuthContext'

function Header() {
    const [showMenu, setShowMenu] = useState(false)
    const {logout} = useContext(AuthContext) //Acessar a funçao de logout de contexto

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const handleLogout = () => {
        logout()
        toggleMenu()
    }

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.banner}></Link>
            <nav
                className={`${styles.menuSandwich} ${showMenu ? styles.show : ''}`}
                onClick={toggleMenu}
            >
                <Link to="/">Home</Link>
                <Link to="/configuracoes">Configuraçoes</Link>
                <Link to="/login" onClick={handleLogout}>Logout</Link>
            </nav>
            <div
                className={styles.menuButton}
                onClick={toggleMenu}
            >
                <span className={styles.linha}></span>
                <span className={styles.linha}></span>
                <span className={styles.linha}></span>
            </div>
        </header>
    );
}

export default Header;
