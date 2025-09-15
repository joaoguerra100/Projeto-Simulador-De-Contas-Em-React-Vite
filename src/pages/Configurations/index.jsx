import { useContext } from 'react'
import styles from './Configurations.module.css'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { ThemeContext } from '../../components/ThemeContext'

function Configurations() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  

  return (
    <div className={styles.layout}>
      <Header />
      <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <h2>Configurações</h2>
        <button onClick={toggleTheme}>
          Mudar para modo {theme === 'light' ? 'escuro' : 'claro'}
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Configurations
