var Pole = function (ctx){
    this.ctx = ctx;
    this.color="rgba(255,255,255,1)";
    this.x;
    this.y;
    this.r;
   }


   Pole.prototype = {
       display:function(){
        this.ctx.fillStyle = this.color;
   //draw the circle
        ctx.rect(width/2,height/2,150,100);
         //this.ctx.fill();
        // this.ctx.stroke();
       }
     }
