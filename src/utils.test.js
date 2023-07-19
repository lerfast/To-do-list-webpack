import {
  addTask,
  deleteTask,
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

// Mock DOM elements
document.body.innerHTML = `
    <section class="main-container">
      <ul class="list-container" id="list-container"></ul>
    </section>
  `;

describe('Todo List Functions', () => {
  // Test for addTask function
  describe('addTask', () => {
    it('should add a task to the list', () => {
      const initialList = [];
      addTask('Test Task 1', initialList);
      addTask('Test Task 2', initialList);
      expect(initialList).toHaveLength(2);
      expect(initialList[0].description).toBe('Test Task 1');
      expect(initialList[1].description).toBe('Test Task 2');
    });

    it('should update localStorage with the new list', () => {
      const initialList = [];
      addTask('Test Task 1', initialList);
      addTask('Test Task 2', initialList);
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(initialList);
    });
  });

  // Test for deleteTask function
  describe('deleteTask', () => {
    it('should delete a task from the list', () => {
      const initialList = [
        {
          id: 1, description: 'Task 1', completed: false, index: 1,
        },
        {
          id: 2, description: 'Task 2', completed: false, index: 2,
        },
        {
          id: 3, description: 'Task 3', completed: false, index: 3,
        },
      ];
      const updatedList = deleteTask(2, initialList);
      expect(updatedList).toHaveLength(2);
      expect(updatedList.map((task) => task.id)).toEqual([1, 3]);
      // Check if localStorage was updated
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });

  // Test for clearCompletedTasks function
  describe('clearCompletedTasks', () => {
    it('should clear completed tasks from the list', () => {
      const initialList = [
        {
          id: 1, description: 'Task 1', completed: false, index: 1,
        },
        {
          id: 2, description: 'Task 2', completed: true, index: 2,
        },
        {
          id: 3, description: 'Task 3', completed: false, index: 3,
        },
      ];
      const updatedList = clearCompletedTasks(initialList);
      expect(updatedList).toHaveLength(2);
      expect(updatedList.map((task) => task.id)).toEqual([1, 3]);
      // Check if localStorage was updated
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });
});
