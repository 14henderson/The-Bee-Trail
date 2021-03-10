import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item.js';

export class Hub{
    constructor(app){
        //super(appStage);
        this.soemthing = "";
        this.assetsTextures = [];
        this.assets = {}
        this.sprites = {}
        this.createAssets(app);
    }




    createAssets(app){
        this.assetsTextures = ["assets/bee_test.png"];
        PIXI.loader.add(this.assetsTextures).load((loader, resources) => {
            this.sprites.bee = new Item("assets/bee_test.png");//PIXI.Sprite(PIXI.loader.resources[].texture);
            app.stage.addChild(this.sprites.bee.getSprite());
            this.sceneSetup();
            app.ticker.add(delta => this.loop(delta));
        });

        
    }

    sceneSetup(){
        this.sprites.bee.setLocation(100, 100);
        this.sprites.bee.setSpeed(5);
        this.sprites.bee.setDirection(90);
    }

    loop(){
        this.sprites.bee.tick();
        if(this.sprites.bee.getX() > 180){
            this.sprites.bee.setDirection(270);
        }else if (this.sprites.bee.getX() < 0){
            this.sprites.bee.setDirection(90);
        }

        //this.sprites.bee.getSprite().x +=10;
    }
    


    


    
}