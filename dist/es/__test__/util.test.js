"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("@testing-library/jest-dom/extend-expect");

var _util = require("../util");

// afterEach(cleanup);
describe('isAcross()', function () {
  it('returns true for "across"', function () {
    expect((0, _util.isAcross)('across')).toBeTruthy();
  });
  it('returns false for "down"', function () {
    expect((0, _util.isAcross)('down')).toBeFalsy();
  });
});
describe('otherDirection()', function () {
  it('returns "down" for "across"', function () {
    expect((0, _util.otherDirection)('across')).toBe('down');
  });
  it('returns "across" for "down"', function () {
    expect((0, _util.otherDirection)('down')).toBe('across');
  });
});
var one = {
  number: '1'
};
var two = {
  number: '2'
};
describe('byNumber()', function () {
  it('returns 0 when a == b', function () {
    var result = (0, _util.byNumber)(one, one);
    expect(result).toBe(0);
  });
  it('returns <0 when a < b', function () {
    var result = (0, _util.byNumber)(one, two);
    expect(result).toBeLessThan(0);
  });
  it('returns >0 when a > b', function () {
    var result = (0, _util.byNumber)(two, one);
    expect(result).toBeGreaterThan(0);
  });
});
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
describe('calculateExtents()', function () {
  it('applies across length to col', function () {
    var result = (0, _util.calculateExtents)(simpleData, 'across');
    expect(result).toEqual({
      row: 0,
      col: 2
    });
  });
  it('applies down length to row', function () {
    var result = (0, _util.calculateExtents)(simpleData, 'down');
    expect(result).toEqual({
      row: 2,
      col: 2
    });
  });
  it('handles "descending" positions in answers', function () {
    // We're really doing this to exersize the !(primary > primaryMax) case!
    var result = (0, _util.calculateExtents)({
      across: {
        1: {
          row: 0,
          col: 3,
          answer: 'XX'
        },
        2: {
          row: 3,
          col: 0,
          answer: 'YY'
        }
      }
    }, 'across');
    expect(result).toEqual({
      row: 3,
      col: 4
    });
  });
});
describe('createEmptyGrid()', function () {
  it('creates a row-major array', function () {
    var result = (0, _util.createEmptyGrid)(2);
    expect(result[0][1]).toMatchObject({
      row: 0,
      col: 1
    });
    expect(result[1][0]).toMatchObject({
      row: 1,
      col: 0
    });
  });
});
describe('createGridData()', function () {
  it('creates grid data', function () {
    var _createGridData = (0, _util.createGridData)(simpleData),
        size = _createGridData.size,
        gridData = _createGridData.gridData,
        clues = _createGridData.clues;

    var cellDefaults = {
      used: false,
      number: null,
      answer: '',
      across: null,
      down: null,
      locked: false,
      guess: ''
    };
    var expectedData = [[(0, _extends2["default"])({}, cellDefaults, {
      row: 0,
      col: 0,
      used: true,
      number: '1',
      answer: 'T',
      across: '1'
    }), (0, _extends2["default"])({}, cellDefaults, {
      row: 0,
      col: 1,
      used: true,
      answer: 'W',
      across: '1'
    }), (0, _extends2["default"])({}, cellDefaults, {
      row: 0,
      col: 2,
      used: true,
      number: '2',
      answer: 'O',
      across: '1',
      down: '2'
    })], [(0, _extends2["default"])({}, cellDefaults, {
      row: 1,
      col: 0
    }), (0, _extends2["default"])({}, cellDefaults, {
      row: 1,
      col: 1
    }), (0, _extends2["default"])({}, cellDefaults, {
      row: 1,
      col: 2,
      used: true,
      answer: 'N',
      down: '2'
    })], [(0, _extends2["default"])({}, cellDefaults, {
      row: 2,
      col: 0
    }), (0, _extends2["default"])({}, cellDefaults, {
      row: 2,
      col: 1
    }), (0, _extends2["default"])({}, cellDefaults, {
      row: 2,
      col: 2,
      used: true,
      answer: 'E',
      down: '2'
    })]];
    var expectedClues = {
      across: [{
        number: '1',
        clue: simpleData.across[1].clue
      }],
      down: [{
        number: '2',
        clue: simpleData.down[2].clue
      }]
    };
    expect(size).toBe(3);
    expect(gridData).toEqual(expectedData);
    expect(clues).toEqual(expectedClues);
  });
});
describe('fillClues()', function () {
  it('fillClues can fill across', function () {
    var gridData = (0, _util.createEmptyGrid)(3);
    var clues = {
      across: []
    };
    (0, _util.fillClues)(gridData, clues, simpleData, 'across');
    expect(gridData[0][0].used).toBeTruthy();
    expect(gridData[0][0].answer).toBe('T');
    expect(gridData[0][0].across).toBe('1');
    expect(gridData[0][1].used).toBeTruthy();
    expect(gridData[0][1].answer).toBe('W');
    expect(gridData[0][1].across).toBe('1');
    expect(gridData[0][2].used).toBeTruthy();
    expect(gridData[0][2].answer).toBe('O');
    expect(gridData[0][2].across).toBe('1');
    expect(clues).toEqual({
      across: [{
        clue: 'one plus one',
        number: '1'
      }]
    });
  });
  it('fillClues can fill down', function () {
    var gridData = (0, _util.createEmptyGrid)(3);
    var clues = {
      down: []
    };
    (0, _util.fillClues)(gridData, clues, simpleData, 'down');
    expect(gridData[0][2].used).toBeTruthy();
    expect(gridData[0][2].answer).toBe('O');
    expect(gridData[0][2].down).toBe('2');
    expect(gridData[1][2].used).toBeTruthy();
    expect(gridData[1][2].answer).toBe('N');
    expect(gridData[1][2].down).toBe('2');
    expect(gridData[2][2].used).toBeTruthy();
    expect(gridData[2][2].answer).toBe('E');
    expect(gridData[2][2].down).toBe('2');
    expect(clues).toEqual({
      down: [{
        clue: 'three minus two',
        number: '2'
      }]
    });
  });
});
describe('serializeGuesses()', function () {
  it('creates expected data', function () {
    var result = (0, _util.serializeGuesses)([[{
      guess: 'A'
    }, {
      guess: ''
    }, {
      guess: ''
    }], [{
      guess: ''
    }, {
      guess: ''
    }, {
      guess: 'B'
    }], [{
      guess: ''
    }, {
      guess: 'C'
    }, {
      guess: ''
    }]]);
    expect(result).toEqual({
      '0_0': 'A',
      '1_2': 'B',
      '2_1': 'C'
    });
  });
});
describe('deserializeGuesses()', function () {
  it('writes expected data', function () {
    var gridData = [[{
      guess: ''
    }, {
      guess: ''
    }, {
      guess: ''
    }], [{
      guess: ''
    }, {
      guess: ''
    }, {
      guess: ''
    }], [{
      guess: ''
    }, {
      guess: ''
    }, {
      guess: ''
    }]];
    (0, _util.deserializeGuesses)(gridData, {
      '0_0': 'A',
      '1_2': 'B',
      '2_1': 'C'
    });
    expect(gridData).toEqual([[{
      guess: 'A'
    }, {
      guess: ''
    }, {
      guess: ''
    }], [{
      guess: ''
    }, {
      guess: ''
    }, {
      guess: 'B'
    }], [{
      guess: ''
    }, {
      guess: 'C'
    }, {
      guess: ''
    }]]);
  });
  it('ignores out-of-range guesses', function () {
    var gridData = [[{
      guess: ''
    }]];
    (0, _util.deserializeGuesses)(gridData, {
      '0_0': 'A',
      '1_2': 'B',
      '2_1': 'C'
    });
    expect(gridData).toEqual([[{
      guess: 'A'
    }]]);
  });
});
describe('findCorrectAnswers()', function () {
  it('finds correct answers', function () {
    var result = (0, _util.findCorrectAnswers)(simpleData, [[{
      guess: ''
    }, {
      guess: ''
    }, {
      guess: 'O'
    }], [{
      guess: ''
    }, {
      guess: ''
    }, {
      guess: 'N'
    }], [{
      guess: ''
    }, {
      guess: ''
    }, {
      guess: 'E'
    }]]);
    expect(result).toEqual([['down', '2', 'ONE']]);
  });
});
describe('localStorage', function () {
  var storageKey = 'DUMMY';
  var gridData = [[{
    guess: 'X'
  }]];
  var mockStorage;
  var setItem = jest.fn();
  var getItem = jest.fn().mockReturnValue(JSON.stringify({
    guesses: {
      '0_0': 'X'
    }
  }));
  var removeItem = jest.fn();
  beforeEach(function () {
    setItem.mockClear();
    getItem.mockClear();
    removeItem.mockClear();
    mockStorage = jest.spyOn(window, 'localStorage', 'get');
  });
  afterEach(function () {
    mockStorage.mockRestore();
  });

  function withStorage() {
    mockStorage.mockReturnValue({
      setItem: setItem,
      getItem: getItem,
      removeItem: removeItem
    });
  }

  function withoutStorage() {
    mockStorage.mockReturnValue(undefined);
  }

  describe('saveGuesses()', function () {
    it("doesn't fail when localStorage is unavailable", function () {
      withoutStorage();
      (0, _util.saveGuesses)(gridData, storageKey);
      expect(setItem).toHaveBeenCalledTimes(0);
    });
    it('calls setItem when localStorage exists', function () {
      withStorage();
      (0, _util.saveGuesses)(gridData, storageKey);
      expect(setItem).toHaveBeenCalledTimes(1);
      expect(setItem).toHaveBeenCalledWith(storageKey, expect.stringContaining('guesses'));
    });
  });
  describe('loadGuesses()', function () {
    it("doesn't fail when localStorage is unavailable", function () {
      withoutStorage();
      (0, _util.loadGuesses)(gridData, storageKey);
      expect(getItem).toHaveBeenCalledTimes(0);
    });
    it('calls getItem when localStorage exists', function () {
      withStorage();
      var localData = (0, _util.createEmptyGrid)(1);
      (0, _util.loadGuesses)(localData, storageKey);
      expect(getItem).toHaveBeenCalledTimes(1);
      expect(getItem).toHaveBeenCalledWith(storageKey);
      expect(localData).toMatchObject(gridData);
    });
    it("doesn't alter gridData when nothing is found", function () {
      withStorage();
      getItem.mockReturnValue(null);
      var localData = (0, _util.createEmptyGrid)(1);
      (0, _util.loadGuesses)(localData, storageKey);
      expect(getItem).toHaveBeenCalledTimes(1);
      expect(getItem).toHaveBeenCalledWith(storageKey);
      expect(localData).not.toMatchObject(gridData);
    });
  });
  describe('clearGuesses()', function () {
    it("doesn't fail when localStorage is unavailable", function () {
      withoutStorage();
      (0, _util.clearGuesses)(storageKey);
      expect(removeItem).toHaveBeenCalledTimes(0);
    });
    it('calls removeItem when localStorage exists', function () {
      withStorage();
      (0, _util.clearGuesses)(storageKey);
      expect(removeItem).toHaveBeenCalledTimes(1);
      expect(removeItem).toHaveBeenCalledWith(storageKey);
    });
  });
});