import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item.js';
import {EventChain} from '/beetrail/eventChain.js';
import {Movement} from '/beetrail/movementMisc.js';


export class MeadowStage extends Stage{
    constructor(app){
        super(app);
        this.setup(app);

        this.states = [this.start, this.main];
        this.state = this.start;
        
        this.eventChainBee1 = new EventChain();
        this.eventChainBee2 = new EventChain();
    }

    setup(){
        this.assetsTextures = ["assets/bSprites/Artboard 1grass-background.png",
                                "assets/bSprites/Artboard 1grass-foreground.png",
                                "assets/bSprites/Artboard 1grass-middleground.png",
                                "assets/bSprites/Artboard 1meadow-foreground.png",
                                "assets/fSprites/bees/Small-buff-tail-profile.png",
                                "assets/fSprites/bees/Small-honey-bee-profile.png",
                                "assets/fSprites/bees/Small-red-tail-profile.png",
                                "assets/fSprites/backgrounds/background3.fw.png",
                                "assets/fSprites/backgrounds/background2.fw.png",
                                "assets/fSprites/backgrounds/background1.fw.png"];
        PIXI.loader.add(this.assetsTextures).load((loader, resources) => {
            this.loadSprites();            
            this.miscAssetCreation();
            this.containerAssignment();
            this.assetPositioning();
            this.eventChainsDef();
            
            this.app.stage.addChild(this.foreground.getSprite());
            this.app.stage.addChild(this.bSprites.foregroundMeadow.getSprite());
            this.app.ticker.add(delta => this.loop(delta));
        });        
    }


    //Creating new Item objects used in this stage
    loadSprites(){
        this.bSprites.background1 = new Item("assets/bSprites/Artboard 1grass-background.png", true);
        this.bSprites.background2 = new Item("assets/bSprites/Artboard 1grass-middleground.png", true);
        this.bSprites.background3 = new Item("assets/bSprites/Artboard 1grass-foreground.png", true);
        this.bSprites.foregroundMeadow = new Item("assets/bSprites/Artboard 1meadow-foreground.png", true);
        //------------------//
        this.fSprites.background3 = new Item("assets/fSprites/backgrounds/background3.fw.png", true);
        this.fSprites.background2 = new Item("assets/fSprites/backgrounds/background2.fw.png", true);
        this.fSprites.background1 = new Item("assets/fSprites/backgrounds/background1.fw.png", true);

        this.fSprites.buffBee = new Item("assets/fSprites/bees/Small-buff-tail-profile.png", true);
        this.fSprites.honeyBee = new Item("assets/fSprites/bees/Small-honey-bee-profile.png", true);
        this.fSprites.redBee = new Item("assets/fSprites/bees/Small-red-tail-profile.png", true);
    }

    //Creating any Misc assets here
    miscAssetCreation(){
        let backColour = new PIXI.Graphics()
            .beginFill(0xE8E8E8)
            .drawRect(0, 0, this.bSprites.background1.getSprite().width, window.innerHeight)
            .endFill();
        this.bSprites.backgroundCol = new Item(backColour, false);
    }

    //Assigning all Items to both parent and foreground containers.
    containerAssignment(){
        this.app.stage.addChild(this.bSprites.backgroundCol.getSprite());
        this.app.stage.addChild(this.bSprites.background1.getSprite());
        this.app.stage.addChild(this.bSprites.background2.getSprite());
        this.app.stage.addChild(this.bSprites.background3.getSprite());
        
        this.foreground.addAllSprites(this.fSprites);
    }

    //Positioning and scaling of Items
    assetPositioning(){
        this.fSprites.background3.setSize(1280, 960);
        this.fSprites.background2.setSize(1280, 960);
        this.fSprites.background1.setSize(1280, 960);

        this.fSprites.buffBee.setScale(0.7);
        this.fSprites.buffBee.bringBehind(this.fSprites.background1);
        this.fSprites.buffBee.centerPivot();
        this.fSprites.buffBee.setSpriteDirection('r');
        this.fSprites.buffBee.setLocation(1000, 550);
        this.fSprites.buffBee.setAlpha(0);

        this.fSprites.honeyBee.centerPivot();
        this.fSprites.honeyBee.setScale(0.7);
        this.fSprites.honeyBee.setLocation(300, 100);
        this.fSprites.honeyBee.setAlpha(0);

        this.fSprites.redBee.centerPivot();
        this.fSprites.redBee.setScale(0.7);
        this.fSprites.redBee.setLocation(500, 100);
        this.fSprites.redBee.setAlpha(0);

    }

    //Defining the event chain(s) used in this stage.
    eventChainsDef(){
        //this.eventChainBee1





        /*
        .addRotationEvent(this.fSprites.bee1, 0, 360, 3)
            .addClickEvent(this.fSprites.bee1)
            .addIdle(this.fSprites.bee1)
            .addMovement(this.fSprites.bee1, [500, 200], 3, Movement.sinMvPattern)
            .addIdle(this.fSprites.bee1)
            .addClickEvent(this.fSprites.bee1)
            .addForceLocationEvent(this.fSprites.bee1, [700, 500])
            .addClickEvent(this.fSprites.bee1)
            .addDragEvent(this.fSprites.bee1)
            .addCollisionEvent(this.fSprites.bee1, this.fSprites.square)
            .addForceLocationEvent(this.fSprites.bee1, [400, 300])
            .addMovement(this.fSprites.bee1, [100, 100], 1, Movement.quadCurveMvPattern);
        */



        this.eventChainBee1.initialise();
        this.eventChainBee2.initialise();
    }




    //State Loops
    loop(delta){
        this.state(delta);
    }
    

    //STATES
    start(delta){
        this.centerAndScaleSprites(this.bSprites);

        this.foreground.tick();
        this.eventChainBee1.tick();
        this.eventChainBee2.tick();
    }

    main(delta){

    }



    


    
}