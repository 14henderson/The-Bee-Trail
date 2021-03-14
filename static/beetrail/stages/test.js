import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item.js';
import {Foreground} from '/beetrail/foregroundContainer.js'

export class Test{
    constructor(app){
        //super(appStage);
        this.soemthing = "";
        this.assetsTextures = [];
        this.assets = {}
        this.sprites = {}
        this.setup(app);
        this.states = [this.start, this.main, this.end];
        this.state = this.start;
        this.app = app;
        this.foreground;

        //window.onresize = this.assetPositioning;
    }

    setup(){
        this.assetsTextures = ["assets/bee_test.png",
                                "assets/backgrounds/hub.png"];
        PIXI.loader.add(this.assetsTextures).load((loader, resources) => {
            this.foreground = new Foreground();
            //this.sprites.background = new Item("assets/backgrounds/hub.png", true);
            //this.app.stage.addChild(this.sprites.background.getSprite());

                //this.foreground = new Item(new PIXI.Container(), false);
            //this.sprites.foregroundMask = new PIXI.Graphics()
                //this.foregroundMask = new Item();
                //this.foregroundMask.setSize((4/3)*window.innerHeight, window.innerHeight);
                //this.foreground.getSprite().addChild(this.foregroundMask.getSprite());
            //console.log("Width should be: ", (4/3)*window.innerHeight, window.innerHeight);
            //this.foreground.setSize((4/3)*window.innerHeight, window.innerHeight);

            //console.log(this.foreground.getSprite().width, this.foreground.getSprite().height);

            this.assetCreation();
            this.assetPositioning();
            this.app.ticker.add(delta => this.loop(delta));
        });        
    }

    assetCreation(){
        this.sprites.bee = new Item("assets/bee_test.png", true);
            //this.foreground.getSprite().addChild(this.sprites.bee.getSprite());
        this.app.stage.addChild(this.foreground.getSprite());
        this.foreground.addChild(this.sprites.bee.getSprite());
        //this.foreground.getSprite().addChild(this.sprites.bee.getSprite());

        //this.app.stage.addChild(this.foreground.getSprite());
        //this.app.stage.addChild(this.sprites.bee.getSprite());
    }

    assetPositioning(){
        //this.sprites.background.setAbsoluteFlag('x', false);
        //this.sprites.background.scaleByHeight(window.innerHeight);
        //this.sprites.background.setLocation(0, 0);

        //this.foreground.setAbsoluteFlag('x', false);
        //console.log(this.foreground.getSprite().width, this.foreground.getSprite().height);
        //this.foreground.scaleByHeight(window.innerHeight);
        //console.log(this.foreground.getSprite().width, this.foreground.getSprite().height);
        //this.foreground.setLocation(0, 0);
        //this.foreground.centerX();

        
        //this.foreground.getSprite().x = 100;
        //this.foreground.getSprite().y = 100;

        this.sprites.bee.setLocation(0, 0);
    }



    loop(delta){
        this.state(delta);
    }
    


    //STATES
    start(delta){

        this.sprites.bee.tick();
        this.foreground.tick();
    }

    main(delta){

    }

    end(delta){

    }


    


    
}