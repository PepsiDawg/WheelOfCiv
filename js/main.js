function setup() {
  this.boxSize = (windowWidth < windowHeight) ? windowWidth : windowHeight;
  this.cnvs = createCanvas(this.boxSize/2,this.boxSize/2);
  this.cnvs.parent('canvas-container');
  this.civName = document.querySelector("#civ-name");
  this.slices = 23;
  this.angle = 360/this.slices;
  this.startAngle = random(360);
  this.angOffset = 90%this.angle;
  this.lastCiv = -1;
  this.power = 0;
  drawSpinner();
}

function draw() {
  if(this.power > 0) {
    let newAng = (this.startAngle - map(this.power,0,500,0,10));
    this.startAngle = newAng < 0 ? 360 : newAng;
    drawSpinner();
    this.power--;
  }
}

function mouseClicked() {
  let wM = width/2;
  let hM = height/2;
  if(mouseX <= wM+35 && mouseX >= wM-35 && mouseY <= hM+35 && mouseY >= hM-35) {
    this.power = Math.floor(random(200)) + 300;
  } 
  return false;
}

function drawSpinner() {
  drawBorder();
  drawWheel(this.startAngle);
  drawSpinBTN();
  rect(width/2,0, 1, height/15);
  if(this.lastCiv != getSelectedOption()) {
    this.lastCiv = getSelectedOption();
    this.civName.innerHTML = civs[this.lastCiv].name;
  }
}

function drawBorder() {
  push();
  stroke(94,71,43);
  strokeWeight(10);
  ellipse(width/2, height/2, width-12, height-12);
  pop();
}

function drawSpinBTN() {
  push();
  strokeWeight(4);
  fill(255,0,0);
  ellipse(width/2,height/2,75,75);
  fill(0);
  textSize(24);
  textAlign(CENTER);
  fill(255);
  text("SPIN!", width/2-20, height/2-12, 50, 25);
  pop();
}

function drawWheel(startingAngle) {
  let dia = width-25;
  push();
  translate(width/2,height/2);
  rotate(radians(-90));
  translate(-width/2,-height/2);
  for(let slice = 0; slice < this.slices; slice++) {
    let civ = civs[slice];
    let col = map(slice, 0,23,0,255);
    let start = radians(startingAngle + (this.angle*slice));
    let end = radians(startingAngle + (this.angle*(slice+1)));
    fill(civ.fill.r, civ.fill.g, civ.fill.b);
    strokeWeight(3);
    stroke(civ.stroke.r, civ.stroke.g, civ.stroke.b);
    arc(width/2, height/2, dia, dia, start, end, PIE);
  }
  pop();
}

function getSelectedOption() {
  let ans = 22-Math.floor((this.startAngle)/this.angle);
  return ans < 0 ? 0 : ans;
}