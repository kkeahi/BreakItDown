(function () {
  console.log("ran");
  const modal = document.createElement('div');
  modal.className = 'injected-modal';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'injected-header';
  modal.appendChild(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.className = 'injected-body';
  modal.appendChild(modalBody);
  
  const modalHeaderSpan = document.createElement('span');
  modalHeaderSpan.innerHTML = 'Break It Down';
  modalHeader.appendChild(modalHeaderSpan);

  const modalHeaderButton = document.createElement('button');
  modalHeaderButton.className = 'injected-button';
  modalHeader.appendChild(modalHeaderButton);

  const modalBodyText = document.createElement('p');
  modalBodyText.className = 'injexted-text';
  modalBodyText.innerHTML = "...";
  modalBody.appendChild(modalBodyText);

  document.body.append(modal);
  makeDraggable(modal);
})()

const style = document.createElement('style');
style.textContent= `
  .injected-modal {
    position: fixed;
    top: 50px;
    left: 50px;
    width: 220px;
    border: 2px solid #8D6E63;
    border-radius: 8px;
    font-family: 'Georgia', 'Merriweather', serif;
    box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
    opacity: 0.9;
    z-index: 9999;
  }

  .injected-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #D7263D;
    color: #fff;
    padding: 6px 10px;
    font-weight: bold;
    border-radius: 6px 6px 0 0;
  }

  .injected-body {
    background: #FFD166;
    color: #3A2E2E;
    padding: 10px;
    max-height: 120px;
    overflow-y: auto;
    line-height: 1.5;
    border-radius: 0 0 6px 6px;
    scrollbar-width: thin;
    font-size: 15px;
  }

  .injected-text {
    margin: 0;
  }

  .injected-button {
    border: none;
    background: #F4A7B9;
    color: #3A2E2E;
    font-weight: bold;
    border-radius: 4px;
    padding: 0 6px;
    cursor: pointer;
  }

  .injected-button:hover {
    background: #E57373;
    color: white;
  }
`;
document.head.appendChild(style);

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