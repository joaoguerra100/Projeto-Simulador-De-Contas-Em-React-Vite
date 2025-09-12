import styles from './Home.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Container from '../../components/Container';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <section>
      <Header />

      <div className={styles.container}>
        <Container
          title="Crédito Pessoal"
          description="Solicite empréstimos com rapidez e segurança."
          route="/credito-pessoal"
          navigate={navigate}
        />
        <Container
          title="Financiamento Imobiliário"
          description="Calcule sua entrada e 1ª parcela."
          route="/financiamento-imobiliario"
          navigate={navigate}
        />
        <Container
          title="Investimento (Poupança)"
          description="Veja o rendimento de suas economias."
          route="/investimento"
          navigate={navigate}
        />
      </div>

      <Footer />
    </section>
  );
}

export default Home;
