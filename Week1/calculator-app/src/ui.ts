// Xử lý cập nhật giao diện
export function updateDisplay(text: string) {
  const resultEl = document.getElementById('result');
  if (resultEl) resultEl.textContent = text === '' ? '0' : text;
}

export function highlightButton(btn: HTMLElement) {} 