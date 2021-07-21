import {Item} from '/beetrail/item/item.js';


export class ShapeItem extends Item{
    constructor(spriteObj){
        super();
        this.sprite = spriteObj;
        this.sprite.interactive = false;
        this.size = [this.sprite.width, this.sprite.height];
        this._mouseHovered = false;


        this.sprite.on('pointerdown', event =>{
            this._clicked = true;
            this._beingDragged = true;
        });

        this.sprite.on('pointerup', event =>{
            this._beingDragged = false;
        });

        this.sprite.on('pointermove', event => {
            if(this.dragged && this._beingDragged){
                this.sprite.x = event.data.getLocalPosition(this.sprite.parent).x;
                this.sprite.y = event.data.getLocalPosition(this.sprite.parent).y;             
            }
        });

        this.sprite.on('pointerover', event => {
            this._mouseHovered = true;
        });
        this.sprite.on('pointerout', event => {
            this._mouseHovered = false;
        });
    }

    onMouseHover(){
        return this._mouseHovered;
    }
}