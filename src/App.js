import React, { useEffect, useState } from 'react';
import {ExchangerField} from './component/ExchangerField'
import {API} from "./constant/api";
import {Container, Row, Col, Input} from 'reactstrap'
import {CurrencySlider} from "./component/CurrencySlider";

const  App = () => {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [currencyList, setCurrencyList] = useState({})
    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    useEffect(() => {
        fetch(API)
            .then(res => res.json())
            .then(data => {
                setCurrencyList(data.rates)
                const firstCurrency = Object.keys(data.rates)[0]
                setCurrencyOptions([data.base, ...Object.keys(data.rates)])
                setFromCurrency(data.base)
                setToCurrency(firstCurrency)
                setExchangeRate(data.rates[firstCurrency])
            })
    }, [])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${API}?base=${fromCurrency}&symbols=${toCurrency}`)
                .then(res => res.json())
                .then(data => setExchangeRate(data.rates[toCurrency]))
        }
    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }
    return (
        <Container>
            <CurrencySlider currencyList={currencyList}/>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <h4>You pay</h4>
                        <ExchangerField
                            currencyOptions={currencyOptions}
                            selectedCurrency={fromCurrency}
                            onChangeCurrency={e => setFromCurrency(e.target.value)}
                            onChangeAmount={handleFromAmountChange}
                            amount={fromAmount}
                        />
                        <Row>
                            <Col sm="1">
                                <h2 style={{marginLeft: 10}}>
                                    ⇊
                                </h2>
                            </Col>
                            <Col sm="11">
                                <Input placeholder={`Exchange rate: ${exchangeRate}`} disabled style={{marginBottom: 20}}/>
                            </Col>
                        </Row>
                        <h4>Go media will get</h4>
                        <ExchangerField
                            currencyOptions={currencyOptions}
                            selectedCurrency={toCurrency}
                            onChangeCurrency={e => setToCurrency(e.target.value)}
                            onChangeAmount={handleToAmountChange}
                            amount={toAmount}
                        />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
