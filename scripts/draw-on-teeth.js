// Load teeth image on canvas
const teethImg = new Image();
teethImg.src = "images/teeth.svg";
teethImg.onload = () => {
  ctxTeeth.drawImage(teethImg, 0, 0, 315, 550);    
}

// Drawing on teeth
const teethCanvas = document.getElementById('teethCanvas');
const toolbar = document.getElementById('toolbar');
//const toolbar = document.getElementsByClassName('toolbar')[0];
var btn = document.getElementById('clear');
//var btn = document.getElementsByClassName('clear')[0];
const ctxTeeth = teethCanvas.getContext('2d');

const mappedEvents = {
  start: ['mousedown', 'touchstart'],
  move: ['mousemove', 'touchmove'],
  end: ['mouseup', 'touchend', 'touchcancel'],
};

let drawing = false;
teethCanvas.width = 315;
teethCanvas.height = 550;

btn.addEventListener('click', ev => {
  ev.preventDefault();
  const teethImg = new Image();
  teethImg.src = "images/teeth.svg";
  
    if (ev.target.id === 'clear') { 
      ev.preventDefault();  
    teethImg.onload = () => {
      ctxTeeth.drawImage(teethImg, 0, 0, 315, 550);    
    }
    ctxTeeth.clearRect(teethImg, 0, 0, teethCanvas.width, teethCanvas.height);
    }
});
  
toolbar.addEventListener('change', ev => {
    if(ev.target.id === 'stroke') {
      ctxTeeth.strokeStyle = ev.target.value;
    }

    if(ev.target.id === 'lineWidth') {
        lineWidth = ev.target.value;
    }    
});
 
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

function onDrawingStart(ev) {
  // console.log(ev.type);
  var coords = getOffset(ev);
  if (!coords) {
      return;
  }
  ctxTeeth === null || ctxTeeth === void 0 ? void 0 : ctxTeeth.beginPath();
  ctxTeeth === null || ctxTeeth === void 0 ? void 0 : ctxTeeth.moveTo(coords.x, coords.y);
  drawing = true;
}

function onDrawingMove(ev) {
  // console.log(ev.type);
  if (!drawing) {
      return;
  }
  ev.preventDefault(); // to prevent scrolling when writing and window is scrollable
  var coords = getOffset(ev);
  if (!coords) {
      return;
  }
  ctxTeeth.lineWidth = lineWidth;
  ctxTeeth.lineCap = 'round';

  ctxTeeth === null || ctxTeeth === void 0 ? void 0 : ctxTeeth.lineTo(coords.x, coords.y);
  ctxTeeth === null || ctxTeeth === void 0 ? void 0 : ctxTeeth.stroke();
}

function onDrawingEnd(ev) {
  console.log('Drawing ending');
  console.log(ev.type);
  drawing = false;
}

function clearDrawing(ev) {
  ev.preventDefault();
  ctxTeeth?.clearRect(0, 0, teethCanvas.width, teethCanvas.height);
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
    x: x / teethCanvas.offsetWidth * teethCanvas.width,
    y: y / teethCanvas.offsetHeight * teethCanvas.height,
  };
}

addEventListeners(teethCanvas, "start", onDrawingStart);
addEventListeners(teethCanvas, "move", onDrawingMove);
addEventListeners(teethCanvas, "end", onDrawingEnd);

