let tasks = [];

export function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span>${task.description}</span>
      <button class="remove-item">Remove</button>
    `;

    if (task.completed) {
      listItem.classList.add('completed');
    }

    listItem.querySelector('input[type="checkbox"]').addEventListener('change', () => {
      toggleItem(index);
    });

    const removeButton = listItem.querySelector('.remove-item');
    removeButton.addEventListener('click', (event) => {
      event.stopPropagation();
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
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}
