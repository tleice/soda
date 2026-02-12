// JavaScript functionality for the to-do list with local storage support

// Load todos from local storage on page load
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoElement(todo));
}

// Add a new todo
function addTodo(todoText) {
    const todo = { text: todoText, completed: false };
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    addTodoElement(todo);
}

// Add todo element to the DOM
function addTodoElement(todo) {
    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
        <span ${todo.completed ? 'class="completed"' : ''}>${todo.text}</span>
        <button onclick='deleteTodo("${todo.text}")'>Delete</button>
        <button onclick='completeTodo("${todo.text}")'>${todo.completed ? 'Undo' : 'Complete'}</button>
    `;
    todoList.appendChild(todoItem);
}

// Delete todo
function deleteTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
}

// Complete todo
function completeTodo(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        if (todo.text === todoText) {
            todo.completed = !todo.completed;
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
}

// Event listener for adding new todos
document.getElementById('add-todo-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const todoInput = document.getElementById('todo-input');
    addTodo(todoInput.value);
    todoInput.value = '';
});

// Load todos on page load
window.onload = loadTodos;