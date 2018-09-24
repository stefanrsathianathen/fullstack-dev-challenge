import React from 'react'

export default class PeriodSelector extends React.Component{
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const compoundPeriod = e.target.value;
  }
  render(){
    return (
      // use a html select to allow user to pick interst frequency payment
      <select id="compoundingPeriod" onChange={this.handleChange}>
          <option value= '12' >
            Monthly
          </option>

          <option value="4">
            Quarterly
          </option>

          <option value="1">
            Annually
          </option>
        </select>
        );
    }

};