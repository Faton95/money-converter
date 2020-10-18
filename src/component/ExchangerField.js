import React from 'react'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';
export const ExchangerField = ({currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, amount}) => {
    return (
        <InputGroup style={{marginBottom: 20}}>
            <InputGroupAddon addonType="prepend">
                <Input type="select" value={selectedCurrency} onChange={onChangeCurrency}>
                    {currencyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Input>
            </InputGroupAddon>
            <Input type="number"placeholder="Value" value={amount} onChange={onChangeAmount} />
        </InputGroup>
    )
}
