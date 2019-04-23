let selected, img;

let points     = [];
let grabRadius = 15;
let speed      = 2;
let eSize      = 1271*873;
let animating  = true;
let showPoints = true;

function Point(x, y){
  this.x  = x;
  this.y  = y;
  this.a  = random(TAU);
  this.dx = cos(this.a);
  this.dy = sin(this.a);
  
  this.update = function(){
    this.x += this.dx*speed;
    this.y += this.dy*speed;
    
    if (this.x < 0 || this.x > width ) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;
    
    this.x = constrain(this.x, 0, width );
    this.y = constrain(this.y, 0, height);
  }
  
  this.render = function(){
    (selected === this) ? fill(100) : fill(0, 100, 100);
    ellipse(this.x, this.y, grabRadius);
  }
  
  this.lerp = function(p2, amt){
    return new Point(lerp(this.x, p2.x, amt), lerp(this.y, p2.y, amt));
  }
}

function imgQuad(points){
  if (points.length != 4) return;
  let [a, b, c, d] = points;
  let l1 = dist(a.x, a.y, c.x, c.y);
  let l2 = dist(b.x, b.y, d.x, d.y);
  let len = max(l1, l2);
  
  for (let i = 0; i <= len; i += .5){
    let amt   = i/len;
    let imgY  = amt*img.height;
    let p1    = a.lerp(c, amt);
    let p2    = b.lerp(d, amt);
    let len2  = dist(p1.x, p1.y, p2.x, p2.y);
    let angle = atan2(p2.y-p1.y, p2.x-p1.x);
    push();
    {
      translate(p1.x, p1.y);
      rotate(angle);
      image(img, 0, 0, len2, 1, 0, imgY, img.width, 1);
    }
    pop();
  }
}

function setup(){
  createCanvas();
  colorMode(HSB);
  noStroke();
  windowResized();
  init();
}

function init(){
  points.push(new Point(width*.25, height*.25));
  points.push(new Point(width*.75, height*.25));
  points.push(new Point(width*.25, height*.75));
  points.push(new Point(width*.75, height*.75));
  
  img = loadImage("https://media1.giphy.com/media/6bdplLFyIlkBy/giphy.gif");
}

function draw(){
  background(0);
  if (img) imgQuad(points);
  points.map(p => {
    if (animating)  p.update();
    if (showPoints) p.render();
  });
}

function mouseMoved(){
  selected = undefined;
  for (let i = 0; i < points.length; i++){
    let p = points[i];
    if (dist(p.x, p.y, mouseX, mouseY) < grabRadius){
      selected = p;
      return;
    }
  }
}

function mouseDragged(){
  if (selected){
    selected.x = mouseX;
    selected.y = mouseY;
  }
}

function keyTyped(){
  if (keyCode == 32) animating ^= true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  let s = (width*height)/eSize;
  if (s < 1) s = pow(s, .5);
  grabRadius = 15*s;
  speed = 2*s;
}