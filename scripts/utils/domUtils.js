function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}

function addClass(element, className) {
  element.classList.add(className);
}

function removeClass(element, className) {
  element.classList.remove(className);
}

function toggleClass(element, className) {
  element.classList.toggle(className);
}

function createElement(element) {
  return document.createElement(element);
}

export {
  getElement,
  getElements,
  addClass,
  removeClass,
  toggleClass,
  createElement,
};
