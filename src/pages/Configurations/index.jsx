import { useContext, useState, useEffect } from 'react'
import styles from './Configurations.module.css'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { ThemeContext } from '../../components/ThemeContext'

function Configurations() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [fontSize, setFontSize] = useState(16) // Tamanho de fonte padrão em pixels

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize])

  const increaseFontSize = () => setFontSize(prevSize => prevSize + 2)
  const decreaseFontSize = () => setFontSize(prevSize => prevSize - 2)


  return (
    <div className={styles.layout}>
      <Header />
      <div className={`${styles.container} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <h2>Configurações</h2>

        <div>
          <h3>Aparência</h3>
          <button onClick={toggleTheme} className={styles.configButton}>
            Mudar para modo {theme === 'light' ? 'escuro' : 'claro'}
          </button>
        </div>

        <div className={styles.fontSizeControl}>
          <h3>Tamanho da Fonte:</h3>
          <button onClick={decreaseFontSize} className={styles.configButton}>-</button>
          <span>{fontSize}px</span>
          <button onClick={increaseFontSize} className={styles.configButton}>+</button>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Configurations
