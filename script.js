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
    const textNode = document.createTextNode(todoText);
    todoEl.appendChild(textNode);
    const icon = document.createElement("i");

    icon.classList.add("fa", "fa-trash");

    todoEl.appendChild(icon);

    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      todoEl.remove();
      updateLS;
    });
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "i") return;
      todoEl.classList.toggle("completed");

      updateLS;
    });
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });
    todoUL.appendChild(todoEl);
    input.value = "";
    updateLS();
  }
}
function updateLS() {
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
