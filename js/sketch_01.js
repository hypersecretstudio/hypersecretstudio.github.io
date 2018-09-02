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
const SPOOKY_TEXT = '🚧 🏗 👷' + NEW_LINE + 'HYPER SECRET STUDIO IS UNDER CONSTRUCTION'


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
let mx;
let my;
let start = false;
let startCount = 0;
let cnv;
let uniformsShader;
let isMobile = false;
function preload() {
  uniformsShader = loadShader('vertex.vert', 'drip.frag');
}
function setup() {
  cnv = createCanvas(innerWidth, innerHeight, WEBGL);
  cnv.parent('p5Sketch');
  noStroke();
  rectMode(CENTER);
  /**
   * MOBILE CHECK
   */

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
    console.log('is mobile!');
  } else {
    isMobile = false;
  }
}

function draw() {
  background(20, 20, 220);



  /**
   * SHADER STUFF
   */
  push();
  shader(uniformsShader);
  rect(0, 0, width, height);
  pop();
  if (isMobile) {
    // if is mobile than we track the device rotation
    // console.log('SX ' + sx);
    // console.log('SY ' + sy);
    mx = constrain(map(sx, -9, 9, 0, 1), 0, 1);
    my = constrain(map(sy, -9, 9, 0, 1), 0, 1);
    // console.log(mx, my);
  } else {
    // we track the mouse
    mx = map(mouseX, 0, width, 0, 1);
    my = map(mouseY, 0, height, 0, 1);
  }
  // lets just send frameCount to the shader as a way to control animation over time
  uniformsShader.setUniform('u_time', millis() / 1000);
  uniformsShader.setUniform('u_resolution', [width, height]);
  //drip uniforms
  uniformsShader.setUniform('intense', 0.5);
  uniformsShader.setUniform('speed', 1.0);
  uniformsShader.setUniform('graininess', [mx, my]);
  uniformsShader.setUniform('u_mouse1', returnRGBcolor()[0]);
  uniformsShader.setUniform('u_mouse2', returnRGBcolor()[1]);


  /**
   * 3D rendering
   */
  ortho();
  normalMaterial();

  // ANIMATION
  let rotx = map(mx, 0, 1, -PI, PI);
  let roty = map(my, 0, 1, -PI, PI);
  push();
  translate(0, 0, 300);
  rotateZ(roty);
  rotateY(rotx);
  sphere(cylH / 2);
  let looop = 4;
  for (let i = 0; i < looop; i++) {
    let angle = map(i, 0, looop, -PI, PI);
    HOOP(angle);
    ballInHOOP(angle);
  }
  pop();

  rot += PI / 550;
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight, WEBGL);
}

function ballInHOOP(start) {
  push();
  rotateX(start + rot * 4);
  translate(0, cylH)
  let bottom = (-cylH / 2) + torD * 0.85;
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
 * @returns an array of colors to be used as vec3 uniform in the shader
 */
function returnRGBcolor() {
  let color1 = [];
  let color2 = [];
  let x;
  let y;
  if (isMobile) {

    x = map(mx, 0, 1, 0, 255);
    y = map(my, 0, 1, 0, 255);
  } else {
    x = map(mouseX, 0, width, 0, 255);
    y = map(mouseY, 0, height, 0, 255);
  }
  // if is color mode
  colorMode(HSB);

  let col1 = color(x, 255, 255);
  let col2 = color(y, 255, 255);

  color1[0] = map(red(col1), 0, 255, 0, 1);
  color1[1] = map(green(col1), 0, 255, 0, 1);
  color1[2] = map(blue(col1), 0, 255, 0, 1);

  color2[0] = map(red(col2), 0, 255, 0, 1);
  color2[1] = map(green(col2), 0, 255, 0, 1);
  color2[2] = map(blue(col2), 0, 255, 0, 1);

  colorMode(RGB);
  return [color1, color2];
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
