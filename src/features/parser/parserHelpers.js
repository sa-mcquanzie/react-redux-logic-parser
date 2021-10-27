const operandRegex = /(?=\band\b|\bor\b|\bxor\b|\bthen\b|\bnor\b|\biff\b|\bif\b)|(?<=\band\b|\bor\b|\bxor\b|\bthen\b|\bnor\b|\biff\b|\bif\b)/g

export function evaluatePropositionPair(propositions, propositionString) {
  const [sym1, operandString, sym2]  = propositionString
  .split(operandRegex)
  .map(str => str.trim());

  const p1 = propositions.find(proposition => proposition.symbol === sym1).truthValue
  const p2 = propositions.find(proposition => proposition.symbol === sym2).truthValue

  switch (operandString) {
    case 'and':
    return String(p1 && p2);
    case 'or':
    return String(p1 || p2);
    case 'xor':
    return String((p1 || p2) && !(p1 && p2));
    case 'nor':
    return String(!(p1 || p2));
    case 'then':
    return String(!(p1 && !p2));
    case 'if':
    return String(!(!p1 && p2));
    case 'iff':
    return String((p1 && p2) || !(p1 || p2));
    default:
    return `p1: ${p1} p2: ${p2} ${propositionString} is not a valid statement`
  }
}

export function reduceAndEvaluateStatement(state) {
  let str = state.statement.slice();

  if (!(str.includes('(') || str.includes(')'))) return evaluatePropositionPair(state.propositions, str);

  let evaluatedString = str;

  while (evaluatedString.includes('(') && evaluatedString.includes(')')) {
    evaluatedString = reduceInnermostBrackets(state, evaluatedString);
  }

  return evaluatedString;
}

export function reduceInnermostBrackets(state, str) {
  let index = 0;
  let lastOpeningBracket = 0;
  let fullString = str;
  let reducedString;

  for (let character of fullString) {
    if (character === '(') lastOpeningBracket = index;

    if (character === ')') {
      let first = fullString.substring(0, lastOpeningBracket);
      let second = evaluatePropositionPair(state.propositions, fullString.substring(lastOpeningBracket + 1, index));
      let last = fullString.substring(index + 1);

      reducedString =
      first ? first : ''
      + second ? second : ''
      + last ? last : ''
      break;
    }
    
    index ++;
  }

  return reducedString;
}