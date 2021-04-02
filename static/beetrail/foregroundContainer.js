
export class Foreground extends PIXI.Container{
    constructor(){
        super();
        this.ID = Math.random().toString(36).substring(7);
        this.sortableChildren = true;
        this.interactive = true;

        this.maskRect = new PIXI.Graphics() //container is only the size of it's contents...
            .lineStyle(4, 0xFF3300, 0)  //...a Graphics object defines the whole play area.
            .drawRect(0, 0, 1280, 960);
        this.addChild(this.maskRect);
        this._zCounter = 0;
        this._clicked = false;

        this.on('mousedown', event =>{
            this._clicked = true;
        });
    }

    getClickedState(){
        return this._clicked;
    }
    resetClickedState(){
        this._clicked = false;
    }

    addAllSprites(sprites){
        for(const [key, val] of Object.entries(sprites)){
            this.addChild(val.getSprite());
            val.getSprite().zIndex = this._zCounter;
            this._zCounter += 2;
        }
    }
    getSprite(){
        return this;
    }

    tick(){
        this.centerContainer();
        this.fitToWindow();
    }

    getID(){
        return this.ID;
    }
    //addChild(sprite){
    //    this.sprite.addChild(sprite);
        
   // }
    dissableInteractiveState(){
        //do nothing
    }
    enableInteractiveState(){

    }
    dissableDrag(){
        //do nothing
    }
    enableDrag(){
        
    }
    centerContainer(){
        this.y = 0;
        this.x = (window.innerWidth/2)-(this.width/2);
    }

    fitToWindow(){
        this.height = window.innerHeight;
        this.width = (4/3)*this.height;   
    }
}