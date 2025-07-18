"use strict";
let todos = [];
const todoInput = document.querySelector("#newTodo");
const todoList = document.querySelector("#todoList");
const todoCount = document.querySelector("#todoCount");
const buttonAdd = document.querySelector("#addBtn");
const filterButtons = document.querySelectorAll("[data-filter]");
// Hàm lưu todos vào localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
// Hàm tạo và hiển thị <li> cho một todo
function createLI_and_Delete(todo) {
  if (!todoList) return;
  const li = document.createElement("li");
  li.textContent = todo.text;
  li.style.cursor = "pointer";
  if (todo.completed) {
    li.style.textDecoration = "line-through";
  }
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Xóa";
  deleteButton.style.marginLeft = "10px";
  deleteButton.style.cursor = "pointer";
  li.addEventListener("click", (e) => {
    if (e.target === deleteButton) return;
    todo.completed = !todo.completed;
    li.style.textDecoration = todo.completed ? "line-through" : "none";
    saveTodos(); // Lưu sau khi thay đổi trạng thái
    updateTodoUnfinished();
  });
  deleteButton.addEventListener("click", () => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      const index = todos.indexOf(todo);
      if (index !== -1) {
        todos.splice(index, 1);
        todoList.removeChild(li);
        saveTodos(); // Lưu sau khi xóa
        updateTodoUnfinished();
      }
    }
  });
  li.appendChild(deleteButton);
  todoList.appendChild(li);
}
// Hàm thêm todo mới
function addTodo() {
  if (!todoInput || !todoInput.value.trim() || !todoList) return;
  const textInput = todoInput.value.trim();
  const newTodo = { text: textInput, completed: false };
  todos.push(newTodo);
  todoInput.value = "";
  createLI_and_Delete(newTodo);
  saveTodos(); // Lưu sau khi thêm
  updateTodoUnfinished();
}
// Hàm cập nhật số lượng việc chưa hoàn thành
function updateTodoUnfinished() {
  if (!todoCount) return;
  const activeCount = todos.filter((x) => !x.completed).length;
  todoCount.textContent = `${activeCount} việc chưa hoàn thành`;
}
// Hàm xử lý lọc nút "Tất cả"
function filterAll() {
  if (!todoList) return;
  todoList.innerHTML = "";
  todos.forEach((x) => {
    createLI_and_Delete(x);
  });
}
// Hàm xử lý lọc nút "Đang hoạt động"
function filterActive() {
  if (!todoList) return;
  todoList.innerHTML = "";
  const activeTodo = todos.filter((x) => !x.completed);
  activeTodo.forEach((todo) => {
    createLI_and_Delete(todo);
  });
}
// Hàm xử lý lọc nút "Đã hoàn thành"
function filterCompleted() {
  if (!todoList) return;
  todoList.innerHTML = "";
  const todoCompleted = todos.filter((x) => x.completed);
  todoCompleted.forEach((todo) => {
    createLI_and_Delete(todo);
  });
}
// Hàm khởi tạo
function init() {
  // Tải todos từ localStorage
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    filterAll(); // Hiển thị tất cả todos khi khởi tạo
  }
  if (buttonAdd) {
    buttonAdd.addEventListener("click", addTodo);
  }
  filterButtons.forEach((button) => {
    const filterValue = button.getAttribute("data-filter");
    if (filterValue === "all") {
      button.addEventListener("click", filterAll);
    } else if (filterValue === "active") {
      button.addEventListener("click", filterActive);
    } else if (filterValue === "completed") {
      button.addEventListener("click", filterCompleted);
    }
  });
  updateTodoUnfinished();
}
init();
