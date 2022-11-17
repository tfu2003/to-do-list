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
  const todoValue = input.value;
  const lowerTodos = todos.map(function (todo) {
    return todo.value.toLowerCase();
  });
  if (todoValue === "") {
    alert("To do cannot be empty.");
  } else if (lowerTodos.includes(todoValue.toLowerCase())) {
    alert("To do is already in the list.");
  } else {
    const todo = {
      value: todoValue,
      checked: false,
      color: "#000000",
    };
  todos.push(todo);
  }
  input.value = "";
  console.log(todos);
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

document.body.addEventListener("click", function (evt) {
  if (evt.target.parentNode.className === 'todo') {
    const id = evt.target.parentNode.id;
    console.log(id);
  }
}, false);

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
