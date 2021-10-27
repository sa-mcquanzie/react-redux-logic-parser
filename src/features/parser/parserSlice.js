import { createSlice } from '@reduxjs/toolkit';
import { reduceAndEvaluateStatement } from './parserHelpers'

const initialState = {
  propositions: [
    { symbol: 'p', truthValue: true },
    { symbol: 'q', truthValue: true }
  ],
  statement: '',
  evaluation: '',
  status: 'idle',
};

export const parserSlice = createSlice({
  name: 'parser',
  initialState,
  reducers: {
    evaluateStatement: (state) => {    
      state.evaluation = reduceAndEvaluateStatement(state);
    },
    updateStatement: (state, action) => {
      state.statement = action.payload;
    },
    togglePValue: (state) => {
      let p = state.propositions[0].truthValue;
      state.propositions[0].truthValue = !p;
    },
    toggleQValue: (state) => {
      let q = state.propositions[1].truthValue;
      state.propositions[1].truthValue = !q;
    },
  },
});

export const { evaluateStatement, updateStatement, togglePValue, toggleQValue } = parserSlice.actions;
export const selectEvaluation = (state) => state.parser.evaluation;
export const selectStatement = (state) => state.parser.statement;
export const selectP = (state) => state.parser.propositions[0];
export const selectQ = (state) => state.parser.propositions[1];
export default parserSlice.reducer;
