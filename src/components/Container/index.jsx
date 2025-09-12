import { useNavigate } from 'react-router-dom';
import styles from './Container.module.css';
import { FaHandHoldingUsd, FaHome, FaChartLine } from 'react-icons/fa';

function Container({ icon, title, description, route }) {
  const navigate = useNavigate();

  const defaultIcons = {
    'Crédito Pessoal': <FaHandHoldingUsd className={styles.icon} />,
    'Financiamento Imobiliário': <FaHome className={styles.icon} />,
    'Investimento (Poupança)': <FaChartLine className={styles.icon} />,
  };

  return (
    <section className={styles.container}>
      <div className={styles.card} onClick={() => navigate(route)}>
        {icon ? (
          <img src={icon} alt={`${title} ícone`} className={styles.icon} />
        ) : (
          defaultIcons[title] || <FaHandHoldingUsd className={styles.icon} />
        )}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </section>
  );
}

export default Container;
