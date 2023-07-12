import './style.css';
import moreIcon from './more.svg';
import reload from './reload.svg';
import enter from './enter.svg';

const ToDoListContainer = document.getElementById('list-container');
const reloadIcon = document.getElementById('reload-img');
const enterIcon = document.getElementById('enter-icon');
enterIcon.src = enter;
reloadIcon.src = reload;

let todoList = [];

const renderList = (list) => {
  let innerList = '';
  if (list.length === 0) {
    innerList = '<h3 class="list-placeholder">Please, add your first task!</h3>';
  } else {
    const sortedList = list.sort((a, b) => a.index - b.index);
    sortedList.forEach((task) => {
      innerList += `
          <li class="to-do-tasks" data-task-id="${task.id}">
            <div class="check-box ${task.completed ? 'completed' : ''}">${task.completed ? '✓' : ''}</div>
            <p class="task-description ${task.completed ? 'line-through' : ''}">${task.description}</p>
            <img class="more-logo" src="${moreIcon}"/>
          </li>
          `;
    });
  }
  ToDoListContainer.innerHTML = innerList;
};

const saveToLocalStorage = (list) => {
  localStorage.setItem('todoList', JSON.stringify(list));
};

const addTask = (description) => {
  const newTask = {
    id: Date.now(),
    description,
    completed: false,
    index: todoList.length + 1,
  };
  todoList.push(newTask);
  saveToLocalStorage(todoList);
  renderList(todoList);
};

const editTaskDescription = (taskId, newDescription) => {
  todoList.forEach((task) => {
    if (task.id === taskId) {
      task.description = newDescription;
    }
  });
  saveToLocalStorage(todoList);
  renderList(todoList);
};

const clearCompletedTasks = () => {
  todoList = todoList.filter((task) => !task.completed);
  todoList.forEach((task, index) => {
    task.index = index + 1;
  });
  saveToLocalStorage(todoList);
  renderList(todoList);
};

const clearButton = document.querySelector('.clear-btn');
clearButton.addEventListener('click', () => {
  clearCompletedTasks();
});

window.onload = () => {
  todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  renderList(todoList);
};

const addForm = document.querySelector('.add-form');
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const addInput = document.querySelector('.add-input');
  const description = addInput.value.trim();
  if (description !== '') {
    addTask(description);
    addInput.value = '';
  }
});

ToDoListContainer.addEventListener('click', (e) => {
  const taskElement = e.target.closest('.to-do-tasks');
  if (taskElement) {
    const taskId = Number(taskElement.dataset.taskId);
    const checkBox = taskElement.querySelector('.check-box');
    const taskDescription = taskElement.querySelector('.task-description');
    const moreLogo = taskElement.querySelector('.more-logo');

    if (e.target === checkBox) {
      const completed = !checkBox.classList.contains('completed');
      checkBox.classList.toggle('completed');
      taskDescription.classList.toggle('line-through');
      checkBox.textContent = completed ? '✓' : '';
      todoList.forEach((task) => {
        if (task.id === taskId) {
          task.completed = completed;
        }
      });
      saveToLocalStorage(todoList);
    } else if (e.target === moreLogo) {
      // Handle more logo click event if needed
    }
  }
});

ToDoListContainer.addEventListener('input', (e) => {
  const taskElement = e.target.closest('.to-do-tasks');
  if (taskElement) {
    const taskId = Number(taskElement.dataset.taskId);
    const taskDescription = taskElement.querySelector('.task-description');
    if (e.target === taskDescription) {
      const newDescription = taskDescription.textContent.trim();
      editTaskDescription(taskId, newDescription);
    }
  }
});
