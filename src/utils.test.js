// utils.test.js

import {
  updateTaskDescription,
  updateTaskStatus,
  clearCompletedTasks,
} from './utils.js';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Tests for updateTaskDescription
describe('updateTaskDescription', () => {
  it('should update the description of a task', () => {
    const initialList = [
      { id: 1, description: 'Task 1', completed: false, index: 1 },
      { id: 2, description: 'Task 2', completed: false, index: 2 },
      { id: 3, description: 'Task 3', completed: false, index: 3 },
    ];

    const updatedList = updateTaskDescription(2, 'Updated Task 2', initialList);

    expect(updatedList[1].description).toBe('Updated Task 2');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'todoList',
      JSON.stringify(updatedList)
    );
  });

  it('should not update the description if the task does not exist', () => {
    const initialList = [
      { id: 1, description: 'Task 1', completed: false, index: 1 },
      { id: 2, description: 'Task 2', completed: false, index: 2 },
      { id: 3, description: 'Task 3', completed: false, index: 3 },
    ];

    const updatedList = updateTaskDescription(
      4,
      'New Description',
      initialList
    );

    expect(updatedList).toEqual(initialList);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});

// Tests for updateTaskStatus
describe('updateTaskStatus', () => {
  it('should mark a task as completed', () => {
    const initialList = [
      { id: 1, description: 'Task 1', completed: false, index: 1 },
      { id: 2, description: 'Task 2', completed: false, index: 2 },
      { id: 3, description: 'Task 3', completed: false, index: 3 },
    ];

    const updatedList = updateTaskStatus(2, true, initialList);

    expect(updatedList[1].completed).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'todoList',
      JSON.stringify(updatedList)
    );
  });

  it('should mark a task as incomplete', () => {
    const initialList = [
      { id: 1, description: 'Task 1', completed: true, index: 1 },
      { id: 2, description: 'Task 2', completed: true, index: 2 },
      { id: 3, description: 'Task 3', completed: true, index: 3 },
    ];

    const updatedList = updateTaskStatus(2, false, initialList);

    expect(updatedList[1].completed).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'todoList',
      JSON.stringify(updatedList)
    );
  });

  it('should not update status if the task does not exist', () => {
    const initialList = [
      { id: 1, description: 'Task 1', completed: false, index: 1 },
      { id: 2, description: 'Task 2', completed: false, index: 2 },
      { id: 3, description: 'Task 3', completed: false, index: 3 },
    ];

    const updatedList = updateTaskStatus(4, true, initialList);

    expect(updatedList).toEqual(initialList);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});

// Tests for clearCompletedTasks
describe('clearCompletedTasks', () => {
  it('should clear completed tasks from the list', () => {
    const initialList = [
      { id: 1, description: 'Task 1', completed: false, index: 1 },
      { id: 2, description: 'Task 2', completed: true, index: 2 },
      { id: 3, description: 'Task 3', completed: false, index: 3 },
    ];

    const updatedList = clearCompletedTasks(initialList);

    expect(updatedList).toHaveLength(2);
    expect(updatedList.map((task) => task.id)).toEqual([1, 3]);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'todoList',
      JSON.stringify(updatedList)
    );
  });
});
