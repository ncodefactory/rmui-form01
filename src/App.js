import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Draggable from 'react-draggable';
import ChildForm from './components/ChildForm';

const ActualContent = styled.div`
  border-radius: 4px;
  background: white;
  border: 1px solid rgb(204, 204, 204);
  padding: 10px;
  /* 👇 because of the drag handle */
  padding-top: 0px;
  pointer-events: all;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  .handle {
    height: 10px;
    background: #ddd;
    border-bottom: 5px solid white;
    cursor: move;
    width: 200%;
    margin-left: -50%;
  }
`;

const styleOverrides = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    bottom: 'unset',
    overflow: 'visible',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    position: 'static',
    background: 'none',
    pointerEvents: 'none',
  },
};

const DraggableModal = ({
  isOpen, children, onRequestClose,
}) => (
  <Modal onRequestClose={onRequestClose} isOpen={isOpen} style={styleOverrides}>
    <Draggable handle=".handle" bounds="body">
      <ActualContent>
        <React.Fragment>
          <div className="handle" />
          {children}
        </React.Fragment>
      </ActualContent>
    </Draggable>
  </Modal>
);

DraggableModal.defaultProps = {
  children: null,
  isOpen: false,
  onRequestClose: null,
};

DraggableModal.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  onRequestClose: PropTypes.func,
};

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      outArgs: [],
      isOpen: false,
    };
  }

  render() {
    const inputArgs = [
      { name: 'arg0', value: 'val0' },
      { name: 'arg1', value: 'val1' },
      { name: 'arg2', value: 'val2' },
    ];
    const { outArgs, isOpen } = this.state;
    let outArg = null;
    if (outArgs && outArgs.length > 0) {
      outArg = `${outArgs[0].name}: ${outArgs[0].value}`;
    }
    return (
      <div className="App">
        <h1>rmui-form01</h1>
        <h2>{outArg}</h2>
        <button type="button" onClick={() => this.setState(prevState => ({ outArgs: prevState.outArgs, isOpen: true }))}>CallForm</button>
        <DraggableModal isOpen={isOpen}>
          <ChildForm childSource="http://localhost:3333/" args={inputArgs} handleResult={(args) => { this.setState({ outArgs: args, isOpen: false }); }} />
        </DraggableModal>
      </div>
    );
  }
}

export default App;
