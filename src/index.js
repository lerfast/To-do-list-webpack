import './style.css';
import moreIcon from './more.svg';
import reload from './reload.svg';
import enter from './enter.svg';

const ToDoListContainer = document.getElementById('list-container');
const reloadIcon = document.getElementById('reload-img');
const enterIcon = document.getElementById('enter-icon');
enterIcon.src = enter;
reloadIcon.src = reload;
const todoList = [
  {
    id: 1,
    description: 'Starting project structure',
    completed: false,
  },
  {
    id: 2,
    description: 'Initiate writing JS code',
    completed: false,
  },
  {
    id: 3,
    description: 'Wash my Dog',
    completed: true,
  },
  {
    id: 4,
    description: 'Pray ',
    completed: false,
  },
];

const renderList = (list) => {
  let innerList = '';
  if (list.length === 0) {
    innerList = '<h3 class="list-placeholder">Add your first task!</h3>';
  } else {
    const sortedList = list.sort((a, b) => a.id - b.id);
    sortedList.forEach((task) => {
      innerList += `
          <li class="to-do-tasks">
            <div class="check-box ${task.completed ? 'completed' : ''}">${task.completed ? '✓' : ''}</div>
            <p class="task-description ${task.completed ? 'line-through' : ''}">${task.description}</p>
            <img class="more-logo" src="${moreIcon}"/>
          </li>
          `;
    });
  }
  ToDoListContainer.innerHTML = innerList;
};

window.onload = renderList(todoList);