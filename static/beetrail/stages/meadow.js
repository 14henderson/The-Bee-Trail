import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item/item.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement} from '/beetrail/movementMisc.js';



export class MeadowStage extends Stage{
    constructor(app){
        super(app);
        this.setup(app);

        this.states = [this.start, this.main];
        this.state = this.start;
        
        this.eventChain = new EventChain();
    }

    setup(){
        this.assetsTextures = ["assets/bSprites/Artboard 1grass-background.png",
                                "assets/bSprites/Artboard 1grass-foreground.png",
                                "assets/bSprites/Artboard 1grass-middleground.png",
                                "assets/bSprites/Artboard 1meadow-foreground.png",
                                "assets/fSprites/bees/Small-buff-tail-profile.png",
                                "assets/fSprites/bees/Small-buff-tail-facing.png",
                                "assets/fSprites/bees/Small-honey-bee-profile.png",
                                "assets/fSprites/bees/Small-honey-bee-facing.png",
                                "assets/fSprites/bees/Small-red-tail-profile.png",
                                "assets/fSprites/bees/Small-redtail-facing.png",
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
        this.bSprites.background1 = new SpriteItem("assets/bSprites/Artboard 1grass-background.png");
        this.bSprites.background2 = new SpriteItem("assets/bSprites/Artboard 1grass-middleground.png");
        this.bSprites.background3 = new SpriteItem("assets/bSprites/Artboard 1grass-foreground.png");
        this.bSprites.foregroundMeadow = new SpriteItem("assets/bSprites/Artboard 1meadow-foreground.png");
        //------------------//
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png");
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png");
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png");

        this.fSprites.buffBee = new AnimatedItem([
            "assets/fSprites/bees/Small-buff-tail-profile.png",
            "assets/fSprites/bees/Small-buff-tail-facing.png"
        ]);
        this.fSprites.honeyBee = new AnimatedItem([
            "assets/fSprites/bees/Small-honey-bee-profile.png",
            "assets/fSprites/bees/Small-honey-bee-facing.png"
        ]);
        this.fSprites.redBee = new AnimatedItem([
            "assets/fSprites/bees/Small-red-tail-profile.png",
            "assets/fSprites/bees/Small-redtail-facing.png"
        ]);
    }

    //Creating any Misc assets here
    miscAssetCreation(){
        let backColour = new PIXI.Graphics()
            .beginFill(0xE8E8E8)
            .drawRect(0, 0, this.bSprites.background1.getSprite().width, window.innerHeight)
            .endFill();
        this.bSprites.backgroundCol = new ShapeItem(backColour, false);
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



        this.fSprites.buffBee.setScale(0.5);
        this.fSprites.buffBee.bringBehind(this.fSprites.background2);
        this.fSprites.buffBee.centerPivot();
        this.fSprites.buffBee.setSpriteDirection('l');
        this.fSprites.buffBee.setLocation(1200, 500);
        this.fSprites.buffBee.setAlpha(0);

        this.fSprites.honeyBee.centerPivot();
        this.fSprites.honeyBee.setScale(0.5);
        this.fSprites.honeyBee.setLocation(1200, 420);
        this.fSprites.honeyBee.setAlpha(0);
        this.fSprites.honeyBee.bringBehind(this.fSprites.background2);

        this.fSprites.redBee.centerPivot();
        this.fSprites.redBee.setScale(0.4);
        this.fSprites.redBee.setLocation(150, 400);
        this.fSprites.redBee.setAlpha(0);
        this.fSprites.redBee.setSpriteDirection('r');
        this.fSprites.redBee.bringBehind(this.fSprites.background3);


    }

    //Defining the event chain(s) used in this stage.
    eventChainsDef(){

        //this.eventChainBee1

        this.eventChain
            .addMovement(this.fSprites.redBee, [500, 200], 3, Movement.quadCurveMvPattern, 50)
            .addFade(this.fSprites.redBee, 1, 0, 1)
            .next()
            .addIdle(this.fSprites.redBee)
            .addClickEvent(this.fSprites.redBee)
            .next()
            .addScaleEvent(this.fSprites.redBee, 1.5, 0.4, 0.8)
            .addFrameEvent(this.fSprites.redBee, 1)
            .addBringBefore(this.fSprites.redBee, this.fSprites.background1)
            .next()
            .addIdle(this.fSprites.redBee)
            .addClickEvent(this.fSprites.redBee)
            //redBee Found!
            .next()
            .addMovement(this.fSprites.buffBee, [1150, 400], 3, Movement.quadCurveMvPattern, -25)
            .addFade(this.fSprites.buffBee, 1.5, 0, .5)
            .next()
            .addBringBehind(this.fSprites.buffBee, this.fSprites.background1)
            .addMovement(this.fSprites.buffBee, [1100, 500], 3, Movement.quadCurveMvPattern, -40)
            .addFade(this.fSprites.buffBee, 1.5, 0, 1)
            .next()
            .addMovement(this.fSprites.buffBee, [1050, 600], 3, Movement.quadCurveMvPattern, 10)
            .next()
            .addIdle(this.fSprites.buffBee)
            .addClickEvent(this.fSprites.buffBee)
            .next()
            .addMovement(this.fSprites.honeyBee, [1050, 420], 1, Movement.sinMvPattern)
            .addFade(this.fSprites.honeyBee, 1, 0, 1)
            .next()
            .addIdle(this.fSprites.honeyBee)
            .addClickEvent(this.fSprites.honeyBee);



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



        this.eventChain.initialise();
    }




    //State Loops
    loop(delta){
        this.state(delta);
    }
    

    //STATES
    start(delta){
        this.centerAndScaleSprites(this.bSprites);

        this.foreground.tick();
        this.eventChain.tick();
    }

    main(delta){

    }



    


    
}