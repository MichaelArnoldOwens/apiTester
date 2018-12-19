import React, { Component } from 'react';
import Input from './Input';
import Response from './Response';
import {titleCase} from '../utils/string'
import {sendRequest} from '../utils/network';
import PropTypes from 'prop-types';


class ExplorerComponent extends Component {
  state = {
    formInputs: {}
  }
  propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.oneOf(['POST', 'GET', 'PUT', 'DELETE']).isRequired,
    body: PropTypes.object
  }

  handleFieldValueChange = (key) => {
    return (e) => {
      this.setState({formInputs: {...this.state.formInputs, [key]: e.target.value}})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit clicked')
    const {url, method} = this.props;
    const {formInputs} = this.state;
    console.log(formInputs)
    sendRequest({url, method, data: {...formInputs}}).then(response => {
      this.setState({response: JSON.stringify(response)})
    })
  }

  processBody = () => {
    const {body} = this.props;
    const state = this.state;
    let result = [];
    body.forEach(obj => {
      const {name} = obj;
      result.push(
        <div>
          <label>
            {titleCase(name)}
            <Input
              value={state[name] || undefined}
              onChange={this.handleFieldValueChange
              (name)}
              {...obj}
            />
          </label>
        </div>
      )
    })
    return result;
  }

  render() {
    const {body} = this.props;
    const {response} = this.state;
    
    return (
      <div>
        <div>Body</div>
        {body ? this.processBody() : null}

        <input type="submit" value="Submit" onClick={this.handleSubmit}/>

        <Response body={response}/>

      </div>
    );
  }
}

export default ExplorerComponent;
