import {Item} from '/beetrail/item/item.js';


export class SpriteItem extends Item{

    constructor(textureURI){
        super();
        this.sprite = new PIXI.Sprite(PIXI.loader.resources[textureURI].texture);
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
}