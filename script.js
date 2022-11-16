const form = document.getElementById("todoform");
const input = document.getElementById("newtodo");
const todoList = document.getElementById("todos-list");
let todos = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  saveToDo();
  createToDos();
});

const saveToDo = () => {
  const newToDo = input.value;
  const lowerToDos = todos.map(function(value) {return value.toLowerCase()});
  if (newToDo === '') {
    alert("To do cannot be empty.");
  } else if (lowerToDos.includes(newToDo.toLowerCase())) {
    alert("To do is already in the list.");
  } else {
    const todo = {
      value : newToDo,
      checked : false,
      color : '#FFFFFF'
    }
  }
  todos.push(newToDo);
  input.value = '';
}

const createToDos = () => {}