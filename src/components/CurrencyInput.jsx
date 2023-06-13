import React from "react";

function CurrencyInput(props){  

    const {options,selectCurrency,onChangeCurrency,amount}=props;
    
    return (<div>
        <input type="number" className="input" value={amount}/>
        <select value={selectCurrency} onChange={onChangeCurrency}>
        {options.map(option => (
            <option value={option}>{option}</option>
        ))}
            
        </select>
    </div>);
}

export default CurrencyInput;