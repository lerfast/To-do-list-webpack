import {
  addTask,
  deleteTask,
  clearCompletedTasks,
  updateTaskStatus,
  updateTaskDescription,
  moveTaskToTop,
  moveTaskToBottom,
} from './utils.js';

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
describe('Todo List Functions', () => {
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
      localStorage.setItem('todoList', JSON.stringify(updatedList));
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });
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
      localStorage.setItem('todoList', JSON.stringify(updatedList));
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });
  describe('updateTaskStatus (mark as completed)', () => {
    it('should mark a task as completed', () => {
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
      const updatedList = updateTaskStatus(2, true, initialList);
      expect(updatedList[1].completed).toBe(true);
      localStorage.setItem('todoList', JSON.stringify(updatedList));
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });
  describe('updateTaskStatus (mark as incomplete)', () => {
    it('should mark a task as incomplete', () => {
      const initialList = [
        {
          id: 1, description: 'Task 1', completed: true, index: 1,
        },
        {
          id: 2, description: 'Task 2', completed: true, index: 2,
        },
        {
          id: 3, description: 'Task 3', completed: true, index: 3,
        },
      ];
      const updatedList = updateTaskStatus(2, false, initialList);
      expect(updatedList[1].completed).toBe(false);
      localStorage.setItem('todoList', JSON.stringify(updatedList));
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });
  describe('updateTaskDescription', () => {
    it('should update the description of a task', () => {
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
      const updatedList = updateTaskDescription(2, 'Updated Task 2', initialList);
      expect(updatedList[1].description).toBe('Updated Task 2');
      localStorage.setItem('todoList', JSON.stringify(updatedList));
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });
  describe('moveTaskToTop', () => {
    it('should move a task to the top of the list', () => {
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
      const updatedList = moveTaskToTop(2, initialList);
      expect(updatedList[0].id).toBe(2);
      localStorage.setItem('todoList', JSON.stringify(updatedList));
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });
  describe('moveTaskToBottom', () => {
    it('should move a task to the bottom of the list', () => {
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
      const updatedList = moveTaskToBottom(2, initialList);
      expect(updatedList[2].id).toBe(2);
      localStorage.setItem('todoList', JSON.stringify(updatedList));
      expect(JSON.parse(localStorage.getItem('todoList'))).toEqual(updatedList);
    });
  });
});