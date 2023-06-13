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
  console.log(currencyOption);

  useEffect(() =>{
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        setCurrencyOption([data.base,...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(Object.keys(data.rates)[0]);//set to first curr in rates list
      })
  },[])//[]-> useEffect will be called only the first time when the app is rendered, if [count]->useEffect called everytime count changes
  return (
    <>
    <h1>Convert</h1>
    <CurrencyInput 
    options={currencyOption}
    selectCurrency={fromCurrency}  
    />
    <div className='equals'>=</div>
    <CurrencyInput
    options={currencyOption}
    selectCurrency={toCurrency}
    />
    </>
  );
}

export default App;
