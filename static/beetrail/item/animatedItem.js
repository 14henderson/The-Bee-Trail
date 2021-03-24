import {Item} from '/beetrail/item/item.js';


export class AnimatedItem extends Item{
    constructor(textureURIArray){
        super();
        this.textureArray = [];
        for(let i=0; i<textureURIArray.length; i++){
            this.textureArray.push(PIXI.loader.resources[textureURIArray[i]].texture);
        }
        this.sprite = new PIXI.AnimatedSprite(this.textureArray);
        this.sprite.interactive = false;
        this.size = [this.sprite.width, this.sprite.height];
        this._oriWidth = this.sprite.width;
        this._oriHeight = this.sprite.height;


        this.sprite.on('mousedown', event =>{
            this._clicked = true;
            this._beingDragged = true;
        });

        this.sprite.on('mouseup', event =>{
            this._beingDragged = false;
        });

        this.sprite.on('mousemove', event => {
            if(this.dragged && this._beingDragged){
                this.sprite.x = event.data.getLocalPosition(this.sprite.parent).x;// - this.sprite.anchor.x*(this.sprite.width/2);
                this.sprite.y = event.data.getLocalPosition(this.sprite.parent).y;// - (this.sprite.height/2);                
            }
        });
    }

    gotoFrame(num){
        this.sprite.gotoAndStop(num);
    }
}