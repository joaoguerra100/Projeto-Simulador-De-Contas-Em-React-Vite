import styles from './CreditoPessoal.module.css'
import { useState, useEffect, useContext } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HistoricoConsultas from '../../components/HistoricoConsultas'
import { ThemeContext } from '../../components/ThemeContext';

function CreditoPessoal() {
    const { theme } = useContext(ThemeContext);
    const [inputs, setInputs] = useState({
        valor: '',
        parcelas: '',
        taxa: ''
    })

    const [resultado, setResultado] = useState(null)
    const [erro, setErro] = useState('')

    const tituloPagina = "Crédito Pessoal"
    const chaveLocalStorage = 'historico_credito_pessoal'
    const [historico, setHistorico] = useState([])

    useEffect(() => {
        const historicoSalvo = localStorage.getItem(chaveLocalStorage)
        if (historicoSalvo) {
            setHistorico(JSON.parse(historicoSalvo))
        }
    }, [])

    useEffect(() => {
        if (historico.length > 0) {
            localStorage.setItem(chaveLocalStorage, JSON.stringify(historico))
        }
    }, [historico])

    const limparHistoricoLocal = () => {
        setHistorico([])
        localStorage.removeItem(chaveLocalStorage)
    }

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor)
    }

    const handleChangeMonetario = (e) => {
        const { name, value } = e.target
        const valorNumerico = value.replace(/\D/g, '')
        const valorFormatado = (parseFloat(valorNumerico) / 100).toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        setInputs({ ...inputs, [name]: valorFormatado })
        setErro('')
        setResultado(null)
    }

    const handleChangePadrao = (e) => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
        setErro('')
        setResultado(null)
    }

    const handleConsulta = () => {
        const { valor, parcelas, taxa } = inputs
        const valorNum = parseFloat(valor.replace(/\./g, '').replace(',', '.'))
        const parcelasNum = parseInt(parcelas)
        const taxaNum = parseFloat(taxa) / 100

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
            parcelaMensal: formatarMoeda(parcelaMensal),
            totalPago: formatarMoeda(totalPago),
            porcentagemJuros: porcentagemJuros.toFixed(2).replace('.', ',')
        }

        setResultado(novoResultado)

        const dadosParaExibir = [
            { rotulo: 'Valor financiado', valor: formatarMoeda(valorNum) },
            { rotulo: 'Número de parcelas', valor: parcelasNum },
            { rotulo: 'Taxa de juros', valor: `${taxa}%` },
            { rotulo: 'Resultado (Parcela Mensal)', valor: novoResultado.parcelaMensal }
        ]

        const novaConsulta = {
            id: Date.now(),
            timestamp: Date.now(),
            dadosParaExibir
        }

        setHistorico([novaConsulta, ...historico])
    }

    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.container}>
                <h2>{tituloPagina}</h2>

                <form className={`${styles.form} ${theme === 'dark' ? styles.formDark : styles.formLight}`}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="valor">Valor a ser financiado (R$)</label>
                        <input
                            type="text"
                            name="valor"
                            placeholder="EX: 1.000,00"
                            required
                            value={inputs.valor}
                            onChange={handleChangeMonetario}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="parcelas">Número de parcelas</label>
                        <input
                            type="number"
                            name="parcelas"
                            placeholder="EX: 12"
                            required
                            value={inputs.parcelas}
                            onChange={handleChangePadrao}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="taxa">Taxa de juros (%)</label>
                        <input
                            type="number"
                            name="taxa"
                            placeholder="EX: 1.5"
                            required
                            value={inputs.taxa}
                            onChange={handleChangePadrao}
                        />
                    </div>

                    <button className={styles.consultarBtn} onClick={handleConsulta}>Simular</button>
                    {erro && <div className={styles.erro}>{erro}</div>}
                    {resultado && (
                        <div className={styles.resultadoCard}>
                            <h3>Resultado da Simulação de Crédito</h3>
                            <p><strong>Parcela mensal:</strong> {resultado.parcelaMensal}</p>
                            <p><strong>Total pago ao final:</strong> {resultado.totalPago}</p>
                            <p><strong>Juros total:</strong> {resultado.porcentagemJuros}%</p>
                        </div>
                    )}
                </form>

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
