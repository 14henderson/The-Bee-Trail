import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item.js';
import {EventChain} from '/beetrail/eventChain.js';
import {Movement} from '/beetrail/movementMisc.js';


export class MeadowStage extends Stage{
    constructor(app){
        super(app);
        this.setup(app);

        this.states = [this.start, this.main, this.end];
        this.state = this.start;
        
        this.eventChain = new EventChain();
    }

    setup(){
        this.assetsTextures = ["assets/Artboard 1grass-background.png",
                                "assets/Artboard 1grass-foreground.png",
                                "assets/Artboard 1grass-middleground.png",
                                "assets/Artboard 1meadow-foreground.png",
                                "assets/Artboard 1honeyb-profile-left.png",
                                "assets/Artboard 1honey-bee-small.png",
                                "assets/square.png"];
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
        this.bSprites.background1 = new Item("assets/Artboard 1grass-background.png", true);
        this.bSprites.background2 = new Item("assets/Artboard 1grass-middleground.png", true);
        this.bSprites.background3 = new Item("assets/Artboard 1grass-foreground.png", true);
        this.bSprites.foregroundMeadow = new Item("assets/Artboard 1meadow-foreground.png", true);
        this.fSprites.bee1 = new Item("assets/Artboard 1honey-bee-small.png", true);
        this.fSprites.bee2 = new Item("assets/Artboard 1honey-bee-small.png", true);
        this.fSprites.square = new Item("assets/square.png", true);
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
        this.fSprites.bee1.setScale(0.8);
        this.fSprites.bee1.setSpriteAnchor(0.5, 0);
        this.fSprites.bee1.setSpriteDirection('r');
        this.fSprites.bee2.setScale(0.8);
        this.fSprites.bee1.setLocation(200, 100);
        this.fSprites.bee2.setLocation(300, 100);
        this.fSprites.square.setLocation(300, 100);
    }

    //Defining the event chain(s) used in this stage.
    eventChainsDef(){
        this.eventChain
            .addClickEvent(this.fSprites.bee1)
            .addIdle(this.fSprites.bee1)
            .next()
            .addMovement(this.fSprites.bee1, [500, 200], 3, Movement.sinMvPattern)
            .next()
            .addIdle(this.fSprites.bee1)
            .addClickEvent(this.fSprites.bee1)
            .next()
            .addForceLocationEvent(this.fSprites.bee1, [700, 500])
            .next()
            .addClickEvent(this.fSprites.bee1)
            .next()
            .addDragEvent(this.fSprites.bee1)
            .addIdle(this.fSprites.bee1)
            .addSleep(this.fSprites.bee1, 500)
            .next()
            .addMovement(this.fSprites.bee1, [100, 0], 1, Movement.quadCurveMvPattern);
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

    end(delta){

    }


    


    
}