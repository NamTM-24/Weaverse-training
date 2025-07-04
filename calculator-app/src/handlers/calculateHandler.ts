import { add } from "../logics/add";
import { subtract } from '../logics/subtract';
import { multiply } from '../logics/multiply';
import { divide } from '../logics/divide';

export function calculate(expression: string): string {
    if (!expression) return 'Error';

    let exp = expression.replace(/×/g, '*').replace(/÷/g, '/');

    const numberPattern = /(\d+(\.\d+)?)/g;
    const operatorPattern = /[+\-*/]/g;

    const numbers = exp.match(numberPattern)?.map(Number);
    const operators = exp.match(operatorPattern);

    if (!numbers || numbers.length === 0) return 'Error';

    // Thực hiện nhân chia trước
    let i = 0;
    while (operators && i < operators.length) {
        if (operators[i] === '*' || operators[i] === '/') {
            const a = numbers[i];
            const b = numbers[i + 1];
            let result: number;
            if (operators[i] === '*') {
                result = multiply(a, b);
            } else {
                if (b === 0) return 'Error';
                result = divide(a, b);
            }
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
        } else {
            i++;
        }
    }

    // Thực hiện cộng trừ
    let result = numbers[0];
    if (operators) {
        for (let j = 0; j < operators.length; j++) {
            const op = operators[j];
            const num = numbers[j + 1];
            if (op === '+') {
                result = add(result, num);
            } else if (op === '-') {
                result = subtract(result, num);
            }
        }
    }

    // Kiểm tra kết quả
    if (typeof result === 'number' && isFinite(result)) {
        return result.toString();
    }
    return 'Error';
}
