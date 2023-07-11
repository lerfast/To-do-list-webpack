/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo.js */ \"./src/todo.js\");\n\n\nconst addItemButton = document.getElementById('addItemButton');\nconst taskList = document.getElementById('taskList');\nconst clearCompletedButton = document.getElementById('clearCompletedButton');\n\naddItemButton.addEventListener('click', handleAddItem);\ntaskList.addEventListener('click', handleTaskClick);\nclearCompletedButton.addEventListener('click', handleClearCompleted);\n\nfunction handleAddItem() {\n  (0,_todo_js__WEBPACK_IMPORTED_MODULE_0__.addItem)();\n}\n\nfunction handleTaskClick(event) {\n  const { target } = event;\n  if (target.classList.contains('remove-item')) {\n    const listItem = target.closest('li');\n    const index = Array.from(taskList.children).indexOf(listItem);\n    (0,_todo_js__WEBPACK_IMPORTED_MODULE_0__.removeItem)(index);\n  } else {\n    const listItem = target.closest('li');\n    const index = Array.from(taskList.children).indexOf(listItem);\n    (0,_todo_js__WEBPACK_IMPORTED_MODULE_0__.toggleItem)(index);\n  }\n}\n\nfunction handleClearCompleted() {\n  (0,_todo_js__WEBPACK_IMPORTED_MODULE_0__.clearCompleted)();\n}\n\n(0,_todo_js__WEBPACK_IMPORTED_MODULE_0__.renderTasks)();\n\n\n//# sourceURL=webpack://project/./src/index.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addItem: () => (/* binding */ addItem),\n/* harmony export */   clearCompleted: () => (/* binding */ clearCompleted),\n/* harmony export */   removeItem: () => (/* binding */ removeItem),\n/* harmony export */   renderTasks: () => (/* binding */ renderTasks),\n/* harmony export */   toggleItem: () => (/* binding */ toggleItem)\n/* harmony export */ });\nlet tasks = [];\n\nfunction renderTasks() {\n  const taskList = document.getElementById('taskList');\n  taskList.innerHTML = '';\n\n  tasks.forEach((task, index) => {\n    const listItem = document.createElement('li');\n    listItem.innerHTML = `\n      <input type=\"checkbox\" ${task.completed ? 'checked' : ''}>\n      <span>${task.description}</span>\n      <button class=\"remove-item\">Remove</button>\n    `;\n\n    if (task.completed) {\n      listItem.classList.add('completed');\n    }\n\n    listItem.querySelector('input[type=\"checkbox\"]').addEventListener('change', () => {\n      toggleItem(index);\n    });\n\n    const removeButton = listItem.querySelector('.remove-item');\n    removeButton.addEventListener('click', (event) => {\n      event.stopPropagation();\n      removeItem(index);\n    });\n\n    taskList.appendChild(listItem);\n  });\n}\n\nfunction addItem() {\n  const newItemInput = document.getElementById('newItemInput');\n  const description = newItemInput.value.trim();\n\n  if (description) {\n    tasks.push({\n      description,\n      completed: false,\n    });\n\n    newItemInput.value = '';\n    renderTasks();\n  }\n}\n\nfunction removeItem(index) {\n  tasks.splice(index, 1);\n  renderTasks();\n}\n\nfunction toggleItem(index) {\n  tasks[index].completed = !tasks[index].completed;\n  renderTasks();\n}\n\nfunction clearCompleted() {\n  tasks = tasks.filter((task) => !task.completed);\n  renderTasks();\n}\n\n\n//# sourceURL=webpack://project/./src/todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;