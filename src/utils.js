export const saveToLocalStorage = (list) => {
  localStorage.setItem('todoList', JSON.stringify(list));
};

export const renderList = (list, container, moreIcon, deleteIcon, deleteTaskHandler) => {
  let innerList = '';
  if (list.length === 0) {
    innerList = '<h3 class="list-placeholder">Please, add your first task!</h3>';
  } else {
    const sortedList = list.sort((a, b) => a.index - b.index);
    sortedList.forEach((task) => {
      innerList += `
        <li class="to-do-tasks" data-task-id="${task.id}">
          <div class="check-box ${task.completed ? 'completed' : ''}">${task.completed ? '✓' : ''}</div>
          <p class="task-description ${task.completed ? 'line-through' : ''}" contenteditable>${task.description}</p>
          <img class="more-logo" src="${moreIcon}" data-task-id="${task.id}"/>
          <img class="delete-icon" src="${deleteIcon}" alt="Delete" data-task-id="${task.id}" style="width: 16px; height: 16px; display: none;"/>
        </li>
      `;
    });
  }
  container.innerHTML = innerList;

  const deleteIcons = container.querySelectorAll('.delete-icon');
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', () => {
      const taskId = Number(deleteIcon.dataset.taskId);
      deleteTaskHandler(taskId);
    });
  });

  const toDoTasks = container.querySelectorAll('.to-do-tasks');
  toDoTasks.forEach((task) => {
    const moreLogo = task.querySelector('.more-logo');
    const deleteIcon = task.querySelector('.delete-icon');

    task.addEventListener('mouseover', () => {
      moreLogo.style.display = 'none';
      deleteIcon.style.display = 'inline-block';
    });

    task.addEventListener('mouseout', () => {
      moreLogo.style.display = 'inline-block';
      deleteIcon.style.display = 'none';
    });
  });
};

export const addTask = (description, list) => {
  const newTask = {
    id: Date.now(),
    description,
    completed: false,
    index: list.length + 1,
  };
  list.push(newTask);
  saveToLocalStorage(list);
};

export const deleteTask = (taskId, list) => {
  const updatedList = list.filter((task) => task.id !== taskId);
  saveToLocalStorage(updatedList);
  return updatedList;
};

export const editTaskDescription = (taskId, newDescription, list) => {
  const task = list.find((task) => task.id === taskId);
  if (task) {
    task.description = newDescription;
    saveToLocalStorage(list);
  }
};

export const clearCompletedTasks = (list) => {
  const updatedList = list.filter((task) => !task.completed);
  updatedList.forEach((task, index) => {
    task.index = index + 1;
  });
  saveToLocalStorage(updatedList);
  return updatedList;
};
