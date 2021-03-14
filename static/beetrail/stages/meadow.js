import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item.js';
import {Foreground} from '/beetrail/foregroundContainer.js'
import {EventChain} from '/beetrail/eventChain.js';


export class MeadowStage{
    constructor(app){
        this.assetsTextures = [];
        this.assets = {}
        this.sprites = {}
        this.setup(app);
        this.states = [this.start, this.main, this.end];
        this.state = this.start;
        this.app = app;
        this.eventChain = new EventChain();
    }

    setup(){
        this.assetsTextures = ["assets/Artboard 1grass-background.png",
                                "assets/Artboard 1grass-foreground.png",
                                "assets/Artboard 1grass-middleground.png",
                                "assets/Artboard 1meadow-foreground.png",
                                "assets/Artboard 1honeyb-profile-left.png"];
        PIXI.loader.add(this.assetsTextures).load((loader, resources) => {
            this.sprites.background1 = new Item("assets/Artboard 1grass-background.png", true);
            this.sprites.background2 = new Item("assets/Artboard 1grass-middleground.png", true);
            this.sprites.background3 = new Item("assets/Artboard 1grass-foreground.png", true);
            this.sprites.foregroundMeadow = new Item("assets/Artboard 1meadow-foreground.png", true);
            this.sprites.bee1 = new Item("assets/Artboard 1honeyb-profile-left.png", true);
            this.sprites.bee1.setScale(0.1);
            this.foreground = new Foreground();
            this.foreground.tick();
            

            this.assetCreation();
            this.assetPositioning();
            this.app.stage.addChild(this.foreground.getSprite());
            this.app.ticker.add(delta => this.loop(delta));
        });        
    }

    assetCreation(){
        let backColour = new PIXI.Graphics()
            .beginFill(0xE8E8E8)
            .drawRect(0, 0, this.sprites.background1.getSprite().width, window.innerHeight)
            .endFill();
        this.sprites.backgroundCol = new Item(backColour, false);
    }
    assetPositioning(){
        
        this.app.stage.addChild(this.sprites.backgroundCol.getSprite());
        this.app.stage.addChild(this.sprites.background1.getSprite());
        this.app.stage.addChild(this.sprites.background2.getSprite());
        this.app.stage.addChild(this.sprites.background3.getSprite());
        this.app.stage.addChild(this.sprites.foregroundMeadow.getSprite());
        
        this.foreground.addChild(this.sprites.bee1.getSprite());

        this.eventChain.addFade(this.sprites.bee1, -1, 0.1, 2)
            .addSleep(100)
            .addFade(this.sprites.bee1, 1, 0.1, 0.9);
    }



    loop(delta){
        this.state(delta);
    }
    


    //STATES
    start(delta){
        
        this.sprites.background1.centerX();
        this.sprites.background1.scaleByHeight(window.innerHeight);
        this.sprites.background1.tick();

        this.sprites.background2.centerX();
        this.sprites.background2.scaleByHeight(window.innerHeight);
        this.sprites.background2.tick();

        this.sprites.background3.centerX();
        this.sprites.background3.scaleByHeight(window.innerHeight);
        this.sprites.background3.tick();

        this.sprites.foregroundMeadow.centerX();
        this.sprites.foregroundMeadow.scaleByHeight(window.innerHeight);
        this.sprites.foregroundMeadow.tick();
        
        this.sprites.backgroundCol.centerX();
        this.sprites.backgroundCol.scaleByHeight(window.innerHeight);
        this.sprites.backgroundCol.tick();

        this.sprites.bee1.tick();
        //console.log("alpha:", this.sprites.foregroundMeadow.getAlpha());
        this.foreground.tick();
        this.eventChain.tick();
        //console.log(this.sprites.bee.getX(), this.sprites.bee.getY());
    }

    main(delta){

    }

    end(delta){

    }


    


    
}