const input = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".todo-btn");

let todoArray = JSON.parse(localStorage.getItem("todoArray")) || [];

function createTodo(todoObj) {
  const todo = document.createElement("li");
  const buttonGroup = document.createElement("div");
  const doneBTN = document.createElement("button");
  const deleteBTN = document.createElement("button");
  buttonGroup.classList.add("todo-btn__group");

  doneBTN.classList.add("todo-item__btn", "done-btn");
  deleteBTN.classList.add("todo-item__btn", "delete-btn");

  todo.classList.add("todo-item");
  todo.textContent = todoObj.text;
  todo.dataset.id = todoObj.id;
  if (todoObj.done) {
    todo.classList.add("todo-done");
  }

  doneBTN.textContent = "Выполнено";
  deleteBTN.textContent = "Удалить";

  doneBTN.addEventListener("click", doneTodo);
  deleteBTN.addEventListener("click", deleteTodo);

  buttonGroup.append(doneBTN, deleteBTN);
  todo.append(buttonGroup);
  todoList.append(todo);
}

function addTodo() {
  const todoText = input.value.trim();
  if (todoText === "") {
    input.classList.add("input-error");
    return;
  }
  input.classList.remove("input-error");

  const todoObj = {
    id: Date.now(),
    text: input.value,
    done: false,
  };

  todoArray.push(todoObj);
  localStorage.setItem("todoArray", JSON.stringify(todoArray));

  createTodo(todoObj);

  input.value = "";
}

function doneTodo() {
  const buttonGroup = this.parentElement;
  const todo = buttonGroup.parentElement;
  const todoId = todo.dataset.id;
  const todoIndex = todoArray.findIndex((item) => item.id == todoId);

  todoArray[todoIndex].done = !todoArray[todoIndex].done;
  localStorage.setItem("todoArray", JSON.stringify(todoArray));

  todo.classList.toggle("todo-done");
}

function deleteTodo() {
  const buttonGroup = this.parentElement;
  const todo = buttonGroup.parentElement;
  const todoId = todo.dataset.id;

  todoArray = todoArray.filter((item) => item.id != todoId);
  localStorage.setItem("todoArray", JSON.stringify(todoArray));

  todo.remove();
}

todoButton.addEventListener("click", addTodo);

document.addEventListener("DOMContentLoaded", () => {
  todoArray.forEach(createTodo);
});
