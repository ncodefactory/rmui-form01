import React, { Component } from 'react';
import './App.css';
import ChildForm from './components/ChildForm';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      outArgs: [],
    };
  }

  render() {
    const inputArgs = [
      { name: 'arg0', value: 'val0' },
      { name: 'arg1', value: 'val1' },
      { name: 'arg2', value: 'val2' },
    ];
    const { outArgs } = this.state;
    let outArg = null;
    if (outArgs && outArgs.length > 0) {
      outArg = `${outArgs[0].name}: ${outArgs[0].value}`;
    }
    return (
      <div className="App">
        <h1>rmui-form01</h1>
        <h2>{outArg}</h2>
        <ChildForm
          childSource="http://localhost:3333/"
          args={inputArgs}
          handleResult={(args) => {
            this.setState({ outArgs: args });
          }}
        />
      </div>
    );
  }
}

export default App;
