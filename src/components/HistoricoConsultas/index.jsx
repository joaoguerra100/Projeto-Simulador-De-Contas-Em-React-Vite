import styles from './HistoricoConsultas.module.css';

function HistoricoConsultas({ titulo, historico, limparHistorico }) {

    const formatarData = (timestamp) => {
        const data = new Date(timestamp);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
        return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    };

    return (
        <div className={styles.historicoContainer}>
            <h3>Histórico de Simulações: {titulo}</h3>
            {historico.length > 0 ? (
                <>
                    <button onClick={limparHistorico} className={styles.limparBtn}>
                        Limpar Histórico
                    </button>
                    <ul className={styles.lista}>
                        {historico.map((item) => (
                            <li key={item.id} className={styles.item}>
                                <div className={styles.itemHeader}>
                                    <strong>Consulta de {titulo}</strong>
                                    <span>{formatarData(item.timestamp)}</span>
                                </div>
                                <div className={styles.itemBody}>
                                    {/* Mapeia dinamicamente os campos de dados */}
                                    {item.dadosParaExibir.map((dado, index) => (
                                        <p key={index}>
                                            <strong>{dado.rotulo}:</strong> {dado.valor}
                                        </p>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Nenhuma simulação foi realizada ainda.</p>
            )}
        </div>
    );
}

export default HistoricoConsultas;
