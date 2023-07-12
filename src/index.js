import './style.css';
import {
  renderTasks, addItem, toggleItem, clearCompleted, updateItemDescription, removeItem,
} from './todo.js';

const newItemInput = document.getElementById('newItemInput');
const taskList = document.getElementById('taskList');
const clearCompletedButton = document.getElementById('clearCompletedButton');

newItemInput.addEventListener('keydown', handleAddItem);
taskList.addEventListener('click', handleTaskClick);
clearCompletedButton.addEventListener('click', handleClearCompleted);

function handleAddItem(event) {
  if (event.key === 'Enter') {
    addItem();
  }
}

function handleTaskClick(event) {
  const { target } = event;
  const listItem = target.closest('li');
  const parentList = listItem?.parentNode;

  if (parentList && target.classList.contains('remove-item')) {
    const index = Array.from(parentList.children).indexOf(listItem);
    removeItem(index);
  } else if (parentList && target.tagName === 'INPUT') {
    const index = Array.from(parentList.children).indexOf(listItem);
    toggleItem(index);
  } else if (target.tagName === 'SPAN') {
    target.contentEditable = true;
    target.focus();
    target.addEventListener('blur', handleTaskBlur);
    target.addEventListener('keydown', handleTaskKeydown);
  }
}

function handleTaskBlur(event) {
  const { target } = event;
  target.contentEditable = false;
  target.removeEventListener('blur', handleTaskBlur);
  target.removeEventListener('keydown', handleTaskKeydown);
  const listItem = target.closest('li');
  const index = [...listItem.parentNode.children].indexOf(listItem);
  const description = target.innerText.trim();
  updateItemDescription(index, description);
}

function handleTaskKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const { target } = event;
    target.blur();
  }
}

function handleClearCompleted() {
  clearCompleted();
}

renderTasks();
