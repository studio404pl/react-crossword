import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { CrosswordContext } from './context';

export default function ActiveClue({ clues }) {
  const { focused, selectedDirection, selectedNumber } = useContext(
    CrosswordContext
  );

  if (
    !focused ||
    !selectedDirection ||
    !selectedNumber ||
    !clues[selectedDirection]
  ) {
    return null;
  }

  const activeClue = clues[selectedDirection].find(
    (clue) => clue.number === selectedNumber
  );

  if (!activeClue) {
    return null;
  }

  return <div className="activeClue">{activeClue.clue}</div>;
}

ActiveClue.propTypes = {
  /** clues for this List's direction */
  clues: PropTypes.shape({
    across: PropTypes.arrayOf(
      PropTypes.shape({
        /** number of the clue (the label shown) */
        number: PropTypes.string.isRequired,
        /** clue text */
        clue: PropTypes.node.isRequired,
        /** whether the answer/guess is correct */
        correct: PropTypes.bool,
      })
    ).isRequired,
    down: PropTypes.arrayOf(
      PropTypes.shape({
        /** number of the clue (the label shown) */
        number: PropTypes.string.isRequired,
        /** clue text */
        clue: PropTypes.node.isRequired,
        /** whether the answer/guess is correct */
        correct: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
};

ActiveClue.defaultProps = {};
