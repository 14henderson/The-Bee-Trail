import {Item} from '/beetrail/item/item.js';


export class SpriteItem extends Item{

    constructor(textureURI, resources){
        super();
        this.sprite = new PIXI.Sprite(resources[textureURI].texture);
        this.sprite.interactive = false;
        this.size = [this.sprite.width, this.sprite.height];
        this._oriWidth = this.sprite.width;
        this._oriHeight = this.sprite.height;
        this.defineEvents();
    }

    
}