import { appendToExpression } from '../utils/expression'
import { updateDisplay } from '../utils/display'
import { calculate } from './calculateHandler'
import { clear } from '../logics/clear'
import { backspace } from '../logics/backspace'

export function setupButtonHandlers(display: HTMLElement, buttons: NodeListOf<HTMLButtonElement>) {
    let expression = '';
    
    function refreshDisplay() {
        if (!expression) {
          updateDisplay(display, '0');
        } else {
          updateDisplay(display, expression);
        }
      }

    // Duyệt qua tất cả các nút trên máy tính
    buttons.forEach(btn => {
        // Gắn sự kiện click cho từng nút
        btn.addEventListener('click', () => {
            // Nếu nút này là nút số hoặc dấu chấm (có thuộc tính data-number)
            if (btn.dataset.number !== undefined) {
                // Thêm số/dấu chấm vào biểu thức hiện tại
                expression = appendToExpression(expression, btn.dataset.number);
                // Cập nhật lại màn hình hiển thị
                refreshDisplay();
            }
            // Nếu nút này là nút chức năng (có thuộc tính data-action)
            else if (btn.dataset.action) {
                // Xử lý theo từng loại chức năng
                switch (btn.dataset.action) {
                    case 'add':
                        // Thêm dấu cộng vào biểu thức
                        expression = appendToExpression(expression, '+');
                        break;
                    case 'subtract':
                        // Thêm dấu trừ vào biểu thức
                        expression = appendToExpression(expression, '-');
                        break;
                    case 'multiply':
                        // Thêm dấu nhân vào biểu thức
                        expression = appendToExpression(expression, '×');
                        break;
                    case 'divide':
                        // Thêm dấu chia vào biểu thức
                        expression = appendToExpression(expression, '÷');
                        break;
                    case 'clear':
                        // Xóa toàn bộ biểu thức
                        expression = clear();
                        break;
                    case 'backspace':
                        // Xóa 1 ký tự cuối của biểu thức
                        expression = backspace(expression);
                        break;
                    case 'equals':
                        // Tính toán kết quả của biểu thức
                        expression = calculate(expression);
                        break;
                }
                // Sau khi xử lý chức năng, cập nhật lại màn hình hiển thị
                refreshDisplay();
            }
        });
    });
}