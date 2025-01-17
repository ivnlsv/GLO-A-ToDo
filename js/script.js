const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const todoRemove = document.querySelector(".todo-remove");

const toDoData = [];

const render = function () {
  todoList.innerHTML = "";
  todoCompleted.innerHTML = "";
  toDoData.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.text +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector(".todo-complete").addEventListener("click", function () {
      item.completed = !item.completed;
      render();
    });

    li.querySelector(".todo-remove").addEventListener("click", function () {
        const index = toDoData.indexOf(item);
        if (index > -1) {
            toDoData.splice(index, 1);
            render();
        }
    });
  });
};
function saveToLocalStorage() { 
    localStorage.setItem('todos', JSON.stringify(toDoData));
}
function getFromLocalStorage() { 
    const todos = localStorage.getItem('todos');
    if (todos) {
        toDoData.push(...JSON.parse(todos));
        render();
    }
        
}

todoControl.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputValue = headerInput.value.trim();
    if (inputValue !== "") {
        const newToDo = {
            text: headerInput.value,
            completed: false,
        };
        toDoData.push(newToDo);
        saveToLocalStorage();
        headerInput.value = "";
        render();
    } else { 
        alert("Введите текст задачи");
    }
});
getFromLocalStorage();