import { useContext } from 'react'
import styles from './RegisterForm.module.css'
import { ThemeContext } from '../ThemeContext';
import { useState } from 'react';

function RegisterForm({onRegister}) {
    const {theme} = useContext(ThemeContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        //validaçao simples da senha
        if(password !== confirmPassword)
        {
            alert('As senhas nao coincidem!')
            return
        }
        onRegister(email,password,name)
            
    }

    return (
        <div className={`${styles.layout} ${theme === 'dark' ? styles.layoutDark : ''}`}>
            <form onSubmit={handleSubmit}>
                <h2>Cadastro</h2>

                <div>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder='Digite seu nome complet'
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder='Crie uma senha forte'
                    />
                </div>

                <div>
                    <label>Senha:</label>
                    <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder='Confirme sua senha'
                    />
                </div>

                <button type='submit'>Registrar</button>

            </form>
        </div>
    )
}

export default RegisterForm
