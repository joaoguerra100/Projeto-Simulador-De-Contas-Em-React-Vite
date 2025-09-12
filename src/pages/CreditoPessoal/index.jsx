import styles from './CreditoPessoal.module.css'
import { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

function CreditoPessoal() {
    const [inputs, setInputs] = useState({
        valor: '',
        parcelas: '',
        taxa: ''
    })

    const [resultado, setResultado] = useState(null)
    const [erro, setErro] = useState('')

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

        if (isNaN(valorNum)) {
            setErro('⚠️ Preencha o campo de Valor.')
            return
        }

        if (isNaN(parcelasNum)) {
            setErro('⚠️ Preencha o campo de Parcelas.')
            return
        }

        if (isNaN(taxaNum)) {
            setErro('⚠️ Preencha o campo de Taxa.')
            return
        }

        const parcelaMensal = (valorNum * Math.pow(1 + taxaNum, parcelasNum)) / parcelasNum
        const totalPago = parcelaMensal * parcelasNum
        const jurosTotal = totalPago - valorNum
        const porcentagemJuros = (jurosTotal / valorNum) * 100

        setResultado({
            parcelaMensal: parcelaMensal.toFixed(2),
            totalPago: totalPago.toFixed(2),
            porcentagemJuros: porcentagemJuros.toFixed(2)
        })
    }

    return (
        <div className={styles.layout}>
            <Header />
            <div className={styles.container}>
                <h2>Crédito Pessoal</h2>

                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="valor">Valor a ser financiado</label>
                        <input
                            type="number"
                            name="valor"
                            placeholder="EX: 1000"
                            required
                            value={inputs.valor}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </div>

                    <button className={styles.consultarBtn} onClick={handleConsulta}>
                        Simular
                    </button>

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
            </div>
            <Footer />
        </div>
    )
}

export default CreditoPessoal
