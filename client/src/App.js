import React, { Component } from 'react';
import CurrencyInput from './components/CurrencyInput'
import SliderInput from './components/SliderInput'
import DisplayGraph from './components/DisplayGraph'
import PeriodSelector from './components/PeriodSelector'
import './App.css'
import axios from 'axios'

const API = 'http://localhost:3001/';


class App extends Component {

  constructor(props) {
        super(props);

        this.state = {
            initialSavings: 0,
            monthlyDeposit: 0,
            interestRate: 0,
            interestPaymentFrequency: 1,
            data: []
        };
    }
  //update value held in state
  handleValueUpdate(field, value) {
        console.log(value);
        const parsedValue = parseFloat(value);
        this.setState({ [field]: parsedValue });
  }

  // https://hackernoon.com/tutorial-how-to-make-http-requests-in-react-part-3-daa6b31b66be
  calculateLifeTimeValue() {
    return axios.get(API+this.state.interestPaymentFrequency + '/' + this.state.initialSavings + '/' + this.state.monthlyDeposit + '/' + this.state.interestRate ).then(response => {
       this.setState({data:response.data});
      })
    .catch(function (error) {
        console.log(error);
    })
  }

  componentWillUpdate(nextProps, nextState) {
    this.calculateLifeTimeValue()
  }

  render() {
    
    //update state value on change 
    return (
      <div className="App">
        <div className="header-banner">
          <h1 className="fmz-white-font">Finimize Interest Rate Calculator</h1>
        </div>
				<div className="financial-inputs">
					<p className="input-label">How much have you saved?</p>

					<CurrencyInput 
          defaultValue={this.state.initialSavings}
          field={'initialSavings'}
          onUpdate={this.handleValueUpdate.bind(this)}
          />

					<p className="input-label">How much will you save each month?</p>
					<CurrencyInput 
          defaultValue={this.state.monthlyDeposit}
          field={'monthlyDeposit'}
          onUpdate={this.handleValueUpdate.bind(this)}
          />
          
          <p className="input-label">How often will you be paid interest</p>
          <PeriodSelector 
          field = {'interestPaymentFrequency'}
          onUpdate={this.handleValueUpdate.bind(this)}
          />
					
          <p className="input-label">Interest Rate?</p>
					<SliderInput 
          defaultValue={this.state.interestRate}
          field={'interestRate'}
          onUpdate={this.handleValueUpdate.bind(this)}
          />
          
				</div>
				<div className="financial-display">
					<DisplayGraph data={this.state.data}/>
				</div>
      </div>
    );
  }
}

export default App;


