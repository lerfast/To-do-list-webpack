import {
  renderTasks, addItem, removeItem, toggleItem, clearCompleted,
} from './todo.js';

const addItemButton = document.getElementById('addItemButton');
const taskList = document.getElementById('taskList');
const clearCompletedButton = document.getElementById('clearCompletedButton');

addItemButton.addEventListener('click', handleAddItem);
taskList.addEventListener('click', handleTaskClick);
clearCompletedButton.addEventListener('click', handleClearCompleted);

function handleAddItem() {
  addItem();
}

function handleTaskClick(event) {
  const { target } = event;
  if (target.classList.contains('remove-item')) {
    const listItem = target.closest('li');
    const index = Array.from(taskList.children).indexOf(listItem);
    removeItem(index);
  } else {
    const listItem = target.closest('li');
    const index = Array.from(taskList.children).indexOf(listItem);
    toggleItem(index);
  }
}

function handleClearCompleted() {
  clearCompleted();
}

renderTasks();
