// Xử lý sự kiện bàn phím và click
import { updateDisplay } from './ui';
import { getExpression, getResult, input, clear, deleteChar, percent, calculate } from './calculator';

export function registerEvents() {
  // Lấy các nút và phần hiển thị
  const keypad = document.querySelector('.calculator-keypad') as HTMLElement;
  let justCalculated = false;

  function refreshUI() {
    if (justCalculated) {
      updateDisplay(getResult());
    } else {
      updateDisplay(getExpression());
    }
  }

  // Xử lý click nút
  keypad.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.classList.contains('btn')) return;
    if (target.hasAttribute('data-value')) {
      input(target.getAttribute('data-value') || '');
      justCalculated = false;
    } else if (target.hasAttribute('data-action')) {
      const action = target.getAttribute('data-action');
      if (action === 'clear') { clear(); justCalculated = false; }
      else if (action === 'delete') { deleteChar(); justCalculated = false; }
      else if (action === 'percent') { percent(); justCalculated = false; }
      else if (action === 'equals') { calculate(); justCalculated = true; }
      else if (action === 'add') { input('+'); justCalculated = false; }
      else if (action === 'subtract') { input('-'); justCalculated = false; }
      else if (action === 'multiply') { input('×'); justCalculated = false; }
      else if (action === 'divide') { input('÷'); justCalculated = false; }
    }
    refreshUI();
  });

  // Xử lý bàn phím
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) return;
    if (e.key >= '0' && e.key <= '9') {
      input(e.key); justCalculated = false;
    } else if (e.key === '.') {
      input('.'); justCalculated = false;
    } else if (e.key === '+' || e.key === '-') {
      input(e.key); justCalculated = false;
    } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
      input('×'); justCalculated = false;
    } else if (e.key === '/' || e.key === ':') {
      input('÷'); justCalculated = false;
    } else if (e.key === '%' ) {
      percent(); justCalculated = false;
    } else if (e.key === 'Enter' || e.key === '=') {
      calculate(); justCalculated = true;
    } else if (e.key === 'Backspace') {
      deleteChar(); justCalculated = false;
    } else if (e.key === 'Escape') {
      clear(); justCalculated = false;
    } else {
      return;
    }
    e.preventDefault();
    refreshUI();
  });

  // Hiển thị kết quả ban đầu
  refreshUI();
} 