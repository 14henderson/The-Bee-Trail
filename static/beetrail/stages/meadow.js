import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item/item.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';
import { VideoItem } from '/beetrail/item/videoItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement, Animation} from '/beetrail/movementMisc.js';



export class MeadowStage extends Stage{
    entryEventChain;
    eventChain;
    exitEventChain;

    textures;

    constructor(app, stageManager, soundManager){
        super(app, stageManager, soundManager);

        this.states = [this.entry, this.main, this.exit];
        this.state = this.entry;
        
        this.eventChain = new EventChain();
        this.entryEventChain = new EventChain();
        this.exitEventChain = new EventChain();
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
        
            "assets/fSprites/objects/elie-standing-NEW.png", 
            "assets/fSprites/objects/elie-waving-NEW.png",
            "assets/fSprites/objects/net-yellow.png",

            "assets/fSprites/speech-bubbles/1-billie-speech-bubble.png",
            "assets/fSprites/speech-bubbles/2-billie-speech-bubble.png",
            "assets/fSprites/speech-bubbles/barney-speech-bubble.png",
            "assets/fSprites/speech-bubbles/bella-speech-bubble.png",
            "assets/fSprites/speech-bubbles/elie-speech-bubble.png",
            "assets/fSprites/speech-bubbles/elie-speech-bubble-2.png",

            "assets/fSprites/buttons/click-anywhere.png",

            "assets/sound/meadow.wav",
            "assets/sound/048863013-menu-click-casual-mobile-game.wav",
            "assets/sound/043738205-ting-game-sound.wav",
            "assets/sound/077024761-bees.wav",
            "assets/sound/145752541-net-swoosh-02.wav",

            "assets/sound/Elie/meadow/1-hello-Im-elie.mp3",
            "assets/sound/Elie/meadow/2-Well-done.mp3"
        ];
        return this.textures;
    }

    createAssets(resources){
        this.loadSprites(resources);
        this.foreground.addAllSprites(this.fSprites);
    }

    stop(){
        this.state = this.states[0];
        
        this.assetPositioning();
        this.entryEventChain.resetChain();
        this.eventChain.resetChain();
        this.exitEventChain.resetChain();
        
        this.eventChainsDef();
    }


    //Creating new Item objects used in this stage
    loadSprites(resources){
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

        this.fSprites.Elie = new AnimatedItem([
            "assets/fSprites/objects/elie-standing-NEW.png", 
            "assets/fSprites/objects/elie-waving-NEW.png",
        ], resources);

        this.fSprites.ElieSpeech1 = new SpriteItem("assets/fSprites/speech-bubbles/elie-speech-bubble.png", resources);
        this.fSprites.ElieSpeech2 = new SpriteItem("assets/fSprites/speech-bubbles/elie-speech-bubble-2.png", resources);

        this.fSprites.net1 = new SpriteItem("assets/fSprites/objects/net-yellow.png", resources);
        this.fSprites.net2 = new SpriteItem("assets/fSprites/objects/net-yellow.png", resources);
        this.fSprites.net3 = new SpriteItem("assets/fSprites/objects/net-yellow.png", resources);

        this.fSprites.clickNotice = new SpriteItem("assets/fSprites/buttons/click-anywhere.png", resources);

        this.soundManager.add("meadow", "assets/sound/meadow.wav", resources);
        this.soundManager.setVolume("meadow", 0);
        this.soundManager.setLoop("meadow", true);

        this.soundManager.add("speech-click", "assets/sound/048863013-menu-click-casual-mobile-game.wav", resources);
        this.soundManager.setVolume("speech-click", 0.5);

        this.soundManager.add("celeb-ding", "assets/sound/043738205-ting-game-sound.wav", resources);
        this.soundManager.setVolume("celeb-ding", 0.5);

        this.soundManager.add("bee-hum", "assets/sound/077024761-bees.wav", resources);
        this.soundManager.setVolume("bee-hum", 0);
        this.soundManager.setLoop("bee-hum", true);

        this.soundManager.add("swoosh", "assets/sound/145752541-net-swoosh-02.wav", resources);
        this.soundManager.setVolume("swoosh", 0.2);

        this.soundManager.add("elie1", "assets/sound/Elie/meadow/1-hello-Im-elie.mp3", resources);
        this.soundManager.setVolume("elie1", 0.5);

        this.soundManager.add("elie2", "assets/sound/Elie/meadow/2-Well-done.mp3", resources);
        this.soundManager.setVolume("elie2", 0.5);
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
        this.fSprites.honeyBee.setAnimationFunction(Animation.idle, 0.8);
        this.fSprites.honeyBee.setAnimationFlag(false);

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
        this.fSprites.buffBee.setAnimationFunction(Animation.idle, 0.8);
        this.fSprites.buffBee.setAnimationFlag(false);

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
        this.fSprites.redBee.setAnimationFunction(Animation.idle, 0.8);
        this.fSprites.redBee.setAnimationFlag(false);

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
        this.fSprites.Elie.gotoFrame(1);

        this.fSprites.ElieSpeech1.setScale(0.8);
        this.fSprites.ElieSpeech1.setLocation(350, 100);
        this.fSprites.ElieSpeech1.setAlpha(1);
        this.fSprites.ElieSpeech2.setScale(0.8);
        this.fSprites.ElieSpeech2.setLocation(470, 100);
        this.fSprites.ElieSpeech2.setAlpha(0);
//---------------
        this.fSprites.clickNotice.setScale(0.8);
        this.fSprites.clickNotice.setLocation(350, 750);
        this.fSprites.clickNotice.setAlpha(0);

        this.fSprites.clickNotice.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.clickNotice.setAnimationFlag(false);


        this.foreground.setAlpha(0);
    }

    //Defining the event chain(s) used in this stage.
    eventChainsDef(){
        this.eventChain
            .next()
            .addPlaySoundEvent(this.foreground, this.soundManager, "meadow")
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie1")
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.clickNotice, true)
            .addClickEvent(this.foreground)
            .next()
            .addStopSoundEvent(this.foreground, this.soundManager, "elie1")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFrameEvent(this.fSprites.Elie, 0)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.ElieSpeech1, -3, 0, 1)
            .addMovement(this.fSprites.honeyBee, [500, 200], 3, Movement.quadCurveMvPattern, 50)
            .addFade(this.fSprites.honeyBee, 1, 0, 1)
            
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.001, 0, 0.075)
            .addPlaySoundEvent(this.foreground, this.soundManager, "bee-hum")
            .next()
            .setAnimationFlag(this.fSprites.honeyBee, true)
            .addClickEvent(this.fSprites.honeyBee)
            .next()
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.0015, 0, 0.085)
            .addPlaySoundEvent(this.foreground, this.soundManager, "celeb-ding")
            .addScaleEvent(this.fSprites.honeyBee, 1.5, 0.4, 0.65)
            .addFrameEvent(this.fSprites.honeyBee, 1)
            .addBringBefore(this.fSprites.honeyBee, this.fSprites.background1)
            .addFade(this.fSprites.honeySpeech, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.clickNotice, true)
            .addClickEvent(this.foreground)
            .next()
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.honeySpeech, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.honeyBee, false)
            .addPlaySoundEvent(this.foreground, this.soundManager, "swoosh")
            .addFade(this.fSprites.net1, 5, 0, 1)
            .addRotationEvent(this.fSprites.net1, 0, 100, 5)
            .addFade(this.fSprites.honeyBee, -3, 0, 1)
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", -0.0015, 0, 1)

            // Next Bee!
            .next()
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.002, 0, 0.075)
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
            .setAnimationFlag(this.fSprites.buffBee, true)
            .addClickEvent(this.fSprites.buffBee)
            .next()
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.0015, 0, 0.085)
            .addPlaySoundEvent(this.foreground, this.soundManager, "celeb-ding")
            .addScaleEvent(this.fSprites.buffBee, 1.5, 0.4, 0.85)
            .addFrameEvent(this.fSprites.buffBee, 1)
            .addBringBefore(this.fSprites.buffBee, this.fSprites.background1)
            .addFade(this.fSprites.buffSpeech, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.clickNotice, true)
            .addClickEvent(this.foreground)
            .next()
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.buffSpeech, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.buffBee, false)
            .addPlaySoundEvent(this.foreground, this.soundManager, "swoosh")
            .addFade(this.fSprites.net2, 5, 0, 1)
            .addRotationEvent(this.fSprites.net2, 0, 100, 5)
            .addFade(this.fSprites.buffBee, -3, 0, 1)

            // Next Bee!
            .next()
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.001, 0, 0.075)
            .addFade(this.fSprites.net2, -3, 0, 1)
            .addMovement(this.fSprites.redBee, [1050, 420], 1, Movement.sinMvPattern)
            .addFade(this.fSprites.redBee, 1, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.redBee, true)
            .addClickEvent(this.fSprites.redBee)
            .next()
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.0015, 0, 0.085)
            .addPlaySoundEvent(this.foreground, this.soundManager, "celeb-ding")
            .addScaleEvent(this.fSprites.redBee, 1.5, 0.4, 0.65)
            .addFrameEvent(this.fSprites.redBee, 1)
            .addBringBefore(this.fSprites.redBee, this.fSprites.background1)
            .addFade(this.fSprites.redSpeech1, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.clickNotice, true)
            .addClickEvent(this.foreground)
            .next()
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.redSpeech1, -3, 0, 1)
            .addFade(this.fSprites.redSpeech2, 3, 0, 1)
            .addClickEvent(this.foreground)            
            .next()
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.redSpeech2, -3, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.redBee, false)
            .addFade(this.fSprites.net3, 5, 0, 1)
            .addRotationEvent(this.fSprites.net3, 0, 100, 5)
            .addFade(this.fSprites.redBee, -3, 0, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "swoosh")
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", -0.0015, 0, 1)
            .next()
            .addFade(this.fSprites.net3, -3, 0, 1)
            
            //--------
            .next()
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()
            .addFade(this.fSprites.ElieSpeech2, 3, 0, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie2")
            .addClickEvent(this.foreground)
            .next()
            .addStopSoundEvent(this.foreground, this.soundManager, "elie2")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .next()
            .addChangeStateEvent(this.foreground, this, 2);

        this.eventChain.initialise();

        this.entryEventChain
            .addFade(this.foreground, 3, 0, 1)
            .addSoundFade(this.foreground, this.soundManager, "meadow", 0.01, 0, 0.5)
            .addPlaySoundEvent(this.foreground, this.soundManager, "meadow")
            .next()
            .addChangeStateEvent(this.foreground, this, 1);
        this.entryEventChain.initialise();

        this.exitEventChain
            .addFade(this.foreground, -3, 0, 1.1)
            .addSoundFade(this.foreground, this.soundManager, "meadow", -0.01, 0, 0.5)
            .next()
            .addChangeStageEvent(this.fSprites.ElieSpeech2, this, "hub");
        this.exitEventChain.initialise();
    }




    //State Loops
    loop(delta, context){
        context.state(delta, context);
    }
    

    entry(delta, context){
        context.foreground.tick();
        context.entryEventChain.tick();
    }

    //STATES
    main(delta, context){
        this.fSprites.honeyBee.tick();
        this.fSprites.buffBee.tick();
        this.fSprites.redBee.tick();

        context.fSprites.clickNotice.tick();

        context.foreground.tick();
        context.eventChain.tick();
    }

    exit(delta, context){
        context.foreground.tick();
        context.exitEventChain.tick();
    }




    


    
}
