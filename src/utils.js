export function saveToLocalStorage(list) {
  localStorage.setItem('todoList', JSON.stringify(list));
}

export function renderList(list, container, moreIcon, deleteIcon, deleteTaskHandler) {
  container.innerHTML = '';
  list.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('to-do-tasks');
    listItem.dataset.taskId = task.id;
    const checkBox = document.createElement('div');
    checkBox.classList.add('check-box');
    if (task.completed) {
      checkBox.classList.add('completed');
      checkBox.textContent = '✓';
    }
    const taskDescription = document.createElement('div');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = task.description;
    if (task.completed) {
      taskDescription.classList.add('line-through');
    }
    const moreLogo = document.createElement('img');
    moreLogo.classList.add('more-logo');
    moreLogo.src = moreIcon;
    const deleteIconElement = document.createElement('img');
    deleteIconElement.classList.add('delete-icon');
    deleteIconElement.src = deleteIcon;
    deleteIconElement.addEventListener('click', () => deleteTaskHandler(task.id));
    listItem.appendChild(checkBox);
    listItem.appendChild(taskDescription);
    listItem.appendChild(moreLogo);
    listItem.appendChild(deleteIconElement);
    container.appendChild(listItem);
  });
}

export function addTask(description, list) {
  const newTask = {
    id: Date.now(),
    description,
    completed: false,
    index: list.length + 1,
  };
  list.push(newTask);
  saveToLocalStorage(list);
}

export function deleteTask(taskId, list) {
  const updatedList = list.filter((task) => task.id !== taskId);
  saveToLocalStorage(updatedList);
  return updatedList;
}

export function clearCompletedTasks(list) {
  const updatedList = list.filter((task) => !task.completed);
  saveToLocalStorage(updatedList);
  return updatedList;
}

export function updateTaskStatus(taskId, completed, list) {
  list.forEach((task) => {
    if (task.id === taskId) {
      task.completed = completed;
    }
  });
  saveToLocalStorage(list);
  return list;
}

export function updateTaskDescription(taskId, newDescription, list) {
  const taskIndex = list.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    list[taskIndex].description = newDescription;
    saveToLocalStorage(list);
  }
  return list;
}

export function moveTaskToTop(taskId, list) {
  const taskIndex = list.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1 && taskIndex !== 0) {
    const taskToMove = list.splice(taskIndex, 1)[0];
    list.unshift(taskToMove);
    saveToLocalStorage(list);
  }
  return list;
}

export function moveTaskToBottom(taskId, list) {
  const taskIndex = list.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1 && taskIndex !== list.length - 1) {
    const taskToMove = list.splice(taskIndex, 1)[0];
    list.push(taskToMove);
    saveToLocalStorage(list);
  }
  return list;
}
