// define the font! these are 5x7 dot-matrix characters, but...
var F = [
  [1,1,1,1,1],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,1,1,1,0],
  [1,0,0,0,0],
  [1,0,0,0,0],
  [1,0,0,0,0]
]  

var G = [
  [0,1,1,1,0],
  [1,0,0,0,1],
  [1,0,0,0,0],
  [1,0,0,1,1],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [0,1,1,1,0]
];

// a circle for every possible dot in the matrix
var circles = [];

function setup() {
  createCanvas(285, 400);
  // for every row...
  for (var r = 0; r < 7; r++) {
    // for every column in that row...
    for (var c = 0; c < 5; c++) {
      // make a circle in a random place
      circles.push({
        x: random(-width, 2*width), // width/5 * (c + 0.5),
        y: random(-height, 2*height) // height/7 * (r + 0.5),
      });
    }
  }
}

function draw() {
  background(220);
  
  // draw every circle
  for (var i = 0; i < circles.length; i++ ) {
    let circle = circles[i];
    noStroke();
    ellipse(circle.x + random(2), circle.y+random(2), 50);
    if (circle.targetX) {
	    circle.x = 0.9 * circle.x + 0.1*circle.targetX;
    }
    if (circle.targetY) {
      circle.y = 0.9 * circle.y + 0.1*circle.targetY;
    }
  }
}

function keyPressed() {
  var letter;
  if (key == 'f') {
    letter = F;
  }
  if (key == 'g') {
    letter = G;
  }
  
  // for every row...
  for (var r = 0; r < 7; r++) {
    // for every column in tht row...
    for (var c = 0; c < 5; c++) {
      // get the circle for this location
      let circle = circles[r*5+c];
      // here's where the circle should go...
      let x = width/5 * (c + 0.5);
      let y = height/7 * (r + 0.5);
      
      // but do we draw it?
      if (letter[r][c] > 0) {
        // yes! move the circle to the x and y
        circle.targetX = x;
        circle.targetY = y;
      } else {
        // no! change x so that it's offscreen
        if (x < width/2) {
          x = -50;
        } else {
          x = width+50;
        }
        circle.targetX = x;
        circle.targetY = y;
      }
    }
  }
}