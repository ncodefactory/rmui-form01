import React, { Component } from 'react';
import { uuid4 } from 'fast-uuid';
import PropTypes from 'prop-types';

class ChildForm extends Component {
  static defaultProps = {
    args: {},
    handleResult: () => {},
  };

  static propTypes = {
    args: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })),
    handleResult: PropTypes.func,
    childSource: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      channel: uuid4(),
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.handleFrameMessage);
    this.ifr.onload = () => {
      const { channel } = this.state;
      const { args } = this.props;
      this.ifr.contentWindow.postMessage(
        {
          channel,
          type: 'rmui-forms-comm',
          direction: 'from-parent-to-child',
          args,
        },
        '*',
      );
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameMessage);
  }

  handleFrameMessage = (e) => {
    const { channel } = this.state;
    const { handleResult } = this.props;
    if (
      e.data.type
      && e.data.type === 'rmui-forms-comm'
      && e.data.channel === channel
      && e.data.direction === 'from-child-to-parent'
    ) {
      handleResult(e.data.args);
    }
  };

  render() {
    const { channel } = this.state;
    const { childSource } = this.props;
    return (
      <div>
        <iframe
          id={channel}
          title={channel}
          sandbox="allow-scripts"
          frameBorder="0"
          style={{
            padding: '10px',
            margin: '20px',
            width: '250px',
            height: '250px',
            backgroundColor: 'silver',
          }}
          src={childSource}
          ref={(f) => {
            this.ifr = f;
          }}
        />
      </div>
    );
  }
}

export default ChildForm;
