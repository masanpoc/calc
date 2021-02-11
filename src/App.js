import './App.css';
import React, { useState, useEffect, useCallback } from 'react';



function App() {
  
  const [display, setDisplay] = useState([]);
  const [item, setItem] = useState([0]);
  const [number, setNumber] = useState([]);
  const [numberList, setNumberList] = useState([]);
  const [operatorList, setOperatorList] = useState([]);
  const [result, setResult] = useState(false);

  
  // const handleUserKeyPress = (event) => {
  //   console.log('press')
  //   const { key, keyCode } = event;

  //   if (keyCode === 8 || keyCode === 46) {
  //     // console.log(keyCode, key);
  //     erase();
  //   }
  //   if (keyCode === 111 || keyCode === 55) {
  //     console.log(numberList, key);
  //     addOperator('/');
  //   }
  //   if (keyCode === 51 || keyCode === 106) {
  //     // console.log(keyCode, key);
  //     addOperator('·');
  //   }
  //   if (keyCode === 107 || keyCode === 187) {
  //     // console.log(keyCode, key);
  //     addOperator('+');
  //   }
  //   if (keyCode === 109 || keyCode === 189) {
  //     // console.log(keyCode, key);
  //     addOperator('-');
  //   }
  //   if (keyCode === 49 || keyCode === 97) {
  //     // console.log(keyCode, key);
  //     addNumber(1);
  //   }
  //   if (keyCode === 50 || keyCode === 98) {
  //     // console.log(keyCode, key);
  //     addNumber(2);
  //   }
  //   if (keyCode === 51 || keyCode === 99) {
  //     // console.log(keyCode, key);
  //     addNumber(3);
  //   }
  //   if (keyCode === 52 || keyCode === 100) {
  //     // console.log(keyCode, key);
  //     addNumber(4);
  //   }
  //   if (keyCode === 53 || keyCode === 101) {
  //     // console.log(keyCode, key);
  //     addNumber(5);
  //   }
  //   if (keyCode === 54 || keyCode === 102) {
  //     // console.log(keyCode, key);
  //     addNumber(6);
  //   }
  //   if (keyCode === 55 || keyCode === 103) {
  //     // console.log(keyCode, key);
  //     addNumber(7);
  //   }
  //   if (keyCode === 56 || keyCode === 104) {
  //     // console.log(keyCode, key);
  //     addNumber(8);
  //   }
  //   if (keyCode === 57 || keyCode === 105) {
  //     // console.log(keyCode, key);
  //     addNumber(9);
  //   }
  //   if (keyCode === 48 || keyCode === 96) {
  //     // console.log(keyCode, key);
  //     addNumber(0);
  //   }
  //   if (keyCode === 190 || keyCode === 110) {
  //     // console.log(keyCode, key);
  //     addNumber('.');
  //   }
  //   if (keyCode === 48 || keyCode === 13) {
  //     // console.log(keyCode, key);
  //     startCalculation();
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('keydown', handleUserKeyPress);

  //   return () => {
  //     window.removeEventListener('keydown', handleUserKeyPress);
  //   }
  // }, []);


  useEffect(() => {
    console.log('number', number);
    if(number.length>0) {
      setItem(number);
    }
  }, [number])

  useEffect(() => {
    console.log('numberList', numberList);
  }, [numberList])

  useEffect(() => {
    console.log('operatorList', operatorList);
  }, [operatorList])
  
  useEffect(() => {
    if(result) {
      calculate();
    }
    console.log(result)
  }, [result])

  const multiply = (num1, num2) => {
    return num1*num2
  }
  const divide = (num1, num2) => {
    return num1/num2
  }
  const sum = (num1, num2) => {
    return num1+num2
  }
  const substract = (num1, num2) => {
    return num1-num2
  }

  const erase = () => {
    setNumber([]);
    setOperatorList([]);
    setNumberList([]);
    setResult(false);
    setDisplay([]);
    setItem(0);
  };

  const addNumber = (el) => {
    // if el == '·' && number.includes '·' --> do nothing 
    // else : operate
    if(el==='.' && number.includes('.')) {
      console.log('not possible')
    }
    else {
      if(!display.includes('=')) {
        setNumber((prevState) => [...prevState, el]);
        setDisplay((prevState) => [...prevState, el]);
      }
      if(display.includes('=')) {
        // console.log('numberList', numberList, 'number', number, 'display', display, 'operatorlist', operatorList);
        setDisplay([el]);
        setNumber((prevState) => [...prevState, el]);
        setNumberList([]);
      }
    }
  };

  const addOperator = (op) => {
    setDisplay((prevState) => [...prevState, op]);
    // if number is empty -> we are changing the operator
    if (number.length === 0) {
      operatorList.pop();
      // update with operator introduced
      setOperatorList((prevState) => [...prevState, op]);
    }
    // if number is not empty
    if(number.length>0) {
      // add + / - or · to operatorList
      setOperatorList((prevState) => [...prevState, op]);
      // add number to numberList
      setNumberList(prevState=>[...prevState, Number(number.join(''))]);
      // setNumber to empty array
      setNumber([]);
    }
    // if we are operating after calculation again --> erase first calculation 
    if(display.includes('=')) {
      while(display.length>1){
        display.shift();
      }
    }
    setItem(op);
  };

  // when click on = --> update NumberList and setNumber to 0
  const startCalculation = () => {
    setNumber([]);
    setResult(true);
    setNumberList(prevState=>[...prevState, Number(number.join(''))]);
  }
  // once we have the numberList updated --> calculate
  const calculate = () => {
    setResult(false);
    setDisplay((prevState) => [...prevState, '=']);
    console.log('calculating');
    // multiply and divide all the correspondent elements of NumberList by order
    while(operatorList.includes('·') || operatorList.includes('/')) {
      if(operatorList.includes('·') && operatorList.includes('/')) {
        if(operatorList.indexOf('·')<operatorList.indexOf('/')){
          // multiply
          console.log('multiplying');
          let index = operatorList.indexOf('·');
          let calculation = multiply(numberList[index], numberList[index+1]);
          operatorList.splice(index, 1);
          numberList.splice(index, 2, calculation);
        }
        else {
          // divide
          console.log('dividing');
          let index = operatorList.indexOf('/');
          let calculation = divide(numberList[index], numberList[index+1]);
          operatorList.splice(index, 1);
          numberList.splice(index, 2, calculation);
        }
      }
      else if(operatorList.includes('·')) {
        console.log('multiplying');
        let index = operatorList.indexOf('·');
        let calculation = multiply(numberList[index], numberList[index+1]);
        operatorList.splice(index, 1);
        numberList.splice(index, 2, calculation);
      }
      else {
        console.log('dividing');
        let index = operatorList.indexOf('/');
        let calculation = divide(numberList[index], numberList[index+1]);
        operatorList.splice(index, 1);
        numberList.splice(index, 2, calculation);
      }
    }
    console.log('numberlist', numberList, 'operatorlist', operatorList.length);
    // sum and substract all the correspondent elements of NumberList by order
    while(operatorList.length>0) {
      if(operatorList.includes('+') && operatorList.includes('-')) {
        if(operatorList.indexOf('+')<operatorList.indexOf('-')){
          // sum
          console.log('summing');
          let index = operatorList.indexOf('+');
          let calculation = sum(numberList[index], numberList[index+1]);
          operatorList.splice(index, 1);
          numberList.splice(index, 2, calculation);
        }
        else {
          // substract
          console.log('substracting');
          let index = operatorList.indexOf('-');
          let calculation = substract(numberList[index], numberList[index+1]);
          operatorList.splice(index, 1);
          numberList.splice(index, 2, calculation);
          console.log(calculation)
        }
      }
      else if(operatorList.includes('+')) {
        
        let index = operatorList.indexOf('+');
        
        let calculation = sum(numberList[index], numberList[index+1]);
         operatorList.splice(index, 1);
        numberList.splice(index, 2, calculation);
        console.log('summing', numberList, operatorList.length);
      }
      else {
        console.log('substracting');
        let index = operatorList.indexOf('-');
        let calculation = substract(numberList[index], numberList[index+1]);
        operatorList.splice(index, 1);
        numberList.splice(index, 2, calculation);
      }
    }
    if(operatorList.length===0){
      setDisplay((prevState) => [...prevState, numberList]);
      setItem(numberList);
    }
  }
  

  return (
    <div className="App">
      <div className='calculator'>
        <div className='result'>
          <span className='operation'>{display}</span>
          <span className='display'>{item}</span>
        </div>
        <div className='button-items'>
          <button onClick={erase} className='ac'>AC</button>
          <button onClick={()=>addOperator('/')} className='o b1'>/</button>
          <button onClick={()=>addOperator('·')} className='o b2'>X</button>
          <button onClick={()=>addNumber(7)} className='n b3'>7</button>
          <button onClick={()=>addNumber(8)} className='n b4'>8</button>
          <button onClick={()=>addNumber(9)} className='n b5'>9</button>
          <button onClick={()=>addOperator('-')} className='o b6'>-</button>
          <button onClick={()=>addNumber(4)} className='n b7'>4</button>
          <button onClick={()=>addNumber(5)} className='n b8'>5</button>
          <button onClick={()=>addNumber(6)} className='n b9'>6</button>
          <button onClick={()=>addOperator('+')} className='o b10'>+</button>
          <button onClick={()=>addNumber(1)} className='n b11'>1</button>
          <button onClick={()=>addNumber(2)} className='n b12'>2</button>
          <button onClick={()=>addNumber(3)} className='n b13'>3</button>
          <button onClick={startCalculation} className='eq'>=</button>
          <button onClick={()=>addNumber(0)} className='n b15'>0</button>
          <button onClick={()=>addNumber('.')} className='p b16'>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
