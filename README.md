# react-draggable-lists

> draggable list app using react & react-motion.

[![NPM](https://img.shields.io/npm/v/react-draggable-lists.svg)](https://www.npmjs.com/package/react-draggable-lists) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This package is included in [react-motion-components](https://github.com/pjb0811/react-motion-components).

## Install

```bash
npm install --save react-draggable-lists
```

## Usage

[demo](https://codesandbox.io/s/ym97587kxx)

```tsx
import * as React from 'react';

import DraggableList from 'react-draggable-lists';

class Example extends React.Component {
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
```

## License

MIT © [pjb0811](https://github.com/pjb0811)
