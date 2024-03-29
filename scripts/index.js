// Signature
const signCanvas = document.getElementById('sign-here');
var btn = document.getElementById('sign-button');
const ctxSignature = signCanvas.getContext('2d');

const mappedEventsOn = {
  start: ['mousedown', 'touchstart'],
  move: ['mousemove', 'touchmove'],
  end: ['mouseup', 'touchend', 'touchcancel'],
};

let drawingSignature = false;

function addEventListeners(element, event, fn) {
  const evtArray = mappedEventsOn[event];
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
  
  var coords = getOffset(ev);
  if (!coords) {
      return;
  }
  ctxSignature === null || ctxSignature === void 0 ? void 0 : ctxSignature.beginPath();
  ctxSignature === null || ctxSignature === void 0 ? void 0 : ctxSignature.moveTo(coords.x, coords.y);
  drawingSignature = true;
}

function onSigMove(ev) {

  if (!drawingSignature) {
      return;
  }
  ev.preventDefault(); // to prevent scrolling when writing and window is scrollable
  var coords = getOffset(ev);
  if (!coords) {
      return;
  }
  ctxSignature === null || ctxSignature === void 0 ? void 0 : ctxSignature.lineTo(coords.x, coords.y);
  ctxSignature === null || ctxSignature === void 0 ? void 0 : ctxSignature.stroke();
}

function onSigEnd(ev) {
  drawingSignature = false;
}

function clearSignature(ev) {
  ev.preventDefault();
  ctxSignature?.clearRect(0, 0, signCanvas.width, signCanvas.height);
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

ctxSignature.lineWidth = 2;

const resetButton = document.getElementById('resetButton');
  
resetButton.addEventListener ('click',  ev => {
  ev.preventDefault();
  var form = document.getElementById('content');
  form.reset();
  ctxSignature?.clearRect(0, 0, signCanvas.width, signCanvas.height);

  const teethImg = new Image();
  teethImg.src = "images/teeth.svg";
  teethImg.onload = () => {
      ctxTeeth.drawImage(teethImg, 0, 0, 315, 550);    
    }
  ctxTeeth?.clearRect(teethImg, 0, 0, teethCanvas.width, teethCanvas.height);
  
})

const IMappedEvents = {
  start: [],
  move: [],
  end: []
};

// Upload image for signature
var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};

// Choose requested Date from today to the future
dateRequested.min = new Date().toISOString().split("T")[0];

// Sticky buttons nav
window.onscroll = function() {stickyButtons()};
var navbar = document.getElementById("buttons-navbar");
var sticky = navbar.offsetTop;

function stickyButtons() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// Convert typed email to lowercase email
const emailInput = document.getElementById('dentistEmail');
emailInput.addEventListener('input', function() {
  convertToLowercase(this);
});

function convertToLowercase(inputElement) {
  const inputValue = inputElement.value;
  const lowercaseValue = inputValue.toLowerCase();
  inputElement.value = lowercaseValue;
}




