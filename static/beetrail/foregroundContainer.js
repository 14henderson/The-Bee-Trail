export class Foreground{
    constructor(){
        this.sprite = new PIXI.Container();
        this.mask = new PIXI.Graphics()
            .lineStyle(4, 0xFF3300, 1)
            .drawRect(0, 0, (4/3)*window.innerHeight, window.innerHeight);
        this.sprite.addChild(this.mask);

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
    }

    centerContainer(){
        this.sprite.y = 0;
        this.sprite.x = (window.innerWidth/2)-(this.mask.width/2);
    }

    fitToWindow(){
        let ratio = this.mask.width/this.mask.height;
        this.mask.height = window.innerHeight;
        this.mask.width = ratio*this.mask.height;
    }
}