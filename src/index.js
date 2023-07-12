import './style.css';

const tasks = [
  { description: 'Task 1', completed: false, index: 1 },
  { description: 'Task 2', completed: true, index: 2 },
  { description: 'Task 3', completed: false, index: 3 },
];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.textContent = task.description;

    if (task.completed) {
      listItem.classList.add('completed');
    }

    taskList.appendChild(listItem);
  });
}

renderTasks();
