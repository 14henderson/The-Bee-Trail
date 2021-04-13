import {Item} from '/beetrail/item/item.js';


export class AnimatedItem extends Item{
    constructor(textureURIArray, resources, name=null){
        super();
        if(name != null){this.ID = name;}
        this.textureArray = [];
        for(let i=0; i<textureURIArray.length; i++){
            this.textureArray.push(resources[textureURIArray[i]].texture);
        }
        this.sprite = new PIXI.AnimatedSprite(this.textureArray);
        this.sprite.interactive = false;
        this.size = [this.sprite.width, this.sprite.height];
        this._oriWidth = this.sprite.width;
        this._oriHeight = this.sprite.height;
        this._hoverEnabled = false;
        this._mouseHovered = false;
        this.hoverFrame = 0;


        this.sprite.on('pointerover', event => {
            this._mouseHovered = true;
            if(this._hoverEnabled){
                this.gotoFrame(this.hoverFrame);
            }
        });
        this.sprite.on('pointerout', event => {
            this._mouseHovered = false;
            if(this._hoverEnabled){
                this.gotoFrame(0);
            }
        });
        this.defineEvents();
    }

    gotoFrame(num){
        this.sprite.gotoAndStop(num);
        this._oriWidth = this.sprite.textures[this.sprite.currentFrame].width;
        this._oriHeight = this.sprite.textures[this.sprite.currentFrame].height;
        if(this._pivotCentered){
            this.centerPivot();
        }
        //this.centerPivot();
    }

    enableMouseHoverFrame(fNum){
        this._hoverEnabled = true;
        this.hoverFrame = fNum;
    }
    onMouseHover(){
        return this._mouseHovered;
    }
}