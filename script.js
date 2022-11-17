const form = document.getElementById("todoform");
const input = document.getElementById("newtodo");
const todoList = document.getElementById("todos-list");
let todos = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  saveTodo();
  makeTodos();
});

const saveTodo = () => {
  const newTodo = input.value;
  const lowerTodos = todos.map(function (value) {
    return value.toLowerCase();
  });
  if (newTodo === "") {
    alert("To do cannot be empty.");
  } else if (lowerTodos.includes(newTodo.toLowerCase())) {
    alert("To do is already in the list.");
  } else {
    const todo = {
      value: newTodo,
      checked: false,
      color: "#000000",
    };
  todos.push(todo);
  }
  input.value = "";
};

const makeTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    todoList.innerHTML += `
    <div class="todo" id=${index}>
      <i 
        class="bi ${todo.checked ? "bi-check-circle-fill" : "bi-circle"}"
        style="color : ${todo.color}"
        ></i> 
        <p class="">${todo.value}</p>
        <i class="bi bi-pencil-square"></i>
        <i class="bi bi-trash"></i>
    </div>`;
  });
};

const inputTodo = (todo) => {
  localStorage.setItem("todos", JSON.stringify(todo));
};

const removeTodo = (todo) => {
  delete localStorage.getItem("todo");
};

const loadToDos = () => {
  const todosJson = localStorage.getItem("todos");
  if (todosJson) {
    todos = JSON.parse(todosJson);
  }
};
