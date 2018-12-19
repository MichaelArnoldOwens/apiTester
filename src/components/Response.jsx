import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Response extends Component {
  propTypes = {
    body: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.body !== this.props.body
  }

  render() {
    // TODO: Style this
    // TODO: make textarea readonly!
    const {body} = this.props;
    console.log('in response comp:')
    console.log(body)

    return (
      <div>
        <label>
          Response
          <div>
            <textarea readonly>
              {body || ''}</textarea>
          </div>
        </label>
      </div>
    )
  }
}

export default Response