// Xử lý logic máy tính
import add from './calculator-logic/add';
import subtract from './calculator-logic/subtract';
import multiply from './calculator-logic/multiply';
import divide from './calculator-logic/divide';

let expression = '';
let result = '';
let lastInput = '';
const operators = ['+', '-', '*', '/'];

export function getExpression() {
  return expression;
}
export function getResult() {
  return result;
}

export function input(value: string) {
  if (value === '.') {
    const parts = expression.split(/\+|-|×|÷/);
    if (parts[parts.length - 1].includes('.')) return;
  }
  expression += value;
  lastInput = value;
}

export function clear() {
  expression = '';
  result = '';
  lastInput = '';
}

export function deleteChar() {
  if (expression.length > 0) {
    expression = expression.slice(0, -1);
    lastInput = expression.slice(-1);
  }
}

export function percent() {
  // Chỉ áp dụng cho số cuối cùng
  const match = expression.match(/(\d+\.?\d*)$/);
  if (match) {
    const num = parseFloat(match[1]);
    const percentValue = (num / 100).toString();
    expression = expression.replace(/(\d+\.?\d*)$/, percentValue);
    lastInput = percentValue.slice(-1);
  }
}

export function calculate() {
  try {
    const evalResult = evaluateExpression(expression);
    if (isNaN(evalResult) || !isFinite(evalResult)) throw new Error('Invalid');
    result = evalResult.toString();
    expression = result;
    lastInput = '';
  } catch {
    result = 'Error';
  }
}

// Hàm parse và tính toán biểu thức chỉ với + - * /
function evaluateExpression(expr: string): number {
  // Thay thế × thành * và ÷ thành /
  expr = expr.replace(/×/g, '*').replace(/÷/g, '/');
  let tokens = expr.match(/(\d*\.?\d+)|[+\-*/]/g);
  if (!tokens) throw new Error('Invalid');
  // Gộp số âm ở đầu hoặc sau toán tử
  let processed: string[] = [];
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '-' && (i === 0 || ['+', '-', '*', '/'].includes(tokens[i - 1]))) {
      // Số âm ở đầu hoặc sau toán tử
      if (i + 1 < tokens.length && /\d/.test(tokens[i + 1][0])) {
        processed.push('-' + tokens[i + 1]);
        i += 2;
        continue;
      } else {
        throw new Error('Invalid');
      }
    }
    processed.push(tokens[i]);
    i++;
  }
  // Kiểm tra token lỗi: số bắt đầu bằng dấu chấm hoặc kết thúc bằng dấu chấm
  for (const token of processed) {
    if (/^\./.test(token) && !/^0\./.test(token)) throw new Error('Invalid');
    if (/\.$/.test(token)) throw new Error('Invalid');
  }
  let stack: (number | string)[] = [];
  i = 0;
  while (i < processed.length) {
    const token = processed[i];
    if (token === '*' || token === '/') {
      const prev = Number(stack.pop());
      const next = Number(processed[++i]);
      const res = token === '*' ? multiply(prev, next) : divide(prev, next);
      stack.push(res);
    } else {
      stack.push(token);
    }
    i++;
  }
  let result = Number(stack[0]);
  i = 1;
  while (i < stack.length) {
    const op = stack[i];
    const num = Number(stack[i + 1]);
    if (op === '+') result = add(result, num);
    if (op === '-') result = subtract(result, num);
    i += 2;
  }
  return result;
} 