const form = document.getElementById("todoform");
const input = document.getElementById("newtodo");
let todos = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  saveToDo();
});

const saveToDo = () => {
  const newToDo = input.value;
  const todo = {
    value : newToDo,
    checked : false,
    color : '#FFFFFF'
  }
}