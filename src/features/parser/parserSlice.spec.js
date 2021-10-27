import parserReducer, {
  evaluateStatement,
} from './parserSlice';

describe('parser reducer', () => {
  const initialState = {
    propositions: [
      { symbol: 'p', truthValue: true },
      { symbol: 'q', truthValue: true }
    ],
    statement: 'p and q',
    evaluation: '',
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(parserReducer(undefined, { type: 'unknown' })).toEqual({
      propositions: [
        { symbol: 'p', truthValue: true },
        { symbol: 'q', truthValue: true }
      ],
      statement: '',
      evaluation: '',
      status: 'idle',
    });
  });

  it('should correctly evaluate single statement pairs without brackets', () => {
    const actual = parserReducer(initialState, evaluateStatement());
    expect(actual.evaluation).toEqual('true');
  });
});
