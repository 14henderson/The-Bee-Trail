
export class Item {
    ID;
    sprite;
    _oriWidth; _oriHeight;
    size;

    constructor(){
        this.ID = Math.random().toString(36).substring(7);
        this.rotation = 0;
        this.direction = 90;
        this.speed = 0;

        this._centered = false;
        this._locAbsFlag = [true, true];
        this._xMovementScaler = 1;
        this._yMovementScaler = 0;
        this._yMovement = 0;
        this._xMovement = 0;
        this._alphaDelta = 0;
        this._alphaMin = .2;
        this._alphaMax = 1;
        this.acceleration = 0;
        this.scale = 1;

        this.spriteDirection = 'l';
        this.animationTick = 0;

        this.dragged = false;
        this._clicked = false;
        this._beingDragged = false;
        
    }

    getID(){
        return this.ID;
    }
    _onClick(){
        this._clicked = true;
    }
    getClickedState(){
        //console.log("Internal Item Clicked State: ", this._clicked);
        return this._clicked;
    }
    getDragState(){
        return this._beingDragged;
    }
    resetClickedState(){
        this._clicked = false;
        this._beingDragged = false;
    }
    enableDrag(){
        console.log("Dragging enabled!");
        this.dragged = true;
        this._beingDragged = false;
    }
    dissableDrag(){
        console.log("Dragging dissabled!");
        this.dragged = false;
    }

    enableInteractiveState(){
        console.log("Interactiveness enabled");
        this.sprite.interactive = true;
    }
    dissableInteractiveState(){
        console.log("Interactiveness dissabled");
        this.sprite.interactive = false;
    }

    getSprite(){
        return this.sprite;
    }

    setPivot(xf, yf){
        this.sprite.pivot.set(
            this._oriWidth*xf,
            this._oriHeight*yf
        );
    }
    centerPivot(){
        this.sprite.pivot.set(
            this._oriWidth/2,
            this._oriHeight/2
        );
    }
    getXPivot(){
        return this.sprite.pivot.x;
    }
    getYPivot(){
        return this.sprite.pivot.y;
    }

    setDirection(degrees){
        degrees = degrees % 360
        let radians = degrees * (Math.PI/180) % 180;
        this._xMovementScaler = Math.sin(radians);
        this._yMovementScaler = Math.cos(radians);

        if(0 <= degrees && degrees < 90){this._yMovementScaler *= -1;}
        if(90 <= degrees && degrees < 180){this._yMovementScaler = Math.abs(this._yMovementScaler);}
        if(180 <= degrees && degrees < 270){
            this._yMovementScaler = Math.abs(this._yMovementScaler);}
        if(270 <= degrees && degrees < 360){
            this._yMovementScaler *= -1;
        }
        this.setSpeed(this.speed);
    }

    setSpeed(speed){
        this.speed = speed;
        this._yMovement = speed*this._yMovementScaler;
        this._xMovement = speed*this._xMovementScaler;
    }

    setLocation(x, y){
        if(this.sprite.anchor == null){
            this.sprite.x = x;
            this.sprite.y = y;
        }
        else {
            if(this._locAbsFlag[0] == false){
                this.sprite.x = (window.innerWidth/2) - (this.size[0]/2) + x;
            }else{
                if(x - (this.sprite.anchor.x*this.sprite.width) >= 0){
                    this.sprite.x = x;
                    console.log("Setting x Locaiton from here");
                }
            }
            if(this._locAbsFlag[1] == false){
                this.sprite.y = window.innerHeight/2 + y;
            }else{
                if(y - (this.sprite.anchor.y*this.sprite.height) >= 0){
                    this.sprite.y = y;
                    console.log("Setting y Locaiton from here");
                }
            }
        }
    }

    bringForward(){
        this.sprite.zIndex += 2;
    }
    bringBefore(item){
        if(item.getSprite().zIndex % 2 == 0){
            this.sprite.zIndex = item.getSprite().zIndex + 1;
        }else{
            this.sprite.zIndex = item.getSprite().zIndex;
        }
    }
    bringBehind(item){
        if(item.getSprite().zIndex % 2 == 0){
            this.sprite.zIndex = item.getSprite().zIndex - 1;
        }else{
            this.sprite.zIndex = item.getSprite().zIndex;
        }
    }
    
    setRotation(angle){
        this.sprite.angle = angle;
    }
    getRotation(){return this.sprite.angle;}

    setSpriteDirection(dir){
        if(dir != this.spriteDirection){
            if(dir == 'l'){
                this.sprite.scale.x = Math.abs(this.getScale())*1;
            }else if(dir == 'r'){
                this.sprite.scale.x = Math.abs(this.getScale())*-1;
            }
            this.spriteDirection = dir;
        }
    }

    setSpriteAnchor(x, y){
        this.sprite.anchor.x = x;
        this.sprite.anchor.y = y;
    }
    setAbsoluteFlag(axis, bool){
        if(axis=='x'){this._locAbsFlag[0] = bool;}
        if(axis=='y'){this._locAbsFlag[1] = bool;}
    }

    scaleByHeight(newHeight){
        let ratio = this.size[0]/this.size[1];
        this.size[1] = newHeight;
        this.size[0] = ratio * this.size[1];
        this.sprite.width = this.size[0];
        this.sprite.height = this.size[1];
    }
    setScale(s){
        this.scale = s;
        this.sprite.width = this._oriWidth*s;
        this.sprite.height = this._oriHeight*s;
    }
    getScale(){
        return this.scale;
    }
    setSize(w, h){
        this.size = [w, h];
        this.sprite.width = w;
        this.sprite.height = h;
    }

    getX(){return this.sprite.x;}
    getY(){return this.sprite.y;}
    getAcceleration(){return this.acceleration;}
    getSpeed(){return this.speed;}
    getWidth(){return this.sprite.width;}
    getHeight(){return this.sprite.height;}
    getAlpha(){return this.sprite.alpha;}

    flip(axis){
        if(axis=='x'){
            this.sprite.scale.x *= -1;
        }else if(axis=='y'){
            this.sprite.scale.y *= -1;
        }
    }

    setAcceleration(a){
        this.acceleration = a/100;
    }
    tick(){
        this.sprite.x += this._xMovement;
        this.sprite.y += this._yMovement;
        if(this.speed < 50){this.speed += this.speed*this.acceleration;}
        
        if(this.sprite.alpha + this._alphaDelta > this._alphaMin 
            && this.sprite.alpha + this._alphaDelta < this._alphaMax){
                this.sprite.alpha += this._alphaDelta;
            }
        

        
        //this.setLocation(this.location[0], this.location[1]);
        if(this._centered){this.centerX();}
        this.animationTick += 1;
    }

    setAlpha(alpha){
        this.sprite.alpha = alpha;
    }
    setFadeAnimation(min, max, delta){
        this._alphaMin = min;
        this._alphaMax = max;
        this._alphaDelta = delta;
    }
/*
    onMouseHover(app){
        //console.log(app.renderer.plugins.interaction.mouse.global.x-this.sprite.parent.x,
        //    app.renderer.plugins.interaction.mouse.global.y-this.sprite.parent.y
         //   );
        return ((app.renderer.plugins.interaction.mouse.global.x-this.sprite.parent.x) > this.getX()
            && (app.renderer.plugins.interaction.mouse.global.x-this.sprite.parent.x) < this.getX()+this.size[0]
            && (app.renderer.plugins.interaction.mouse.global.y-this.sprite.parent.y) > this.getY()
            && (app.renderer.plugins.interaction.mouse.global.y-this.sprite.parent.y) < this.getY()+this.size[1]);    
    }*/

    getSize(){
        this.size = [this.sprite.width, this.sprite.height];
        return this.size;
    }

    centerX(){
        this._centered = true;
        this.sprite.x = (window.innerWidth/2)-(this.getSize()[0]/2)
       // console.log(this.size[0]);
        // = this.location[0];
    }
}
