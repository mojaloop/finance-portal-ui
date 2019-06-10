import * as React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@reach/dialog';

export default class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      callback: null,
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  show() {
    return callback => (event) => {
      event.preventDefault();

      // TODO: Revisit this pattern
      // eslint-disable-next-line no-param-reassign
      event = {
        ...event,
        target: { ...event.target, value: event.target.value },
      };

      this.setState({
        isOpen: true,
        callback: () => callback(event),
      });
    };
  }

  hide() {
    this.setState({ isOpen: false, callback: null });
  }

  confirm() {
    const { callback } = this.state;
    callback();
    this.hide();
  }

  render() {
    const { children, title, description } = this.props;
    const { isOpen } = this.state;
    return (
      <React.Fragment>
        {children(this.show)}

        {isOpen && (
          <Dialog>
            <h1>{title}</h1>
            <p>{description}</p>

            <button type="button" onClick={this.hide}>Cancel</button>
            <button type="button" onClick={this.confirm}>OK</button>
          </Dialog>
        )}
      </React.Fragment>
    );
  }
}

ConfirmDialog.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};
