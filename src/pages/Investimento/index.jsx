import styles from './Investimento.module.css'
import { useState, useEffect, useContext } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import HistoricoConsultas from '../../components/HistoricoConsultas'
import { ThemeContext } from '../../components/ThemeContext';

function Investimento() {
    const { theme } = useContext(ThemeContext);
    const [inputs, setInputs] = useState({
        valor: '',
        aplicacaoMensal: '',
        tempo: ''
    })

    const [resultado, setResultado] = useState(null)
    const [erro, setErro] = useState('')

    const tituloPagina = "Investimento(Poupança)"
    const chaveLocalStorage = 'historico_investimento_poupança'
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

    const handleChangeTempo = (e) => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
        setErro('')
        setResultado(null)
    }

    const handleConsulta = () => {
        const { valor, aplicacaoMensal, tempo } = inputs
        const valorInicial = parseFloat(valor.replace(/\./g, '').replace(',', '.'))
        const aplicacaoMensalNum = parseFloat(aplicacaoMensal.replace(/\./g, '').replace(',', '.'))
        const tempoNum = parseInt(tempo)

        const taxaMensal = 0.005

        if (isNaN(valorInicial) || valorInicial < 0) {
            setErro('⚠️ O campo Valor inicial deve ser um número positivo.')
            return
        }
        if (isNaN(aplicacaoMensalNum) || aplicacaoMensalNum < 0) {
            setErro('⚠️ O campo Aplicação mensal deve ser um número positivo.')
            return
        }
        if (isNaN(tempoNum) || tempoNum <= 0) {
            setErro('⚠️ O campo Tempo deve ser um número inteiro positivo.')
            return
        }

        let valorFinal = valorInicial
        for (let i = 0; i < tempoNum; i++) {
            valorFinal = (valorFinal + aplicacaoMensalNum) * (1 + taxaMensal)
        }

        const totalInvestido = valorInicial + aplicacaoMensalNum * tempoNum
        const jurosRendidos = valorFinal - totalInvestido
        const taxaEfetiva = (jurosRendidos / totalInvestido) * 100

        const novoResultado = {
            valorFinal: formatarMoeda(valorFinal),
            totalInvestido: formatarMoeda(totalInvestido),
            jurosRendidos: formatarMoeda(jurosRendidos),
            taxaEfetiva: taxaEfetiva.toFixed(2).replace('.', ',')
        }

        setResultado(novoResultado)

        const dadosParaExibir = [
            { rotulo: 'Valor inicial', valor: formatarMoeda(valorInicial) },
            { rotulo: 'Aplicação mensal', valor: formatarMoeda(aplicacaoMensalNum) },
            { rotulo: 'Tempo (meses)', valor: tempoNum },
            { rotulo: 'Valor acumulado ao final', valor: novoResultado.valorFinal },
            { rotulo: 'Total investido', valor: novoResultado.totalInvestido },
            { rotulo: 'Juros rendidos', valor: novoResultado.jurosRendidos },
            { rotulo: 'Taxa de rendimento efetiva', valor: `${novoResultado.taxaEfetiva}%` }
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
                        <label htmlFor="valor">Valor inicial (R$)</label>
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
                        <label htmlFor="aplicacaoMensal">Aplicação mensal (R$)</label>
                        <input
                            type="text"
                            name="aplicacaoMensal"
                            placeholder="EX: 300,00"
                            required
                            value={inputs.aplicacaoMensal}
                            onChange={handleChangeMonetario}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="tempo">Tempo (em meses)</label>
                        <input
                            type="number"
                            name="tempo"
                            placeholder="EX: 12"
                            required
                            value={inputs.tempo}
                            onChange={handleChangeTempo}
                        />
                    </div>

                    <button className={styles.consultarBtn} onClick={handleConsulta}>Simular</button>
                    {erro && <div className={styles.erro}>{erro}</div>}
                    {resultado && (
                        <div className={styles.resultadoCard}>
                            <h3>Resultado do Investimento</h3>
                            <p><strong>Valor Acumulado ao Final:</strong> {resultado.valorFinal}</p>
                            <p><strong>Total Investido:</strong> {resultado.totalInvestido}</p>
                            <p><strong>Juros Rendidos:</strong> {resultado.jurosRendidos}</p>
                            <p><strong>Taxa de rendimento efetiva:</strong> {resultado.taxaEfetiva}%</p>
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

export default Investimento
