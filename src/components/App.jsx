import React,{useEffect,useState} from 'react';
import '../App.css'
import CurrencyInput from './CurrencyInput';

// require('dotenv').config();
// const BASE_URL="https://api.exchangeratesapi.io/v1/latest? access_key = 93c55177acb601c9ada968fee62d8ef9"
// const BASE_URL = 'https://api.exchangeratesapi.io/latest?access_key=93c55177acb601c9ada968fee62d8ef9'
const BASE_URL="http://data.fixer.io/api/latest?access_key=8899f67f9134580306b5029a7bada1a6"

function App() {

  const [currencyOption,setCurrencyOption]=useState([]);
  const [fromCurrency,setFromCurrency]=useState();
  const[toCurrency,setToCurrency]=useState();
  // amount=whichever value is changed i.e. from or to
  const [amount,setAmount]=useState(1);//default amt to convert =1//since converter works bothways we need to check which on is changed and calc accordingly
  const [exchangeRate,setExchangeRate]=useState();
  // below state: used to check if amount is changed in from or to
  const [amountInFromCurrency,setAmountInFromCurrency]=useState(true);

  // console.log(currencyOption);
  console.log(exchangeRate);
  let toAmount,fromAmount;
  // if from currency is the one that is changed
  if(amountInFromCurrency){
    fromAmount=amount;
    toAmount=amount*exchangeRate;
  }
  else{
    toAmount=amount;
    fromAmount=amount/exchangeRate;
  }


  useEffect(() =>{
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurr=Object.keys(data.rates)[0];
        setCurrencyOption([data.base,...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurr);//set to first curr in rates list
        setExchangeRate(data.rates[firstCurr]);
      })
  },[])//[]-> useEffect will be called only the first time when the app is rendered, if [count]->useEffect called everytime count changes
  return (
    <>
    <h1>Convert</h1>
    <CurrencyInput 
    options={currencyOption}
    selectCurrency={fromCurrency}  
    onChangeCurrency={e => setFromCurrency(e.target.value)}
    amount={fromAmount}
    />
    <div className='equals'>=</div>
    <CurrencyInput
    options={currencyOption}
    selectCurrency={toCurrency}
    onChangeCurrency={e => setToCurrency(e.target.value)}
    amount={toAmount}
    />
    </>
  );
}

export default App;
