import { useSelector, useDispatch } from 'react-redux';
import {
  evaluateStatement,
  updateStatement,
  selectEvaluation,
  selectStatement,
  selectP,
  selectQ,
  togglePValue,
  toggleQValue
} from './parserSlice'

export function Parser() {
  const dispatch = useDispatch();
  const evaluatedStatement = useSelector(selectEvaluation);
  const pValue = useSelector(selectP).truthValue;
  const qValue = useSelector(selectQ).truthValue;
  const statement = useSelector(selectStatement);

  return (
    <div>
      <div>
        <div>
          <span>
            <label>p is {String(pValue)}
              <input
                style={{opacity: 0}}
                onChange={(event) => dispatch(togglePValue(event.target.checked))}
                type="checkbox"
                checked={pValue} />
              </label>
          </span>
        </div>
        <div>
          <span>
            <label>q is {String(qValue)}
              <input
                style={{opacity: 0}}
                onChange={(event) => dispatch(toggleQValue(event.target.checked))}
                type="checkbox"
                checked={qValue} />
              </label>
          </span>
        </div>
        <input
          onChange={(event) => dispatch(updateStatement(event.target.value))} />
        <button
          aria-label="Evaluate statement"
          onClick={() => dispatch(evaluateStatement())}>
          Evaluate!
        </button>
      </div>
      <div>{statement} {evaluatedStatement ? 'is' : ''} {statement ? evaluatedStatement : ''}</div>
    </div>
  )
}
