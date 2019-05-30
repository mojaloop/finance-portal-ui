/* eslint-disable */
// TODO: Remove previous line and work through linting issues at next edit

import * as React from 'react';
import { Dialog } from '@reach/dialog';

export default class ConfirmStatusChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      callback: null,
    };
  }

  show() {
    return callback => (event) => {
      event.preventDefault();

      event = {
        ...event,
        target: { ...event.target, value: event.target.value },
      };

      this.setState({
        open: true,
        callback: () => callback(event),
      });
    };
  }

  hide() {
    this.setState({ open: false, callback: null });
  }

  confirm() {
    this.state.callback();
    this.hide();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children(this.show)}

        {this.state.open && (
          <Dialog>
            <h1>{this.props.title}</h1>
            <p>{this.props.description}</p>

            <button onClick={this.hide}>Cancel</button>
            <button onClick={this.confirm}>OK</button>
          </Dialog>
        )}
      </React.Fragment>
    );
  }
}
