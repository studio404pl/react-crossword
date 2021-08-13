"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ActiveClue;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _context = require("./context");

var ActiveClueWrapper = _styledComponents["default"].div.attrs(function (props) {
  return {
    className: "activeClue" + (props.correct ? ' correct' : '')
  };
}).withConfig({
  displayName: "ActiveClue__ActiveClueWrapper",
  componentId: "sc-1nf81vd-0"
})([""]);

function ActiveClue(_ref) {
  var clues = _ref.clues;

  var _useContext = (0, _react.useContext)(_context.CrosswordContext),
      focused = _useContext.focused,
      selectedDirection = _useContext.selectedDirection,
      selectedNumber = _useContext.selectedNumber;

  if (!focused || !selectedDirection || !selectedNumber || !clues[selectedDirection]) {
    return null;
  }

  var activeClue = clues[selectedDirection].find(function (clue) {
    return clue.number === selectedNumber;
  });

  if (!activeClue) {
    return null;
  }

  return /*#__PURE__*/_react["default"].createElement(ActiveClueWrapper, {
    correct: activeClue.correct
  }, activeClue.clue);
}

process.env.NODE_ENV !== "production" ? ActiveClue.propTypes = {
  /** clues for this List's direction */
  clues: _propTypes["default"].shape({
    across: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      /** number of the clue (the label shown) */
      number: _propTypes["default"].string.isRequired,

      /** clue text */
      clue: _propTypes["default"].node.isRequired,

      /** whether the answer/guess is correct */
      correct: _propTypes["default"].bool
    })).isRequired,
    down: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      /** number of the clue (the label shown) */
      number: _propTypes["default"].string.isRequired,

      /** clue text */
      clue: _propTypes["default"].node.isRequired,

      /** whether the answer/guess is correct */
      correct: _propTypes["default"].bool
    })).isRequired
  }).isRequired
} : void 0;
ActiveClue.defaultProps = {};