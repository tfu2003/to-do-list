const form = document.getElementById("todoform");
const input = document.getElementById("newtodo");
const todoList = document.getElementById("todos-list");
const notification = document.querySelector(".notification")
let todos = JSON.parse(localStorage.getItem("todos")) || [];

makeTodos();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  saveTodo();
  makeTodos();
  inputTodo();
});

const saveTodo = () => {
  const todoValue = input.value;
  const lowerTodos = todos.map(function (todo) {
    return todo.value.toLowerCase();
  });
  if (todoValue === "") {
    getNotification("To do cannot be empty.");
  } else if (lowerTodos.includes(todoValue.toLowerCase())) {
    getNotification("To do is already in the list.");
  } else {
    const todo = {
      value: todoValue,
      checked: false,
      color: "#000000",
    };
    todos.push(todo);
  }
  input.value = "";
};

function makeTodos() {
  if (todos.length === 0) {
    todoList.innerHTML = '<center>You have nothing to do!</center>';
    return;
  }
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    todoList.innerHTML += `
    <div class="todo" id=${index}>
      <i 
        class="bi ${todo.checked ? "bi-check-circle-fill" : "bi-circle"}"
        style="color : ${todo.color}"
        data-action="check"
        ></i> 
        <p class="para" contenteditable="false">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash" data-action="delete"></i>
    </div>`;
  });
};

document.body.addEventListener(
  "click",
  function (evt) {
    if (evt.target.parentNode.className === "todo") {
      const id = evt.target.parentNode.id;
      const action = evt.target.dataset.action;
      const para = evt.target.parentNode.querySelector(".para");
      action === "check" && checkTodo(id);
      action === "edit" && editTodo(para, id);
      action === "delete" && deleteTodo(id);
    }
  },
  false
);

const checkTodo = (id) => {
  let todo = todos[id];
  todo = {
    value: todo.value,
    checked: !todo.checked,
    color: todo.color,
  };
  todos.splice(id, 1, todo);
  makeTodos();
  inputTodo();
};

const editTodo = (para, id) => {
  if (para.isContentEditable) {
    para.setAttribute("contenteditable", "false");
    const text = para.textContent;
    if (text == "") {
      getNotification("To do cannot be empty.");
      makeTodos();
    } else {
      let todo = todos[id];
      todo = {
        value: text,
        checked: todo.checked,
        color: todo.color,
      }
      todos.splice(id, 1, todo);
      makeTodos();
      inputTodo();
    }
  } else {
    para.setAttribute("contenteditable", "true");
  }
};

const deleteTodo = (id) => {
  todos.splice(id, 1);
  makeTodos();
  inputTodo();
}

const getNotification = (msg) => {
  notification.innerHTML = msg;
  notification.classList.add("notif-enter");
  setTimeout(() => {
    notification.classList.remove("notif-enter");
  }, 2000);
}

const inputTodo = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
