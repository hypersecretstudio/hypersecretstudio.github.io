/**
 * TEXT ANIMATION
 */

/**
 * CHANGE WEBSITE TITLE DYNAMICALLY WITH EMOJI
 */
const EMOJIS = [
  '🦑',
  '🍑',
  '🐋',
  '🌏',
  '🌍',
  '🌎',
  '🌈',
  '🌞',
  '🏩',
  '🕳',
]
setInterval(() => {
  document.title = randomEmoji() + randomEmoji() + randomEmoji();
}, 2000);

function randomEmoji() {
  let randIndex = Math.floor(Math.random() * EMOJIS.length);
  return EMOJIS[randIndex];
}
const NEW_LINE = '$'
const SPOOKY_TEXT = 'HYPER SECRET STUDIO IS GOING UNDER CONSTRUCTION.' + NEW_LINE + '🚧 🏗 👷'


let index = 0;
selectedText = '';
write = true;
selectedText = SPOOKY_TEXT.split('');
if (selectedText != '') {
  SI = setInterval(() => {
    let myDiv = document.getElementById('spooky-text');
    if (write) {
      let letter = selectedText[index];
      if (letter === NEW_LINE) letter = '<br>'
      myDiv.innerHTML += letter;
      myDiv.scrollTop = myDiv.scrollHeight;
      index++;
    }
    if (index >= selectedText.length) {
      write = false;
      setTimeout(() => {
        clearInterval(SI);
      }, 2000);
    }
  }, 100);

}



/**
 * 3D ANIMATION
 */


const SIZE = 75;
const DEPTH = 370;
const START_VALUE = 100;
const SPIN = 0.05;
const RANGE = 0.25;


let cylH = 150;
let torD = 30;
let r = 5;
let rot = 0;
let start = false;
let startCount = 0;
let cnv;
function setup() {
  cnv = createCanvas(innerWidth, innerHeight, WEBGL);
  cnv.parent('p5Sketch');
  noStroke();
}

function draw() {
  background(0);
  ortho();
  var locY = (mouseY / height - 0.5) * (-2);
  var locX = (mouseX / width - 0.5) * 2;

  ambientLight(100, 80, 80);
  pointLight(200, 200, 200, locX, locY, 0);
  normalMaterial();
  // let x = map(sx, -9, 9, -width * 0.85, width * 0.85);
  let rotx = map(mouseX, 0, width, -PI, PI);
  let roty = map(mouseY, 0, height, -PI, PI);


  rotateY(rotx);
  rotateZ(roty)
  sphere(cylH / 2);
  let looop = 4;
  for (let i = 0; i < looop; i++) {
    let angle = map(i, 0, looop, -PI, PI);
    HOOP(angle);
    ballInHOOP(angle);
  }

  
  rot += PI / 550;
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight, WEBGL);
}

function ballInHOOP(start){
  push();
  rotateX(start + rot * 4);
  translate(0, cylH)
  let bottom  = (-cylH / 2) + torD * 0.85;
  let top = cylH - torD
  let sphereH = map(abs(cos((rot * 6))), 0, 1, bottom, top);
  translate(0, sphereH);
  sphere(torD * 0.65);
  pop();
}

function HOOP(start) {
  // rotateY(rot);
  push();
  rotateX(start + rot);
  translate(0, cylH)
  cylinder(r, cylH);
  translate(0, cylH - torD);
  rotateY((start % 2 == 0 ? rot : -rot) * 6);
  torus(torD, r);
  pop();
}

function updateFormIndex(val) {
  let prev = val;
  while (true) {
    val = floor(random(4));
    if (val != prev) break;
  }
  return val;
}

/**
 * DEVICE MOTION
 */

/* PREFS */
const easing = 0.05; // set between 0 - 1

/* VARS */
let rx, ry, rz, sx, sy, sz;
rx = ry = rz = sx = sy = sz = 0;

/* ONDEVICEMOTION */
// https://developer.mozilla.org/en-US/docs/Web/Events/devicemotion
window.ondevicemotion = event => {
  /* RAW VALUES */
  rx = event.accelerationIncludingGravity.x;
  ry = event.accelerationIncludingGravity.y;
  rz = event.accelerationIncludingGravity.z;

  /* SMOOTHED VALUES */
  sx = smoothVal(rx, sx);
  sy = smoothVal(ry, sy);
  sz = smoothVal(rz, sz);
};

/* VALUE MAPPING */
function mapVal(value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}

/* VALUE SMOOTHING */
function smoothVal(inputVal, outputVal) {
  let tarVal = inputVal;
  let calcVal = tarVal - outputVal;
  outputVal += calcVal * easing;
  return outputVal;
}
