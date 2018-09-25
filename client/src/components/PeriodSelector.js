import React from 'react'
import PropTypes from 'prop-types'

export default class PeriodSelector extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      value: props.defaultValue
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({value});
    if (this.props.onUpdate) {
            this.props.onUpdate(this.props.field, value);
        }
  }
  render(){
    return (
      <div value={this.state.value}>
        <select 
          onChange={this.handleChange.bind(this)}>
          <option value="1">
            Annually
          </option>
          <option value= '12' >
            Monthly
          </option>
          <option value="4">
            Quarterly
          </option>
        </select>
      </div>

        );
    }

};

PeriodSelector.propTypes = {
    field: PropTypes.string,
    onUpdate: PropTypes.func
};