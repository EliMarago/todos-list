const form = document.getElementById("form");
const input = document.getElementById("input");
const todoUL = document.getElementById("todos");

const todosStorage = JSON.parse(localStorage.getItem("todos"));

if (todosStorage && Array.isArray(todosStorage)) {
  todosStorage.forEach((todo) => {
    addTodo(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }
  if (todoText) {
    const todoEl = document.createElement("li");
    todoEl.appendChild(document.createTextNode(todoText));
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-trash");
    icon.style.marginLeft = "10px";
    icon.style.cursor = "pointer";

    todoEl.appendChild(icon);
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      uppdateLS;
    });
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      uppdateLS();
    });
    todoUL.appendChild(todoEl);
    input.value = "";

    uppdateLS();
  }
}

function uppdateLS() {
  const todosEl = document.querySelectorAll("li");

  const todo = [];

  todosEl.forEach((todoEl) => {
    todo.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todo));
}

// localStorage.setItem("name", JSON.stringify(obj));
// JSON.parse(localStorage.getItem(obj));
