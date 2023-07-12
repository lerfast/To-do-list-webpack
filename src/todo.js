export const tasks = [];

export function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.description}</span>
      <i class="fas fa-trash-alt remove-item"></i>
    `;

    if (task.completed) {
      listItem.classList.add('completed');
    }

    listItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
      toggleItem(index);
    });

    listItem.querySelector('.remove-item').addEventListener('click', () => {
      removeItem(index);
    });

    taskList.appendChild(listItem);
  });
}

export function addItem() {
  const newItemInput = document.getElementById('newItemInput');
  const description = newItemInput.value.trim();

  if (description) {
    tasks.push({
      description,
      completed: false,
    });

    newItemInput.value = '';
    renderTasks();
  }
}

export function removeItem(index) {
  tasks.splice(index, 1);
  renderTasks();
}

export function toggleItem(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

export function clearCompleted() {
  tasks.splice(0, tasks.length, ...tasks.filter((task) => !task.completed));
  renderTasks();
}

export function updateItemDescription(index, description) {
  tasks[index].description = description;
  renderTasks();
}
