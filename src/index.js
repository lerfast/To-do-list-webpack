import './style.css';
import moreIcon from './more.svg';
import deleteIcon from './delete.svg';
import reload from './reload.svg';
import enter from './enter.svg';
import {
  saveToLocalStorage, renderList, addTask, deleteTask, editTaskDescription, clearCompletedTasks,
} from './utils.js';

const ToDoListContainer = document.getElementById('list-container');
const reloadIcon = document.getElementById('reload-img');
const enterIcon = document.getElementById('enter-icon');
const clearButton = document.querySelector('.clear-btn');
const addForm = document.querySelector('.add-form');

enterIcon.src = enter;
reloadIcon.src = reload;

let todoList = [];

const deleteTaskHandler = (taskId) => {
  todoList = deleteTask(taskId, todoList);
  renderList(todoList, ToDoListContainer, moreIcon, deleteIcon, deleteTaskHandler);
};

const completeTaskHandler = (taskId, completed) => {
  todoList.forEach((task) => {
    if (task.id === taskId) {
      task.completed = completed;
    }
  });
  saveToLocalStorage(todoList);
};

const editTaskDescriptionHandler = (taskId, newDescription) => {
  editTaskDescription(taskId, newDescription, todoList);
};

const clearCompletedTasksHandler = () => {
  todoList = clearCompletedTasks(todoList);
  renderList(todoList, ToDoListContainer, moreIcon, deleteIcon, deleteTaskHandler);
};

renderList(todoList, ToDoListContainer, moreIcon, deleteIcon, deleteTaskHandler);

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const addInput = document.querySelector('.add-input');
  const description = addInput.value.trim();
  if (description !== '') {
    addTask(description, todoList);
    addInput.value = '';
    renderList(todoList, ToDoListContainer, moreIcon, deleteIcon, deleteTaskHandler);
  }
});

clearButton.addEventListener('click', () => {
  clearCompletedTasksHandler();
});

window.onload = () => {
  todoList = JSON.parse(localStorage.getItem('todoList')) || [];
  renderList(todoList, ToDoListContainer, moreIcon, deleteIcon, deleteTaskHandler);
};

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
      completeTaskHandler(taskId, completed);
    } else if (e.target === moreLogo) {
      const deleteIcon = taskElement.querySelector('.delete-icon');
      moreLogo.style.display = 'none';
      deleteIcon.style.display = 'inline-block';
    } else if (e.target.classList.contains('delete-icon')) {
      e.stopPropagation();
      deleteTaskHandler(taskId);
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
      editTaskDescriptionHandler(taskId, newDescription);
    }
  }
});
