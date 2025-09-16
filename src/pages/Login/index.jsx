import { useContext } from 'react';
import styles from './Login.module.css'
import { AuthContext } from '../../contexts/AuthContext'
import LoginForm from '../../components/LoginForm'
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ThemeContext } from '../../components/ThemeContext';


function Login() {
    const { login, isAuthenticated } = useContext(AuthContext)
    const { theme } = useContext(ThemeContext);

    // Se o usuário já estiver logado, redireciona para a home
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.loginPageContainer}>
            <Header />
            <div className={`${styles.form} ${theme === 'dark' ? styles.formDark : styles.formLight}`}>
                <LoginForm onLogin={login} />
            </div>
            <Footer />
        </div>
    )
}

export default Login