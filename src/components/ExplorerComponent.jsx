import React, { Component } from 'react';
import Input from './Input';
import {titleCase} from '../utils/string'
import {sendRequest} from '../utils/network';
import PropTypes from 'prop-types';
import './ExplorerComponent.scss'


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
            <div className="field-title">{titleCase(name)}</div>
            <div>
              <Input
                value={state[name] || undefined}
                onChange={this.handleFieldValueChange
                (name)}
                {...obj}
              />
            </div>
          </label>
        </div>
      )
    })
    return result;
  }

  render() {
    const {body, method, url} = this.props;
    const {response} = this.state;
    
    return (
      <div className="container">
        <div className="title-method">{method}</div>
        <div className="base-url">
          <div>Base URL</div>
          <div>{url}</div>
        </div>
        <div className="title">Body</div>
        {body ? this.processBody() : null}

        <input className="field-submit" type="submit" value="Send request" onClick={this.handleSubmit}/>

        <div className="title">Response</div>
        <div className="response-field">{response || ''}</div>
        

      </div>
    );
  }
}

export default ExplorerComponent;
