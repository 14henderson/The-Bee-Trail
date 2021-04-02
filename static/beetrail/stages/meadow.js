import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item/item.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement} from '/beetrail/movementMisc.js';



export class MeadowStage extends Stage{
    eventChain;
    textures;

    constructor(app, stageManager){
        super(app, stageManager);

        this.states = [this.start, this.main];
        this.state = this.start;
        
        this.eventChain = new EventChain();
    }

    getTextures(){
        this.textures = [
            "assets/fSprites/bees/Small-buff-tail-profile.png",
            "assets/fSprites/bees/Small-buff-tail-facing.png",
            "assets/fSprites/bees/Small-honey-bee-profile.png",
            "assets/fSprites/bees/Small-honey-bee-facing.png",
            "assets/fSprites/bees/Small-red-tail-profile.png",
            "assets/fSprites/bees/Small-redtail-facing.png",

            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
            "assets/fSprites/backgrounds/foreground.fw.png",
        
            "assets/fSprites/objects/elie-standing.png",
            "assets/fSprites/objects/elie-waving.png",
            "assets/fSprites/objects/elie-waving-jeans.png",
            "assets/fSprites/objects/net-yellow.png",

            "assets/fSprites/speech-bubbles/1-billie-speech-bubble.png",
            "assets/fSprites/speech-bubbles/2-billie-speech-bubble.png",
            "assets/fSprites/speech-bubbles/barney-speech-bubble.png",
            "assets/fSprites/speech-bubbles/bella-speech-bubble.png",
            "assets/fSprites/speech-bubbles/elie-speech-bubble.png",
            "assets/fSprites/speech-bubbles/elie-speech-bubble-2.png"
        ];
        return this.textures;
    }

    createAssets(resources){
        this.loadSprites(resources);
        this.foreground.addAllSprites(this.fSprites);
    }

    stop(){
        this.eventChain.resetChain();
        this.eventChain.eventNumber = 0;
    }


    //Creating new Item objects used in this stage
    loadSprites(resources){
        //this.bSprites.foregroundMeadow = new SpriteItem("assets/bSprites/Artboard 1meadow-foreground.png", this.loader);
        //------------------//
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png", resources);
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png", resources);
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png", resources);
        this.fSprites.foregroundPlants = new SpriteItem("assets/fSprites/backgrounds/foreground.fw.png", resources);



        this.fSprites.honeyBee = new AnimatedItem([
            "assets/fSprites/bees/Small-honey-bee-profile.png",
            "assets/fSprites/bees/Small-honey-bee-facing.png"
        ], resources);
        this.fSprites.honeySpeech = new SpriteItem("assets/fSprites/speech-bubbles/barney-speech-bubble.png", resources);

        this.fSprites.buffBee = new AnimatedItem([
            "assets/fSprites/bees/Small-buff-tail-profile.png",
            "assets/fSprites/bees/Small-buff-tail-facing.png"
        ], resources);
        this.fSprites.buffSpeech = new SpriteItem("assets/fSprites/speech-bubbles/bella-speech-bubble.png", resources);
        this.fSprites.redBee = new AnimatedItem([
            "assets/fSprites/bees/Small-red-tail-profile.png",
            "assets/fSprites/bees/Small-redtail-facing.png"
        ], resources);
        this.fSprites.redSpeech1 = new SpriteItem("assets/fSprites/speech-bubbles/1-billie-speech-bubble.png", resources);
        this.fSprites.redSpeech2 = new SpriteItem("assets/fSprites/speech-bubbles/2-billie-speech-bubble.png", resources);

        this.fSprites.Elie = new SpriteItem("assets/fSprites/objects/elie-waving-jeans.png", resources);
         //   [
        //    "assets/fSprites/objects/elie-standing.png",
        //    "assets/fSprites/objects/elie-waving.png"
    // ], resources);
        this.fSprites.ElieSpeech1 = new SpriteItem("assets/fSprites/speech-bubbles/elie-speech-bubble.png", resources);
        this.fSprites.ElieSpeech2 = new SpriteItem("assets/fSprites/speech-bubbles/elie-speech-bubble-2.png", resources);

        this.fSprites.net1 = new SpriteItem("assets/fSprites/objects/net-yellow.png", resources);
        this.fSprites.net2 = new SpriteItem("assets/fSprites/objects/net-yellow.png", resources);
        this.fSprites.net3 = new SpriteItem("assets/fSprites/objects/net-yellow.png", resources);
    }


    //Positioning and scaling of Items
    assetPositioning(){
        this.fSprites.background3.setSize(1280, 960);
        this.fSprites.background2.setSize(1280, 960);
        this.fSprites.background1.setSize(1280, 960);
        this.fSprites.foregroundPlants.setSize(1280, 960);

//------------
        this.fSprites.honeyBee.centerPivot();
        this.fSprites.honeyBee.setScale(0.4);
        this.fSprites.honeyBee.setLocation(150, 400);
        this.fSprites.honeyBee.setAlpha(0);
        this.fSprites.honeyBee.setSpriteDirection('r');
        this.fSprites.honeyBee.bringBehind(this.fSprites.background3);
        this.fSprites.honeyBee.gotoFrame(0);

        this.fSprites.honeySpeech.setScale(.8);
        this.fSprites.honeySpeech.setLocation(570, 100);
        this.fSprites.honeySpeech.setAlpha(0);

        this.fSprites.net1.setScale(.8);
        this.fSprites.net1.setLocation(270, 350);
        this.fSprites.net1.setAlpha(0);
        this.fSprites.net1.setPivot(1, 1);

//-------------
        this.fSprites.buffBee.setScale(0.5);
        this.fSprites.buffBee.bringBehind(this.fSprites.background2);
        this.fSprites.buffBee.centerPivot();
        this.fSprites.buffBee.setSpriteDirection('l');
        this.fSprites.buffBee.setLocation(1200, 500);
        this.fSprites.buffBee.setAlpha(0);
        this.fSprites.buffBee.gotoFrame(0);

        this.fSprites.buffSpeech.setScale(0.8);
        this.fSprites.buffSpeech.setLocation(400, 250);
        this.fSprites.buffSpeech.setAlpha(0);

        this.fSprites.net2.setScale(.8);
        this.fSprites.net2.setLocation(820, 670);
        this.fSprites.net2.setAlpha(0);
        this.fSprites.net2.setPivot(1, 1);
//--------------
        this.fSprites.redBee.centerPivot();
        this.fSprites.redBee.setScale(0.4);
        this.fSprites.redBee.setLocation(1200, 420);
        this.fSprites.redBee.setAlpha(0);
        this.fSprites.redBee.bringBehind(this.fSprites.background2);
        this.fSprites.redBee.gotoFrame(0);

        this.fSprites.redSpeech1.setScale(0.8);
        this.fSprites.redSpeech1.setLocation(350, 50);
        this.fSprites.redSpeech1.setAlpha(0);
        this.fSprites.redSpeech2.setScale(0.8);
        this.fSprites.redSpeech2.setLocation(350, 50);
        this.fSprites.redSpeech2.setAlpha(0);

        this.fSprites.net3.setScale(.8);
        this.fSprites.net3.setLocation(820, 500);
        this.fSprites.net3.setAlpha(0);
        this.fSprites.net3.setPivot(1, 1);
//--------------
        this.fSprites.Elie.setScale(0.5);
        this.fSprites.Elie.setLocation(900, 353);

        this.fSprites.ElieSpeech1.setScale(0.8);
        this.fSprites.ElieSpeech1.setLocation(350, 100);
        this.fSprites.ElieSpeech1.setAlpha(0);
        this.fSprites.ElieSpeech2.setScale(0.8);
        this.fSprites.ElieSpeech2.setLocation(450, 200);
        this.fSprites.ElieSpeech2.setAlpha(0);
//---------------
    }

    //Defining the event chain(s) used in this stage.
    eventChainsDef(){
        this.eventChain
            .addFade(this.fSprites.ElieSpeech1, 3, 0, 1)
            .addClickEvent(this.foreground)
            .next()
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.ElieSpeech1, -3, 0, 1)
            .addMovement(this.fSprites.honeyBee, [500, 200], 3, Movement.quadCurveMvPattern, 50)
            .addFade(this.fSprites.honeyBee, 1, 0, 1)
            .next()
            .addIdle(this.fSprites.honeyBee)
            .addClickEvent(this.fSprites.honeyBee)
            .next()
            .addScaleEvent(this.fSprites.honeyBee, 1.5, 0.4, 0.65)
            .addFrameEvent(this.fSprites.honeyBee, 1)
            .addBringBefore(this.fSprites.honeyBee, this.fSprites.background1)
            .addFade(this.fSprites.honeySpeech, 3, 0, 1)
            .next()
            .addIdle(this.fSprites.honeyBee)
            .addClickEvent(this.foreground)
            .next()
            .addFade(this.fSprites.honeySpeech, -3, 0, 1)
            .next()
            .addFade(this.fSprites.net1, 5, 0, 1)
            .addRotationEvent(this.fSprites.net1, 0, 100, 5)
            .addFade(this.fSprites.honeyBee, -3, 0, 1)
            .next()
            // Next Bee!
            .next()
            .addFade(this.fSprites.net1, -3, 0, 1)
            .addMovement(this.fSprites.buffBee, [1150, 400], 3, Movement.quadCurveMvPattern, -25)
            .addFade(this.fSprites.buffBee, 1.5, 0, .5)
            .next()
            .addBringBefore(this.fSprites.buffBee, this.fSprites.background2)
            .addMovement(this.fSprites.buffBee, [1100, 500], 3, Movement.quadCurveMvPattern, -40)
            .addFade(this.fSprites.buffBee, 1.5, 0, 1)
            .next()
            .addMovement(this.fSprites.buffBee, [1050, 600], 3, Movement.quadCurveMvPattern, 10)
            .next()
            .addIdle(this.fSprites.buffBee)
            .addClickEvent(this.fSprites.buffBee)
            .next()
            .addScaleEvent(this.fSprites.buffBee, 1.5, 0.4, 0.85)
            .addFrameEvent(this.fSprites.buffBee, 1)
            .addBringBefore(this.fSprites.buffBee, this.fSprites.background1)
            .addFade(this.fSprites.buffSpeech, 3, 0, 1)
            .next()
            .addIdle(this.fSprites.buffBee)
            .addClickEvent(this.foreground)
            .next()
            .addFade(this.fSprites.buffSpeech, -3, 0, 1)
            .next()
            .addFade(this.fSprites.net2, 5, 0, 1)
            .addRotationEvent(this.fSprites.net2, 0, 100, 5)
            .addFade(this.fSprites.buffBee, -3, 0, 1)

            // Next Bee!
            .next()
            .addFade(this.fSprites.net2, -3, 0, 1)
            .addMovement(this.fSprites.redBee, [1050, 420], 1, Movement.sinMvPattern)
            .addFade(this.fSprites.redBee, 1, 0, 1)
            .next()
            .addIdle(this.fSprites.redBee)
            .addClickEvent(this.fSprites.redBee)
            .next()
            .addScaleEvent(this.fSprites.redBee, 1.5, 0.4, 0.65)
            .addFrameEvent(this.fSprites.redBee, 1)
            .addBringBefore(this.fSprites.redBee, this.fSprites.background1)
            .addFade(this.fSprites.redSpeech1, 3, 0, 1)
            .next()
            .addIdle(this.fSprites.redBee)
            .addClickEvent(this.foreground)
            .next()
            .addFade(this.fSprites.redSpeech1, -3, 0, 1)
            .addFade(this.fSprites.redSpeech2, 3, 0, 1)
            .addIdle(this.fSprites.redBee)
            .next()
            .addClickEvent(this.foreground)
            .addIdle(this.fSprites.redBee)
            .next()
            .addFade(this.fSprites.redSpeech2, -3, 0, 1)
            .next()
            .addFade(this.fSprites.net3, 5, 0, 1)
            .addRotationEvent(this.fSprites.net3, 0, 100, 5)
            .addFade(this.fSprites.redBee, -3, 0, 1)
            .next()
            .addFade(this.fSprites.net3, -3, 0, 1)
            
            //--------
            .next()
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()
            .addFade(this.fSprites.ElieSpeech2, 3, 0, 1)
            .addClickEvent(this.foreground)
            .next()
            .addChangeStageEvent(this.fSprites.ElieSpeech2, this, "hub")
            ;

        this.eventChain.initialise();
    }




    //State Loops
    loop(delta, context){
        context.state(delta, context);
    }
    

    //STATES
    start(delta, context){
        context.foreground.tick();
        context.eventChain.tick();
    }

    main(delta){

    }



    


    
}
