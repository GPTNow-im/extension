export function makeElementDrag(clickCallback: () => void) {
  const rootElement = document.getElementById('chatgpt-anywhere-trigger');

  if (!rootElement) return;
  if (localStorage.getItem('chatgpt-pos')) {
    const pos = (localStorage.getItem('chatgpt-pos') || '').split('-');
    if (pos.length === 2) {
      rootElement.style.right = pos[0];
      rootElement.style.bottom = pos[1];
    }
  }
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  var isDragging = false;
  let mousedownTimestamp: number = 0;
  rootElement.onmousedown = dragMouseDown;
  rootElement.onmouseup = (e) => {
    if (e.button !== 0) return;
    if (new Date().getTime() - mousedownTimestamp < 300) {
      clickCallback();
    }
    closeDragElement();
    rootElement?.classList.remove('notransition');
  };

  function dragMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    e = e || window.event;
    // e.preventDefault();
    mousedownTimestamp = Date.now();
    rootElement?.classList.add('notransition');
    // get the mouse cursor position at startup:
    pos3 = window.innerWidth - e.clientX;
    pos4 = window.innerHeight - e.clientY;
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', elementDrag);
    isDragging = true;
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    if (!isDragging) return;
    const nowPosX = window.innerWidth - e.clientX;
    const nowPosY = window.innerHeight - e.clientY;
    // calculate the new cursor position:
    pos1 = pos3 - nowPosX;
    pos2 = pos4 - nowPosY;
    pos3 = nowPosX;
    pos4 = nowPosY;
    if (rootElement) {
      // set the element's new position:
      rootElement.style.right =
        Number(rootElement.style.right.replace(/[^\d]/g, '')) - pos1 + 'px';
      rootElement.style.bottom =
        Number(rootElement.style.bottom.replace(/[^\d]/g, '')) - pos2 + 'px';
      localStorage.setItem(
        'chatgpt-pos',
        [rootElement.style.right, rootElement.style.bottom].join('-'),
      );
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }
}
