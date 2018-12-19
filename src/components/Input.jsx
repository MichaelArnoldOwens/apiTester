import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Input extends Component {
  propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string.isRequired,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired
  }

  render() {
    // TODO: style this
    return <input {...this.props} />
  }
}

export default Input;