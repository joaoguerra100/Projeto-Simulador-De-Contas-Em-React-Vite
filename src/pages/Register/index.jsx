import { useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import { register as registerService } from '../../services/auth'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ThemeContext } from '../../components/ThemeContext';
import { useContext } from 'react'
import RegisterForm from '../../components/RegisterForm'

function Register() {
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate()

    const handleRegister = async(email,password,name) => {
        try{
            const response = await registerService(email,password, name)
            alert(response.message)
            navigate('/login')
        } catch(error){
            alert('Falha no registro, Tente novamente')
            console.error(error)
        }
    }
    return (
        <div className={styles.registerPageContainer}>
            <Header/>

            <main className={`${styles.form} ${theme === 'dark' ? styles.formDark : styles.formLight}`}>
                <RegisterForm onRegister={handleRegister} />
            </main>

            <Footer/>
        </div>
    )
}

export default Register