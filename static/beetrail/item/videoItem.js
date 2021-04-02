import {Item} from '/beetrail/item/item.js';


export class VideoItem extends Item{

    constructor(textureURI, resources){
        super();
        let tex = PIXI.Texture.from(resources[textureURI].data);
        this.sprite = new PIXI.Sprite(tex);

        
        tex.baseTexture.resource.autoPlay = false;
        tex.baseTexture.resource.source.preload = 'auto';
        this.sprite._texture.baseTexture.resource.source.pause();
        
        this.sprite.interactive = false;
        this.size = [this.sprite.width, this.sprite.height];
        this._oriWidth = this.sprite.width;
        this._oriHeight = this.sprite.height;
        this._mouseHovered = false;


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

        this.sprite.on('mouseover', event => {
            this._mouseHovered = true;
        });
        this.sprite.on('mouseout', event => {
            this._mouseHovered = false;
        });
    }

    onMouseHover(){
        return this._mouseHovered;
    }
}