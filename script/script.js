// Signature
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
    // console.log('Signature starting');
    // console.log(ev.type);
    var coords = getOffset(ev);
    if (!coords) {
        return;
    }
    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
    ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(coords.x, coords.y);
    drawing = true;
  }

  function onSigMove(ev) {
    // console.log('Signature moving');
    // console.log(ev.type);
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

// Load teeth image on canvas
const teethImg = new Image();
teethImg.src = "images/teeth-10.svg";
teethImg.onload = () => {
  ctx.drawImage(teethImg, 0, 0, 315, 657);    
}

// Drawing on teeth
const teethCanvas = document.getElementById("teethCanvas");
const toolbar = document.getElementById('toolbar');
const ctx = teethCanvas.getContext('2d');

const canvasOffsetX = teethCanvas.offsetLeft;
const canvasOffsetY = teethCanvas.offsetTop;

teethCanvas.width = 315;
teethCanvas.height = 657;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;

toolbar.addEventListener('click', ev => {
  ev.preventDefault();
  const teethImg = new Image();
  teethImg.src = "images/teeth-10.svg";
  
    if (ev.target.id === 'clear') {   
    teethImg.onload = () => {
      ctx.drawImage(teethImg, 0, 0, 315, 657);    
    }
    ctx.clearRect(teethImg, 0, 0, teethCanvas.width, teethCanvas.height);
    }
});

toolbar.addEventListener('change', ev => {
    if(ev.target.id === 'stroke') {
        ctx.strokeStyle = ev.target.value;
    }

    if(ev.target.id === 'lineWidth') {
        lineWidth = ev.target.value;
    }
    
});

const draw = (ev) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(ev.clientX - canvasOffsetX, ev.clientY);
    ctx.stroke();
}

teethCanvas.addEventListener('mousedown', (ev) => {
    isPainting = true;
    startX = ev.clientX;
    startY = ev.clientY;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(startX - canvasOffsetX, startY);
});

teethCanvas.addEventListener('mouseup', ev => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

teethCanvas.addEventListener('mousemove', draw);

// TODO: Save as PDF
function exportHTMLtoPDF() {
  let htmlElement = document.getElementById('content');
  //office 
  const office = document.getElementById('office');

  //patient-name ??? TODO: think need full name: separate full name as first and last name
  const patient = document.getElementById('patient');

  //date ?? TODO: ask if they want to have date or date-requested, and if they want to have time, like hours:minutes
  const date = document.getElementById('date');

  //TODO: Get the actual time somehow to put in the name of the file
  // const time = 

  html2pdf().from(htmlElement).save('office_patient-name_date_time.pdf');
 
  // html2pdf().from(htmlElement).save(office + '_' + patient + '_' + date + '_' + time + '.pdf');
}

document.getElementById('saveButton').addEventListener('click', exportHTMLtoPDF);

//TODO: Save the form on the server ( subject to discuss). Find out how

//TODO: Send to the pdf file to default email address (provided by us) and to the client (email proved in the form) - Email in the form, ask somewhere the person who fills out the form about their email
//Idea: On submit ask the person of their email


