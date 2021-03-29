export class Foreground{
    constructor(){
        this.sprite = new PIXI.Container();
        this.sprite.sortableChildren = true;

        this.mask = new PIXI.Graphics() //container is only the size of it's contents...
            .lineStyle(4, 0xFF3300, 0)  //...a Graphics object defines the whole play area.
            .drawRect(0, 0, 1280, 960);
        this.sprite.addChild(this.mask);
        this._zCounter = 0;
    }

    addAllSprites(sprites){
        for(const [key, val] of Object.entries(sprites)){
            this.addChild(val.getSprite());
        }
    }
    getSprite(){
        return this.sprite;
    }

    tick(){
        this.centerContainer();
        this.fitToWindow();
    }

    addChild(sprite){
        this.sprite.addChild(sprite);
        sprite.zIndex = this._zCounter;
        this._zCounter += 2;
    }

    centerContainer(){
        this.sprite.y = 0;
        this.sprite.x = (window.innerWidth/2)-(this.sprite.width/2);
    }

    fitToWindow(){
        let ratio = this.mask.width/this.mask.height;
        this.sprite.height = window.innerHeight;
        this.sprite.width = ratio*this.sprite.height;
        
    }
}