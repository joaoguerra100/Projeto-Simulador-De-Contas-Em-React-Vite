import styles from './FinanciamentoImobiliario.module.css'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { useContext, useEffect, useState } from 'react'
import HistoricoConsultas from '../../components/HistoricoConsultas'
import { ThemeContext } from '../../components/ThemeContext';

function FinanciamentoImobiliario() {
    const { theme } = useContext(ThemeContext);
    const [inputs, setInputs] = useState({
        valor: '',
        entrada: '',
        parcela: ''
    })

    const [resultado, setResultado] = useState(null)
    const [erro, setErro] = useState('')

    const tituloPagina = "Financiamento Imobiliário"
    const chaveLocalStorage = 'historico_financiamento_imobiliario'
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

    const handleChange = (e) => {
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

    const handleConsulta = () => {
        const { valor, entrada, parcela } = inputs
        const valorNum = parseFloat(valor.replace(/\./g, '').replace(',', '.'))
        const entradaNum = parseFloat(entrada.replace(/\./g, '').replace(',', '.'))
        const parcelaNum = parseFloat(parcela.replace(/\./g, '').replace(',', '.'))

        if (isNaN(valorNum) || valorNum <= 0) {
            setErro('⚠️ O campo Valor deve ser um número positivo.')
            return
        }
        if (isNaN(entradaNum) || entradaNum < 0 || entradaNum >= valorNum) {
            setErro('⚠️ A entrada deve ser menor que o valor do imóvel e positiva.')
            return
        }
        if (isNaN(parcelaNum) || parcelaNum <= 0) {
            setErro('⚠️ O campo Parcela deve ser um número positivo.')
            return
        }

        const valorFinanciado = valorNum - entradaNum
        const taxaJurosMensal = 0.006434

        const numerador = parcelaNum / (parcelaNum - valorFinanciado * taxaJurosMensal)
        if (numerador <= 0) {
            setErro('⚠️ O valor da parcela é muito baixo para este financiamento.')
            return
        }

        const prazoMeses = Math.log(numerador) / Math.log(1 + taxaJurosMensal)
        const prazoAnos = prazoMeses / 12
        const porcentagemJuros = (taxaJurosMensal * 12 * 100).toFixed(2)

        const novoResultado = {
            valorFinanciado: formatarMoeda(valorFinanciado),
            parcelaMensal: formatarMoeda(parcelaNum),
            prazoMeses: Math.ceil(prazoMeses),
            prazoAnos: prazoAnos.toFixed(1),
            porcentagemJuros
        }

        setResultado(novoResultado)

        const dadosParaExibir = [
            { rotulo: 'Valor financiado', valor: novoResultado.valorFinanciado },
            { rotulo: 'Valor da parcela', valor: novoResultado.parcelaMensal },
            { rotulo: 'Tempo para quitar', valor: `${novoResultado.prazoMeses} meses (${novoResultado.prazoAnos} anos)` },
            { rotulo: 'Taxa de Juros Anual', valor: `${novoResultado.porcentagemJuros}%` }
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
                        <label htmlFor="valor">Valor do imóvel(R$)</label>
                        <input
                            type="text"
                            name="valor"
                            placeholder="EX: 300.000,00"
                            required
                            value={inputs.valor}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="entrada">Valor da entrada(R$)</label>
                        <input
                            type="text"
                            name="entrada"
                            placeholder="EX: 60.000,00"
                            required
                            value={inputs.entrada}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="parcela">Valor da parcela desejada(R$)</label>
                        <input
                            type="text"
                            name="parcela"
                            placeholder="EX: 2.000,00"
                            required
                            value={inputs.parcela}
                            onChange={handleChange}
                        />
                    </div>

                    <button className={styles.consultarBtn} onClick={handleConsulta}>Simular</button>
                    {erro && <div className={styles.erro}>{erro}</div>}
                    {resultado && (
                        <div className={styles.resultadoCard}>
                            <h3>Resultado do Financiamento</h3>
                            <p><strong>Valor Financiado:</strong> {resultado.valorFinanciado}</p>
                            <p><strong>Valor da Parcela:</strong> {resultado.parcelaMensal}</p>
                            <p><strong>Tempo para quitar:</strong> {resultado.prazoMeses} meses ({resultado.prazoAnos} anos)</p>
                            <p><strong>Taxa de Juros Anual:</strong> {resultado.porcentagemJuros}%</p>
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

export default FinanciamentoImobiliario
