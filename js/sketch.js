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

const SPOOKY_TEXT = 'THE INTERNET IS WATCHING YOU!'


let index = 0;
selectedText = '';
write = true;
selectedText = SPOOKY_TEXT.split('');
if (selectedText != '') {
  SI = setInterval(() => {
    let myDiv = document.getElementById('spooky-text');
    if (write) {
      let letter = selectedText[index];
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
 * EYE ANIMATION
 */
function w() {
  return innerWidth
}
function h() {
  return innerHeight
}

let cnv;
let occhiolini = [];
let counter = 0;
function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('p5Sketch');
  occhiolini.push(new Occhilino());

  /**
   * circle packing by Daniel Shiffman 
   * https://github.com/CodingTrain/website/blob/master/Tutorials/P5JS/p5.js/09/9.08_p5.js_Random_Circles_with_No_Overlap/ES6_Version/sketch.js
   */

  while (occhiolini.length < 50) {
    let overlapping = false;
    let proposalCircle = new Occhilino;
    for (let j = 0; j < occhiolini.length; j++) {
      let existingCircle = occhiolini[j];
      let d = dist(proposalCircle.pos.x, proposalCircle.pos.y, existingCircle.pos.x, existingCircle.pos.y);
      if (d < proposalCircle.r + existingCircle.r) {
        overlapping = true;
        break;
      }
    }

    if (!overlapping) occhiolini.push(proposalCircle);

    counter++;
    if (counter > 100000) {
      break;
    }
  }

}

function draw() {
  background(255);
  for (const occhiolino of occhiolini) {
    occhiolino.show();
  }
}
function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}


class Occhilino {
  constructor() {
    this.r = floor(random(30, 75));
    let _x = random(this.r, width - this.r);
    let _y = random(this.r, height - this.r);
    this.pos = createVector(_x, _y);
  }

  show() {
    strokeWeight(2.5);
    let angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    push()
    translate(this.pos.x, this.pos.y);
    noFill();
    ellipse(0, 0, this.r);
    rotate(angle);
    noStroke();
    fill(0, 150, 200);
    ellipse(this.r / 3.5, 0, this.r * 0.35);
    fill(0);
    ellipse(this.r / 3, 0, this.r * 0.15);
    pop();
  }
}