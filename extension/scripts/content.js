const init = function () {
  const inject = document.createElement('div');
  inject.className = 'injected-class';
  inject.innerHTML = 'Hello from injection';
  document.body.appendChild(inject);
  makeDraggable(inject);
}

const style = document.createElement('style');
style.textContent= `
  .injected-class {
    position: fixed;
    top: 50px;
    left: 50px;
    width: 200px;
    padding: 20px;
    background: red;
    border: 1px solid #000000ff;
    z-index: 9999;
    cursor: move;
  }`;

document.head.appendChild(style);

init();

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  element.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top  = (element.offsetTop  - pos2) + 'px';
    element.style.left = (element.offsetLeft - pos1) + 'px';
  }

  function closeDragElement() {
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }
}