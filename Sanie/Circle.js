var Circle = function (ctx){
    this.ctx = ctx;
    this.color="rgba(26,217,160,1)";
    this.x;
    this.y;
    this.r;
    this.vx = 0;
    this.vy = 0;
    this.gravity  = 0.7;
    this.friction = 0.9;
    this.ctx.lineWidth = 10;
    this.isallowedtomove = true;
   }

// this?

//makes a prototype of circle, which can then be duplicated
// display cirlce
// fill with color
// stroke is white, opaque
Circle.prototype = {
    display:function (){
      this.ctx.fillStyle = this.color;
      this.ctx.strokeStyle = "rgba(26,217,160,1)";
//draw the circle
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2,true);
      this.ctx.closePath();
      //this.ctx.fill();
      this.ctx.stroke();
    },

// friction??
    move:function(){
      // speed increased by gravity
        this.vy += this.gravity;
        // multiply speed inc by gravity by friction
        // the smaller friction, the less resistance to speed
        this.vy *=this.friction;
        this.vx *=this.friction;
        this.x += this.vx;
        this.y += this.vy;

        if( this.y>window.innerHeight-this.r){this.y = window.innerHeight-this.r;this.vy*=-1;}
        if( this.y<0){this.y = this.r;this.vy*=-1;}
        if(this.x<this.r){
            this.x = this.r;
            this.vx*=-1;
        }
        if(this.x>window.innerWidth-this.r){
            this.x = window.innerWidth-this.r;
            this.vx*=-1;
        }
    },

    setVx:function(val){
        this.vx = val;
    }

}
