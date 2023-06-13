import React from "react";

function CurrencyInput(props){  

    const {options,selectCurrency}=props;
    
    return (<div>
        <input type="number" className="input"/>
        <select value={selectCurrency}>
        {options.map(option => (
            <option value={option}>{option}</option>
        ))}
            
        </select>
    </div>);
}

export default CurrencyInput;