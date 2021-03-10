export class Item {
    constructor(textureURI){
        this.size = [50, 50];
        this.rotation = 0;
        this.direction = 90;
        this.speed = 0;
        this.texture = textureURI;

        this.sprite = new PIXI.Sprite(PIXI.loader.resources[this.texture].texture);

        this._xMovementScaler = 1;
        this._yMovementScaler = 0;
        this._yMovement = 0;
        this._xMovement = 0;

        this.animationTick = 0;
    }

    getSprite(){
        return this.sprite;
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
        this.sprite.x = x;
        this.sprite.y = y;
    }
    getX(){
        return this.sprite.x;
    }
    getY(){
        return this.sprite.y;
    }

    tick(){
        this.sprite.x += this._xMovement;
        this.sprite.y += this._yMovement;

        this.animationTick += 1;
    }
}