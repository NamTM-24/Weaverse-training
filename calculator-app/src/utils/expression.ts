export function appendToExpression(expression: string, value: string): string{
    const operators = ['+' , '-', 'x', '÷'];
    const lastChar = expression.slice(-1); // kí tự cuối cùng
    

    // Nếu value là dấu chấm
    if(value === '.'){
    // Không cho hai dấu chấm liên tiếp
    if (lastChar === '.') {
        return expression;
      }
    // Không cho dấu chấm đầu biểu thức hoặc ngay sau phép toán
    if (!expression || operators.includes(lastChar)) {
        return expression;
      }
    // Không cho nhiều dấu chấm trong cùng một số
    // (tìm số cuối cùng, nếu đã có dấu chấm thì không cho thêm)
    const parts = expression.split(/[+\-×÷]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes('.')) {
        return expression;
      }     
    }

    // Trường hợp còn lại: thêm value vào biểu thức
    return expression + value;
}

export function isOperator(char: string): boolean {
  return ['+', '-', '×', '÷'].includes(char);
}

