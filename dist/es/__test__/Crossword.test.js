"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react2 = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("@testing-library/jest-dom/extend-expect");

var _Crossword = _interopRequireDefault(require("../Crossword"));

afterEach(_react2.cleanup);
var emptyData = {
  across: {},
  down: {}
};
var simpleData = {
  across: {
    1: {
      clue: 'one plus one',
      answer: 'TWO',
      row: 0,
      col: 0
    }
  },
  down: {
    2: {
      clue: 'three minus two',
      answer: 'ONE',
      row: 0,
      col: 2
    }
  }
};
var defaultProps = {
  data: emptyData,
  useStorage: false
};
it('renders without crashing', function () {
  var div = document.createElement('div');

  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], defaultProps), div);

  _reactDom["default"].unmountComponentAtNode(div);
});
it('renders Crossword component correctly', function () {
  var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], defaultProps)),
      container = _render.container,
      getByText = _render.getByText;

  expect(container.firstChild).toHaveClass('crossword');
  expect(getByText('ACROSS')).toHaveTextContent('ACROSS');
  expect(getByText('DOWN')).toHaveTextContent('DOWN');
});
it('renders Crossword component correctly when using storage', function () {
  var _render2 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
    useStorage: true
  }))),
      container = _render2.container,
      getByText = _render2.getByText;

  expect(container.firstChild).toHaveClass('crossword');
  expect(getByText('ACROSS')).toHaveTextContent('ACROSS');
  expect(getByText('DOWN')).toHaveTextContent('DOWN');
});
it('matches snapshot', function () {
  var tree = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], defaultProps)).toJSON();

  expect(tree).toMatchSnapshot();
});
it('creates new gridData when the data changes', function () {
  var clueMatch = /one plus one/;

  var _render3 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], defaultProps)),
      queryByText = _render3.queryByText,
      rerender = _render3.rerender;

  expect(queryByText(clueMatch)).toBeNull();
  rerender( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
    data: simpleData
  })));
  expect(queryByText(clueMatch)).toBeTruthy();
});
it('handles typing', function () {
  var _render4 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
    data: simpleData
  }))),
      getByLabelText = _render4.getByLabelText;

  var input = getByLabelText('crossword-input');

  _userEvent["default"].type(input, 'T', {
    skipClick: true
  });
});
describe('keyboard navigation', function () {
  // Simplify tests by using data that makes a 4x4 grid (so that each cell is
  // 25x25, plus the 0.125 padding):
  //
  //       0 25 50 75
  //    +------------
  //  0 |  T  W  O  .
  // 25 |  .  .  N  O
  // 50 |  .  .  E  .
  // 75 |  .  .  .  .
  var size4Data = {
    across: {
      1: {
        clue: 'one plus one',
        answer: 'TWO',
        row: 0,
        col: 0
      },
      3: {
        clue: 'not yes',
        answer: 'NO',
        row: 1,
        col: 2
      }
    },
    down: {
      2: {
        clue: 'three minus two',
        answer: 'ONE',
        row: 0,
        col: 2
      }
    }
  };
  it('basic typing', function () {
    var _render5 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render5.getByLabelText,
        getByText = _render5.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'ArrowLeft'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText = posForText(getByText('X')),
        x = _posForText.x,
        y = _posForText.y;

    expect(x).toBe('0.125');
    expect(y).toBe('0.125');

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText2 = posForText(getByText('Z'));

    x = _posForText2.x;
    y = _posForText2.y;
    expect(x).toBe('25.125');
    expect(y).toBe('0.125');
  });
  it('home and end (across)', function () {
    var _render6 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render6.getByLabelText,
        getByText = _render6.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'Home'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText3 = posForText(getByText('X')),
        x = _posForText3.x,
        y = _posForText3.y;

    expect(x).toBe('0.125');
    expect(y).toBe('0.125');

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText4 = posForText(getByText('Z'));

    x = _posForText4.x;
    y = _posForText4.y;
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');
  });
  it('home and end (down)', function () {
    var _render7 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render7.getByLabelText,
        getByText = _render7.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-2-down')); // fireEvent.keyDown(input, { key: 'Home' });


    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText5 = posForText(getByText('X')),
        x = _posForText5.x,
        y = _posForText5.y;

    expect(x).toBe('50.125');
    expect(y).toBe('0.125');

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText6 = posForText(getByText('Z'));

    x = _posForText6.x;
    y = _posForText6.y;
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });
  it('left and right (across)', function () {
    var _render8 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render8.getByLabelText,
        getByText = _render8.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'ArrowLeft'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText7 = posForText(getByText('X')),
        x = _posForText7.x,
        y = _posForText7.y;

    expect(x).toBe('0.125');
    expect(y).toBe('0.125');

    _react2.fireEvent.keyDown(input, {
      key: 'ArrowRight'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText8 = posForText(getByText('Z'));

    x = _posForText8.x;
    y = _posForText8.y;
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');
  });
  it('up and down (down)', function () {
    var _render9 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render9.getByLabelText,
        getByText = _render9.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _react2.fireEvent.keyDown(input, {
      key: 'ArrowUp'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText9 = posForText(getByText('X')),
        x = _posForText9.x,
        y = _posForText9.y;

    expect(x).toBe('50.125');
    expect(y).toBe('0.125');

    _react2.fireEvent.keyDown(input, {
      key: 'ArrowDown'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText10 = posForText(getByText('Z'));

    x = _posForText10.x;
    y = _posForText10.y;
    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });
  it('tab switches direction (across to down)', function () {
    var _render10 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render10.getByLabelText,
        getByText = _render10.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Tab'
    }); // switches to 2-down


    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText11 = posForText(getByText('X')),
        x = _posForText11.x,
        y = _posForText11.y;

    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });
  it('tab switches direction (down to across)', function () {
    var _render11 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render11.getByLabelText,
        getByText = _render11.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _react2.fireEvent.keyDown(input, {
      key: 'Tab'
    }); // switches to 1-across


    _react2.fireEvent.keyDown(input, {
      key: 'Home'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText12 = posForText(getByText('X')),
        x = _posForText12.x,
        y = _posForText12.y;

    expect(x).toBe('0.125');
    expect(y).toBe('0.125');
  });
  it('space switches direction (across to down)', function () {
    var _render12 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render12.getByLabelText,
        getByText = _render12.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: ' '
    }); // switches to 2-down


    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText13 = posForText(getByText('X')),
        x = _posForText13.x,
        y = _posForText13.y;

    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });
  it('space switches direction (down to across)', function () {
    var _render13 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render13.getByLabelText,
        getByText = _render13.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _react2.fireEvent.keyDown(input, {
      key: ' '
    }); // switches to 1-across


    _react2.fireEvent.keyDown(input, {
      key: 'Home'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText14 = posForText(getByText('X')),
        x = _posForText14.x,
        y = _posForText14.y;

    expect(x).toBe('0.125');
    expect(y).toBe('0.125');
  });
  it('clicking on input switches direction (across to down)', function () {
    var _render14 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render14.getByLabelText,
        getByText = _render14.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _userEvent["default"].click(input); // switches to 2-down


    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText15 = posForText(getByText('X')),
        x = _posForText15.x,
        y = _posForText15.y;

    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });
  it('clicking on input switches direction (down to across)', function () {
    var _render15 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render15.getByLabelText,
        getByText = _render15.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _userEvent["default"].click(input); // switches to 1-across


    _react2.fireEvent.keyDown(input, {
      key: 'Home'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText16 = posForText(getByText('X')),
        x = _posForText16.x,
        y = _posForText16.y;

    expect(x).toBe('0.125');
    expect(y).toBe('0.125');
  });
  it('clicking on cell when focused switches direction (across to down)', function () {
    var _render16 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render16.getByLabelText,
        getByText = _render16.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    _userEvent["default"].click(getByText('Z')); // switches to 2-down


    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText17 = posForText(getByText('X')),
        x = _posForText17.x,
        y = _posForText17.y;

    expect(x).toBe('50.125');
    expect(y).toBe('50.125');
  });
  it('clicking on cell when focused switches direction (down to across)', function () {
    var _render17 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render17.getByLabelText,
        getByText = _render17.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'ArrowUp'
    });

    _userEvent["default"].click(getByText('Z')); // switches to 1-across


    _react2.fireEvent.keyDown(input, {
      key: 'Home'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var _posForText18 = posForText(getByText('X')),
        x = _posForText18.x,
        y = _posForText18.y;

    expect(x).toBe('0.125');
    expect(y).toBe('0.125');
  });
  it('backspace clears and moves back (across)', function () {
    var _render18 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render18.getByLabelText,
        getByText = _render18.getByText,
        queryByText = _render18.queryByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText19 = posForText(getByText('Z')),
        x = _posForText19.x,
        y = _posForText19.y;

    expect(x).toBe('50.125');
    expect(y).toBe('0.125');

    _react2.fireEvent.keyDown(input, {
      key: 'Backspace'
    });

    expect(queryByText('Z')).toBeNull();

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText20 = posForText(getByText('Z'));

    x = _posForText20.x;
    y = _posForText20.y;
    expect(x).toBe('25.125'); // second col!

    expect(y).toBe('0.125');
  });
  it('backspace clears and moves up (down)', function () {
    var _render19 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render19.getByLabelText,
        getByText = _render19.getByText,
        queryByText = _render19.queryByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText21 = posForText(getByText('Z')),
        x = _posForText21.x,
        y = _posForText21.y;

    expect(x).toBe('50.125');
    expect(y).toBe('50.125');

    _react2.fireEvent.keyDown(input, {
      key: 'Backspace'
    });

    expect(queryByText('Z')).toBeNull();

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText22 = posForText(getByText('Z'));

    x = _posForText22.x;
    y = _posForText22.y;
    expect(x).toBe('50.125');
    expect(y).toBe('25.125'); // second row!
  });
  it('delete clears and does not move back (across)', function () {
    var _render20 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render20.getByLabelText,
        getByText = _render20.getByText,
        queryByText = _render20.queryByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText23 = posForText(getByText('Z')),
        x = _posForText23.x,
        y = _posForText23.y;

    expect(x).toBe('50.125');
    expect(y).toBe('0.125');

    _react2.fireEvent.keyDown(input, {
      key: 'Delete'
    });

    expect(queryByText('Z')).toBeNull();

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText24 = posForText(getByText('Z'));

    x = _posForText24.x;
    y = _posForText24.y;
    expect(x).toBe('50.125'); // still third col!

    expect(y).toBe('0.125');
  });
  it('delete clears and does not move up (down)', function () {
    var _render21 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render21.getByLabelText,
        getByText = _render21.getByText,
        queryByText = _render21.queryByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _react2.fireEvent.keyDown(input, {
      key: 'End'
    });

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText25 = posForText(getByText('Z')),
        x = _posForText25.x,
        y = _posForText25.y;

    expect(x).toBe('50.125');
    expect(y).toBe('50.125');

    _react2.fireEvent.keyDown(input, {
      key: 'Delete'
    });

    expect(queryByText('Z')).toBeNull();

    _react2.fireEvent.keyDown(input, {
      key: 'Z'
    });

    var _posForText26 = posForText(getByText('Z'));

    x = _posForText26.x;
    y = _posForText26.y;
    expect(x).toBe('50.125');
    expect(y).toBe('50.125'); // still third row!
  });
  it('ctrl, meta, alt character go unused', function () {
    var _render22 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render22.getByLabelText,
        queryByText = _render22.queryByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      ctrlKey: true,
      key: 'X'
    });

    expect(queryByText('X')).toBeNull();

    _react2.fireEvent.keyDown(input, {
      altKey: true,
      key: 'X'
    });

    expect(queryByText('X')).toBeNull();

    _react2.fireEvent.keyDown(input, {
      metaKey: true,
      key: 'X'
    });

    expect(queryByText('X')).toBeNull();
  });
  it('unknown keys go unused', function () {
    var _render23 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render23.getByLabelText,
        queryByText = _render23.queryByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.keyDown(input, {
      key: 'BOGUS'
    });

    expect(queryByText('B')).toBeNull();
    expect(queryByText('BOGUS')).toBeNull();
  });
  it('handles "bulk" input (pasting)', function () {
    var _render24 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: size4Data
    }))),
        getByLabelText = _render24.getByLabelText,
        getByText = _render24.getByText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _react2.fireEvent.change(input, {
      target: {
        value: 'XYZ'
      }
    });

    var _posForText27 = posForText(getByText('X')),
        x = _posForText27.x,
        y = _posForText27.y;

    expect(x).toBe('0.125');
    expect(y).toBe('0.125');

    var _posForText28 = posForText(getByText('Y'));

    x = _posForText28.x;
    y = _posForText28.y;
    expect(x).toBe('25.125');
    expect(y).toBe('0.125');

    var _posForText29 = posForText(getByText('Z'));

    x = _posForText29.x;
    y = _posForText29.y;
    expect(x).toBe('50.125');
    expect(y).toBe('0.125');
  });
});
describe('onCorrect callback', function () {
  it('fires onCorrect when an answer is entered', function () {
    var onCorrect = jest.fn();

    var _render25 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onCorrect: onCorrect
    }))),
        getByLabelText = _render25.getByLabelText;

    _userEvent["default"].click(getByLabelText('clue-1-across')); // we don't need to await this, as the onCorrect handler is taking care of
    // that for us...


    _userEvent["default"].type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true
    });

    expect(onCorrect).toBeCalledTimes(1);
    expect(onCorrect).toBeCalledWith('across', '1', 'TWO');
  });
  it('does not fire onCorrect when a wrong answer is entered', function () {
    var onCorrect = jest.fn();

    var _render26 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onCorrect: onCorrect
    }))),
        getByLabelText = _render26.getByLabelText;

    var input = getByLabelText('crossword-input');

    _userEvent["default"].click(getByLabelText('clue-1-across')); // We enter an invalid answer, then a valid one (so we get the onCorrect
    // that gets us out of this test).  Our *not* getting the onCorrect for
    // the first answer is the actual test.


    _userEvent["default"].type(getByLabelText('crossword-input'), 'XXX', {
      skipClick: true
    });

    expect(onCorrect).toBeCalledTimes(0);

    _react2.fireEvent.keyDown(input, {
      key: 'Tab'
    }); // switches to 2-down


    _userEvent["default"].type(getByLabelText('crossword-input'), 'ONE', {
      skipClick: true
    });

    expect(onCorrect).toBeCalledTimes(1);
    expect(onCorrect).toBeCalledWith('down', '2', 'ONE');
  });
});
describe('onCellChange callback', function () {
  it('fires onCellChange when a cell is changed', function () {
    var onCellChange = jest.fn();

    var _render27 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onCellChange: onCellChange
    }))),
        getByLabelText = _render27.getByLabelText;

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _userEvent["default"].type(getByLabelText('crossword-input'), 'T', {
      skipClick: true
    });

    expect(onCellChange).toBeCalledTimes(1);
    expect(onCellChange).toBeCalledWith(0, 0, 'T');
  });
  it('does not fire onCellChange when a cell gets the same value', function () {
    var onCellChange = jest.fn();

    var _render28 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onCellChange: onCellChange
    }))),
        getByLabelText = _render28.getByLabelText;

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _userEvent["default"].type(getByLabelText('crossword-input'), 'T', {
      skipClick: true
    });

    expect(onCellChange).toBeCalledTimes(1);
    onCellChange.mockClear();

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _userEvent["default"].type(getByLabelText('crossword-input'), 'T', {
      skipClick: true
    });

    expect(onCellChange).toBeCalledTimes(0);
  });
});
describe('onCrosswordCorrect callback', function () {
  it('fires onCrosswordCorrect(falsy) when the crossword loads', function () {
    var onCrosswordCorrect = jest.fn();
    (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onCrosswordCorrect: onCrosswordCorrect
    })));
    expect(onCrosswordCorrect).toBeCalledWith(false);
    expect(onCrosswordCorrect).not.toBeCalledWith(true);
  });
  it('fires onCrosswordCorrect(true) when the crossword becomes entirely correct', function () {
    var onCrosswordCorrect = jest.fn();

    var _render29 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onCrosswordCorrect: onCrosswordCorrect
    }))),
        getByLabelText = _render29.getByLabelText;

    onCrosswordCorrect.mockClear();

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _userEvent["default"].type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true
    });

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _userEvent["default"].type(getByLabelText('crossword-input'), 'ON', {
      skipClick: true
    });

    expect(onCrosswordCorrect).toBeCalledTimes(0);

    _userEvent["default"].type(getByLabelText('crossword-input'), 'E', {
      skipClick: true
    });

    expect(onCrosswordCorrect).toBeCalledTimes(1);
    expect(onCrosswordCorrect).toBeCalledWith(true);
  });
  it('fires onCrosswordCorrect(false) when the crossword becomes *not* entirely correct again', function () {
    var onCrosswordCorrect = jest.fn();

    var _render30 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onCrosswordCorrect: onCrosswordCorrect
    }))),
        getByLabelText = _render30.getByLabelText;

    onCrosswordCorrect.mockClear();

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    _userEvent["default"].type(getByLabelText('crossword-input'), 'TWO', {
      skipClick: true
    });

    _userEvent["default"].click(getByLabelText('clue-2-down'));

    _userEvent["default"].type(getByLabelText('crossword-input'), 'ONE', {
      skipClick: true
    });

    expect(onCrosswordCorrect).toBeCalledTimes(1);
    onCrosswordCorrect.mockClear();

    _userEvent["default"].type(getByLabelText('crossword-input'), 'X', {
      skipClick: true
    });

    expect(onCrosswordCorrect).toBeCalledTimes(1);
    expect(onCrosswordCorrect).toBeCalledWith(false);
  });
});
describe('imperative commands', function () {
  it('sets focus when requested', function () {
    var ref = /*#__PURE__*/_react["default"].createRef();

    var _render31 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      ref: ref
    }))),
        getByLabelText = _render31.getByLabelText,
        container = _render31.container;

    var doc = container.ownerDocument; // no focus yet?

    var input = getByLabelText('crossword-input');
    expect(doc.activeElement).not.toBe(input);
    expect(ref.current).toBeTruthy();
    (0, _react2.act)(function () {
      ref.current.focus();
    });
    expect(doc.activeElement).toBe(input);
  });
  it('resets data when requested', function () {
    var ref = /*#__PURE__*/_react["default"].createRef();

    var _render32 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      ref: ref
    }))),
        getByLabelText = _render32.getByLabelText,
        queryByText = _render32.queryByText;

    _userEvent["default"].click(getByLabelText('clue-1-across'));

    var input = getByLabelText('crossword-input');

    _react2.fireEvent.keyDown(input, {
      key: 'X'
    });

    var textEl = queryByText('X');
    expect(textEl).toBeTruthy();
    expect(ref.current).toBeTruthy();
    (0, _react2.act)(function () {
      ref.current.reset();
    });
    textEl = queryByText('X');
    expect(textEl).toBeFalsy();
  });
  it('fills answers when requested', function () {
    var ref = /*#__PURE__*/_react["default"].createRef();

    var _render33 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      ref: ref
    }))),
        queryByText = _render33.queryByText;

    var textEl = queryByText('T');
    expect(textEl).toBeFalsy();
    expect(ref.current).toBeTruthy();
    (0, _react2.act)(function () {
      ref.current.fillAllAnswers();
    });
    textEl = queryByText('T');
    expect(textEl).toBeTruthy();
  });
  it('calls onLoadedCorrect after filling answers', function () {
    var onLoadedCorrect = jest.fn();

    var ref = /*#__PURE__*/_react["default"].createRef();

    (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onLoadedCorrect: onLoadedCorrect,
      ref: ref
    })));
    expect(ref.current).toBeTruthy();
    (0, _react2.act)(function () {
      ref.current.fillAllAnswers();
    });
    expect(onLoadedCorrect).toBeCalledWith([['across', '1', 'TWO'], ['down', '2', 'ONE']]);
  });
  it('calls onCrosswordCorrect after filling answers', function () {
    var onCrosswordCorrect = jest.fn();

    var ref = /*#__PURE__*/_react["default"].createRef();

    (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Crossword["default"], (0, _extends2["default"])({}, defaultProps, {
      data: simpleData,
      onCrosswordCorrect: onCrosswordCorrect,
      ref: ref
    })));
    onCrosswordCorrect.mockClear();
    expect(ref.current).toBeTruthy();
    (0, _react2.act)(function () {
      ref.current.fillAllAnswers();
    });
    expect(onCrosswordCorrect).toBeCalledTimes(1);
    expect(onCrosswordCorrect).toBeCalledWith(true);
  });
});

function posForText(textEl) {
  // get the position from the <rect> that's the first child of the enclosing
  // <g>...
  var rect = textEl.parentElement.firstChild;
  return {
    x: rect.getAttribute('x'),
    y: rect.getAttribute('y')
  };
}