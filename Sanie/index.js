var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d",{antialias: true, antialiasSamples: 4});

var width = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;

var counter = 0;
var INC_counter = false;
var test_ball;

var circles = [];
var quantity = 15;

var myPole;

//e is v important parameter - each time you create a listener, it launches the funtion but also gives you the event that happens
//will send you the event "touch start"
function onTouchStart(e){
    INC_counter = true;
}

function onTouchMove(e){
}

function onTouchEnd(e){
   INC_counter = false;
    //side impulse
    for(var i = 0;i<circles.length;i++){
      // e.changedTouches[0].pageX,e.changedTouches[0].pageY = x, y position of finger
      // circles[i].x,circles[i].y = x, y position of circle
      // e.changedTouches[0] - stores the array of all fingers that touch
      // pageX - access the coordinate
      // all this infor is stored in the little e parameter
        var distFromFinger = getDistance(e.changedTouches[0].pageX,e.changedTouches[0].pageY,circles[i].x,circles[i].y);
        //map force - more distant, less force
        var mappedDist = distFromFinger.map(0,height,50,0.9);
        var orientation = e.changedTouches[0].pageX - circles[i].x;
        //lef tand right
        var mappedOrientation = orientation.map(-width,width,1,-1);
        circles[i].vy = -counter*(Math.random()*3+1);
        circles[i].vx = counter/5*mappedOrientation*mappedDist;
    }
}

// function created to find distance from finger to circle
// (finger) x,y ------> (circle) x, y
function getDistance(x1,y1,x2,y2){
  // this is the equation: square root of (x1-y1)*(x1-y2)+(y1-y2)*(y2-y1)
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

function setup(){
    for(var i = 0;i<quantity;i++){
        var c = new Circle(ctx);
        // draws circles at random potition - the radius of the circle
        c.x = Math.random()*(width-100)+50;
        c.y = height-50;
        c.r = 50;
        //add an element into the array (opposite of the shift)
        circles.push(c);

        myPole = new Pole(ctx);
        myPole.x = width/2;
        myPole.y = height/2;

    }

      //interaction
      // set up listeners that wait for these actions
      // my app will wait for the user to start to touch the screen, then lauch the fucntion created "onTOuchStart)"
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);

    draw();
}

function draw(){
    ctx.clearRect(0,0,width,height);
    (INC_counter)?counter++:(counter>0)?counter--:null;

     for(var i = 0;i<circles.length;i++){
         circles[i].move();
         circles[i].display();
     }

     myPole.diplay();

    requestAnimationFrame(draw);
}
setup();


//utils
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function getDistance(x1,y1,x2,y2){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}
