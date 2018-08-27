import React, { Component } from 'react';

import DraggableList from 'react-draggable-lists';

export default class App extends Component {
  render() {
    return (
      <div>
        <hi>react-draggable-lists</hi>
        <div style={{ width: 300, margin: '0 auto' }}>
          <DraggableList width={300} height={300} rowSize={1}>
            <div style={{ width: 300, height: 300, background: 'green' }}>
              1
            </div>
            <div style={{ width: 300, height: 300, background: 'blue' }}>2</div>
            <div style={{ width: 300, height: 300, background: 'red' }}>3</div>
          </DraggableList>
        </div>
      </div>
    );
  }
}
