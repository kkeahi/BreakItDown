// have modal stay by text with a line connecting it. also highlight text. modal should be movable and grayed out when hovered over

const init = function() {
  const inject = document.createElement('div');
  inject.className = 'injected-class';
  inject.innerHTML = 'Hello from injection';
  document.body.appendChild(inject);
}

init();