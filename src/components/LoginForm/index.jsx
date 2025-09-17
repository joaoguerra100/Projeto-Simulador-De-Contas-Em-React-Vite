import { useContext, useState } from 'react'
import styles from './LoginForm.module.css'
import { ThemeContext } from '../../components/ThemeContext';
import { Link } from 'react-router-dom';

function LoginForm({ onLogin }) {
    const { theme } = useContext(ThemeContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubimit = (e) => {
        e.preventDefault()
        onLogin(email, password)
    }

    return (
        <div className={`${styles.layout} ${theme === 'dark' ? styles.layoutDark : ''}`}>
            <form onSubmit={handleSubimit}>
                <h2>Login</h2>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Ex: Email@.com'
                    />
                </div>

                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Digite sua senha'
                    />
                </div>
                <button type='submit'>Entrar</button>

                <p className={styles.registerLink}>
                    Não tem uma conta? <Link to="/registro">Cadastre-se</Link>
                </p>

            </form>
        </div>
    )
}

export default LoginForm
