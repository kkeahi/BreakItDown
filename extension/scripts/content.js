let isModalOpen = false;
let isLoading = false;

async function showModal() {
  const modalExists = document.getElementById('injected-modal-id');
  if (modalExists) return;

  const styleExists = document.getElementById('injected-style-id');
  if (!styleExists) {
    const style = document.createElement('style');
    style.id = 'injected-style-id';
    style.textContent= `
      .injected-modal {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        position: fixed;
        top: 50px;
        left: 50px;
        width: 220px;
        border: 2px solid #8D6E63;
        border-radius: 8px;
        font-family: 'Georgia', 'Merriweather', serif;
        box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
        opacity: 0.95;
        z-index: 9999;
      }

      .injected-header {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: space-between;
        background: #D7263D;
        color: #fff;
        padding: 6px 10px;
        font-weight: bold;
        border-radius: 6px 6px 0 0;
      }

      .injected-body {
        flex: 1 1 auto;
        min-height: 0;
        background: #FFD166;
        color: #3A2E2E;
        padding: 10px;
        overflow-y: auto;
        line-height: 1.5;
        border-radius: 0 0 6px 6px;
        scrollbar-width: thin;
        font-size: 15px;
      }

      .injected-resizer {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 14px;
        height: 14px;
        background: #D7263D;
        cursor: nwse-resize;
        border-radius: 3px 3px 6px 3px;
        z-index: 10000;
      }

      .injected-text {
        margin: 0;
      }

      .injected-button {
        border: none;
        background: #F4A7B9;
        color: #3A2E2E;
        font-weight: bold;
        border: 1px solid #F4A7B9;
        border-radius: 4px;
        padding: 0 6px;
        cursor: pointer;
      }

      .injected-button:hover {
        background: #df8da0ff;
        color: #3A2E2E;
        font-weight: bold;
        border: 1px solid #3A2E2E;
      }`;
    document.head.appendChild(style);
  };

  const modal = document.createElement('div');
  modal.className = 'injected-modal';
  modal.id = 'injected-modal-id';
  
  const modalHeader = document.createElement('div');
  modalHeader.className = 'injected-header';
  modal.appendChild(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.className = 'injected-body';
  modal.appendChild(modalBody);

  const modalResizeButton = document.createElement('div');
  modalResizeButton.className = 'injected-resizer';
  modal.appendChild(modalResizeButton);
  
  const modalHeaderSpan = document.createElement('span');
  modalHeaderSpan.innerHTML = 'Break It Down';
  modalHeader.appendChild(modalHeaderSpan);

  const modalHeaderButton = document.createElement('button');
  modalHeaderButton.className = 'injected-button';
  modalHeaderButton.innerHTML = "x"
  modalHeader.appendChild(modalHeaderButton);

  const modalBodyText = document.createElement('p');
  modalBodyText.className = 'injected-text';
  modalBodyText.id = 'injected-text-id'
  modalBodyText.innerHTML = "...";
  modalBody.appendChild(modalBodyText);

  document.body.append(modal);
  makeClosable(modalHeaderButton, modal);
  makeDraggable(modalHeader, modal);
  makeResizable(modalResizeButton, modal);

  isModalOpen = true;
}

function makeClosable(button, modal) {
  button.addEventListener('click', function() {
    isModalOpen = false;
    modal.remove();
  })
}

function makeDraggable(header, modal) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  header.addEventListener('mousedown', dragMouseDown);

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
    modal.style.top  = (modal.offsetTop  - pos2) + 'px';
    modal.style.left = (modal.offsetLeft - pos1) + 'px';
  }

  function closeDragElement() {
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }
}

function makeResizable(handle, modal, {
  minW = 220,
  minH = 50,
  maxW = () => window.innerWidth,
  maxH = () => window.innerHeight
} = {}) {
  if (!handle || !modal) return;

  handle.style.touchAction = 'none';
  handle.addEventListener('pointerdown', onDown);

  function onDown(e) {
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = modal.offsetWidth;
    const startH = modal.offsetHeight;

    const prevSelect = document.body.style.userSelect;
    document.body.style.userSelect = 'none';

    function onMove(ev) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;

      const w = Math.min(typeof maxW === 'function' ? maxW() : maxW,
        Math.max(minW, startW + dx));
      const h = Math.min(typeof maxH === 'function' ? maxH() : maxH,
        Math.max(minH, startH + dy));

      modal.style.width = w + 'px';
      modal.style.height = h + 'px';
    }

    function onUp(ev) {
      handle.releasePointerCapture(e.pointerId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      document.body.style.userSelect = prevSelect;
    }

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }
}


async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function setLoading(element) {
  isLoading = true;
  loadingText = "&nbsp";
  while (isModalOpen && isLoading) {
    if (loadingText == "&nbsp") {
      loadingText = ".";
    } else {
      loadingText += "."; 
    }
    if (loadingText.length > 4) loadingText = "&nbsp";
    element.innerHTML = loadingText;
    await delay(250);
  }
}

async function typewrite(element, text) {
  if (isModalOpen) {
    let typewriter = ""
    element.innerHTML = "";
    
    for (let char of text) {
      if (isModalOpen) {
        typewriter += char;
        element.innerHTML = typewriter;
        await delay(25);
      }
    }
  }
}

chrome.runtime.onMessage.addListener(
  async function handleMessages(message, sender, sendResponse) {
    if (message.id == "show-modal") {
      await showModal();
      setLoading(document.getElementById('injected-text-id'));
    };

    if (message.id == "research-mode") {
      console.log(message.body);
    }

    if (message.id == "explanation") {
      isLoading = false;
      await typewrite(document.getElementById('injected-text-id'), message.body);
    }

    fetch(message.url)
      .then((response) => sendResponse({ statusCode: response.status }))
    return true;
  }
);
