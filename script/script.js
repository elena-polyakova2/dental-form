// signature
(function () {
  const signCanvas = document.getElementById('sign-here');
  var btn = document.getElementById('sign-button');
  const ctx = signCanvas.getContext('2d');
  
  if (!ctx) {
      console.log('No canvas detected');
      return;
  }

  const mappedEvents = {
    start: ['mousedown', 'touchstart'],
    move: ['mousemove', 'touchmove'],
    end: ['mouseup', 'touchend', 'touchcancel'],
  };

  let drawing = false;

  function addEventListeners(element, event, fn) {
    const evtArray = mappedEvents[event];
    if (!evtArray) {
      console.log('No events found');
      return;
    }
    const len = evtArray.length;
    for (let i = 0; i < len; ++i) {
      element.addEventListener(evtArray[i], fn, false);
    }
  }

  function onSigStart(ev) {
    console.log('Signature starting');
    console.log(ev.type);
    var coords = getOffset(ev);
    if (!coords) {
        return;
    }
    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
    ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(coords.x, coords.y);
    drawing = true;
  }

  function onSigMove(ev) {
    console.log('Signature moving');
    console.log(ev.type);
    if (!drawing) {
        return;
    }
    ev.preventDefault(); // to prevent scrolling when writing and window is scrollable
    var coords = getOffset(ev);
    if (!coords) {
        return;
    }
    ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(coords.x, coords.y);
    ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
  }

  function onSigEnd(ev) {
      console.log('Signature ending');
      console.log(ev.type);
      drawing = false;
  }

  function clearSignature(ev) {
    ev.preventDefault();
    ctx?.clearRect(0, 0, signCanvas.width, signCanvas.height);
  }

  function getOffset(ev) {
    var mEvent = ev;
    var x = 0;
    var y = 0;

    if (!mEvent.offsetX || !mEvent.offsetY) {
      var tEvent = ev;
      var touches = tEvent.touches;
      if (touches.length > 1) {
          return;
      }
      var touch = touches[0];
      var rect = ev.currentTarget.getBoundingClientRect();
      x = touch.pageX - rect.x;
      y = touch.pageY - rect.y;
      // in case of scrolling
      x = touch.clientX - rect.x;
      y = touch.clientY - rect.y;
    }
    else {
      x = mEvent.offsetX;
      y = mEvent.offsetY;
    }
    return {
      x: x / signCanvas.offsetWidth * signCanvas.width,
      y: y / signCanvas.offsetHeight * signCanvas.height,
    };
  }

  addEventListeners(signCanvas, "start", onSigStart)
  addEventListeners(signCanvas, "move", onSigMove)
  addEventListeners(signCanvas, "end", onSigEnd)

  if (!!btn) {
    btn.addEventListener('click', clearSignature, false);
  }

  ctx.lineWidth = 2;
})(); 

const IMappedEvents = {
  start: [],
  move: [],
  end: []
};