import {
  addTask,
  deleteTask,
  clearCompletedTasks,
  updateTaskStatus,
  updateTaskDescription,
  moveTaskToTop,
  moveTaskToBottom,
} from './utils.js';
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value.toString();
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() });
});
test('addTask should add a task to the list', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
  ];
  const newTaskDescription = 'New Task';
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = addTask(newTaskDescription, initialList);
  const newTask = updatedList.find((task) => task.description === newTaskDescription);
  expect(newTask).toBeDefined();
  expect(newTask.completed).toBe(false);
  expect(updatedList).toHaveLength(3);
});
test('addTask should update localStorage with the new list', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
  ];
  const newTaskDescription = 'New Task';
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = addTask(newTaskDescription, initialList);
  const newTask = updatedList.find((task) => task.description === newTaskDescription);
  const storedListString = localStorage.getItem('todoList');
  const storedList = JSON.parse(storedListString);
  expect(newTask).toBeDefined();
  expect(storedList).toContainEqual(newTask);
  expect(newTask.completed).toBe(false);
  expect(updatedList).toHaveLength(3);
});
test('deleteTask should delete a task from the list', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
    { id: 3, description: 'Task 3', completed: false },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = deleteTask(2, initialList);
  const expectedList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 3, description: 'Task 3', completed: false },
  ];
  expect(updatedList).toHaveLength(2);
  expect(updatedList).toEqual(expectedList);
});
test('clearCompletedTasks should clear completed tasks from the list', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
    { id: 3, description: 'Task 3', completed: true },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = clearCompletedTasks(initialList);
  const expectedList = [
    { id: 1, description: 'Task 1', completed: false },
  ];
  expect(updatedList).toHaveLength(1);
  expect(updatedList).toEqual(expectedList);
});
test('updateTaskStatus (mark as completed) should mark a task as completed', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: false },
    { id: 3, description: 'Task 3', completed: false },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = updateTaskStatus(2, true, initialList);
  const expectedList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
    { id: 3, description: 'Task 3', completed: false },
  ];
  expect(updatedList[1].completed).toBe(true);
  expect(updatedList).toEqual(expectedList);
});
test('updateTaskStatus (mark as incomplete) should mark a task as incomplete', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: true },
    { id: 2, description: 'Task 2', completed: true },
    { id: 3, description: 'Task 3', completed: true },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = updateTaskStatus(2, false, initialList);
  const expectedList = [
    { id: 1, description: 'Task 1', completed: true },
    { id: 2, description: 'Task 2', completed: false },
    { id: 3, description: 'Task 3', completed: true },
  ];
  expect(updatedList[1].completed).toBe(false);
  expect(updatedList).toEqual(expectedList);
});
test('updateTaskStatus (task does not exist) should not update status if the task does not exist', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: false },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = updateTaskStatus(3, true, initialList);
  expect(updatedList).toEqual(initialList);
});
test('updateTaskDescription should update the description of a task', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = updateTaskDescription(2, 'Updated Task 2', initialList);
  const expectedList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Updated Task 2', completed: true },
  ];
  expect(updatedList).toEqual(expectedList);
});
test('updateTaskDescription should not update the description if the task does not exist', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = updateTaskDescription(3, 'Updated Task 3', initialList);
  expect(updatedList).toEqual(initialList);
});
test('moveTaskToTop should move a task to the top of the list', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
    { id: 3, description: 'Task 3', completed: false },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = moveTaskToTop(3, initialList);
  const expectedList = [
    { id: 3, description: 'Task 3', completed: false },
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
  ];
  expect(updatedList).toEqual(expectedList);
});
test('moveTaskToBottom should move a task to the bottom of the list', () => {
  const initialList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true },
    { id: 3, description: 'Task 3', completed: false },
  ];
  localStorage.setItem('todoList', JSON.stringify(initialList));
  const updatedList = moveTaskToBottom(2, initialList);
  const expectedList = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 3, description: 'Task 3', completed: false },
    { id: 2, description: 'Task 2', completed: true },
  ];
  expect(updatedList).toEqual(expectedList);
});
afterAll(() => {
  localStorage.clear();
});












