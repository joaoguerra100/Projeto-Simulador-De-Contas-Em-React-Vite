import styles from './CreditoPessoal.module.css'
import { useState, useEffect } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HistoricoConsultas from '../../components/HistoricoConsultas'

function CreditoPessoal() {
    const [inputs, setInputs] = useState({
        valor: '',
        parcelas: '',
        taxa: ''
    })

    const [resultado, setResultado] = useState(null)
    const [erro, setErro] = useState('')

    const tituloPagina = "Crédito Pessoal";
    const chaveLocalStorage = 'historico_credito_pessoal';
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        const historicoSalvo = localStorage.getItem(chaveLocalStorage);
        if (historicoSalvo) {
            setHistorico(JSON.parse(historicoSalvo));
        }
    }, []);

    useEffect(() => {
        if (historico.length > 0) { // Evita salvar o estado inicial vazio
             localStorage.setItem(chaveLocalStorage, JSON.stringify(historico));
        }
    }, [historico]);

    const limparHistoricoLocal = () => {
        setHistorico([]);
        localStorage.removeItem(chaveLocalStorage);
    };

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        setErro('')
        setResultado(null)
    }

    const handleConsulta = () => {
        const { valor, parcelas, taxa } = inputs
        const valorNum = parseFloat(valor)
        const parcelasNum = parseInt(parcelas)
        const taxaNum = parseFloat(taxa) / 100

        // ... (sua lógica de validação continua a mesma)
        if (isNaN(valorNum) || valorNum <= 0) {
            setErro('⚠️ O campo Valor deve ser um número positivo.')
            return
        }
        if (isNaN(parcelasNum) || parcelasNum <= 0) {
            setErro('⚠️ O campo Parcelas deve ser um número inteiro positivo.')
            return
        }
        if (isNaN(taxaNum) || taxaNum < 0) {
            setErro('⚠️ O campo Taxa deve ser um número positivo.')
            return
        }

        const parcelaMensal = (valorNum * Math.pow(1 + taxaNum, parcelasNum)) / parcelasNum
        const totalPago = parcelaMensal * parcelasNum
        const jurosTotal = totalPago - valorNum
        const porcentagemJuros = (jurosTotal / valorNum) * 100

        const novoResultado = {
            parcelaMensal: parcelaMensal.toFixed(2),
            totalPago: totalPago.toFixed(2),
            porcentagemJuros: porcentagemJuros.toFixed(2)
        }

        setResultado(novoResultado);

        // Prepara os dados para o componente de histórico genérico
        const dadosParaExibir = [
            { rotulo: 'Valor financiado', valor: `R$ ${valor}` },
            { rotulo: 'Número de parcelas', valor: parcelas },
            { rotulo: 'Taxa de juros', valor: `${taxa}%` },
            { rotulo: 'Resultado (Parcela Mensal)', valor: `R$ ${novoResultado.parcelaMensal}` }
        ];

        const novaConsulta = {
            id: Date.now(),
            timestamp: Date.now(),
            dadosParaExibir: dadosParaExibir // Passa o array formatado
        };

        setHistorico([novaConsulta, ...historico]);
    }

    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.container}>
                <h2>{tituloPagina}</h2>

                {/* Input do valor a ser financiado */}
                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="valor">Valor a ser financiado</label>
                        <input 
                            type="number" 
                            name="valor" 
                            placeholder="EX: 1000" 
                            required value={inputs.valor} 
                            onChange={handleChange}
                        />
                    </div>

                    {/* Input do Número de parcelas */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="parcelas">Número de parcelas</label>
                        <input 
                            type="number" 
                            name="parcelas" 
                            placeholder="EX: 12" 
                            required value={inputs.parcelas} 
                            onChange={handleChange}
                        />
                    </div>

                    {/* Input do Número de parcelas */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="taxa">Taxa de juros (%)</label>
                        <input 
                            type="number" 
                            name="taxa" 
                            placeholder="EX: 1.5" 
                            required value={inputs.taxa} 
                            onChange={handleChange}
                        />
                    </div>

                    {/* Resultado dos valores */}
                    <button className={styles.consultarBtn} onClick={handleConsulta}>Simular</button>
                    {erro && <div className={styles.erro}>{erro}</div>}
                    {resultado && (
                        <div className={styles.resultadoCard}>
                            <h3>Resultado da Simulação de Crédito</h3>
                            <p><strong>Parcela mensal:</strong> R$ {resultado.parcelaMensal}</p>
                            <p><strong>Total pago ao final:</strong> R$ {resultado.totalPago}</p>
                            <p><strong>Juros total:</strong> {resultado.porcentagemJuros}%</p>
                        </div>
                    )}
                </div>
                
                {/* Historico de pesquisa */}
                <HistoricoConsultas
                    titulo={tituloPagina}
                    historico={historico}
                    limparHistorico={limparHistoricoLocal}
                />
            </div>
            <Footer />
        </div>
    )
}

export default CreditoPessoal
