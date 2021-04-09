import {Stage} from '/beetrail/stages/stage.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement, Animation} from '/beetrail/movementMisc.js';

export class PollenStage extends Stage{
    entryEventChain;
    eventChain;
    speechEventChain;
    exitEventChain;
    textures;

    constructor(app, stageManager){
        super(app, stageManager);
        
        this.states = [this.entry, this.main, this.exit];
        this.state = this.entry;
        
        this.entryEventChain = new EventChain();
        this.eventChain = new EventChain();
        this.speechEventChain = new EventChain();
        this.exitEventChain = new EventChain();
    }

    getTextures(){
        this.textures = [
            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
        
            "assets/fSprites/bees/Small-buff-tail-profile.png",
            "assets/fSprites/bees/Small-buff-tail-facing.png",
            "assets/fSprites/bees/Small-honey-bee-profile.png",
            "assets/fSprites/bees/Small-honey-bee-facing.png",
            "assets/fSprites/bees/Small-red-tail-profile.png",
            "assets/fSprites/bees/Small-redtail-facing.png",

            "assets/fSprites/objects/elie-standing-NEW.png",
            "assets/fSprites/objects/elie-waving-NEW.png",
            "assets/fSprites/objects/net-yellow.png",
            "assets/fSprites/objects/Artboard 4net-overlay.png",
            "assets/fSprites/objects/pollen.png",
        
            "assets/fSprites/objects/bench.png",
            "assets/fSprites/objects/laptop.png",
            "assets/fSprites/objects/minion-cable.png",
            "assets/fSprites/objects/outer-tube.png",

            "assets/fSprites/objects/redtail-tube.png",
            "assets/fSprites/objects/redtail-pollen-tube.png",
            "assets/fSprites/objects/honeybee-tube.png",
            "assets/fSprites/objects/honeybee-pollen-tube.png",
            "assets/fSprites/objects/bufftail-tube.png",
            "assets/fSprites/objects/bufftail-pollen-tube.png",


        
            "assets/fSprites/buttons/meadowNav.fw.png",
            "assets/fSprites/buttons/meadowNav_L.fw.png",
            "assets/fSprites/buttons/minIONNav.fw.png",
            "assets/fSprites/buttons/minIONNav_L.fw.png",
            "assets/fSprites/buttons/pollenNav.fw.png",
            "assets/fSprites/buttons/pollenNav_L.fw.png",

            "assets/fSprites/objects/bluebell-pollen-magnify.png",
            "assets/fSprites/objects/poppy-pollen-magnify.png",

            "assets/fSprites/speech-bubbles/speech-bubble-tube-top.png",
            "assets/fSprites/speech-bubbles/pollen/1-barney-tube-speech.png",
            "assets/fSprites/speech-bubbles/pollen/2-barney-tube-speech.png",

            
            "assets/fSprites/speech-bubbles/pollen/1-billie-speech-bubble-pollen.png",
            "assets/fSprites/speech-bubbles/pollen/2-billie-speech-bubble-pollen.png",
            "assets/fSprites/speech-bubbles/pollen/1-bella-speech-bubble-pollen.png",
            "assets/fSprites/speech-bubbles/pollen/2-bella-speech-bubble-pollen.png",

            "assets/fSprites/speech-bubbles/pollen/1-elie-speech-bubble-pollen.png",
            "assets/fSprites/speech-bubbles/pollen/2-elie-speech-bubble-pollen.png",
            "assets/fSprites/speech-bubbles/pollen/3-elie-speech-bubble-pollen.png",
            "assets/fSprites/speech-bubbles/pollen/1-elie-speech-bubble-pollen-barney.png",
            "assets/fSprites/speech-bubbles/pollen/2-elie-speech-bubble-pollen-bella.png",
            "assets/fSprites/speech-bubbles/pollen/3-elie-speech-bubble-pollen-billie.png",

            "assets/fSprites/buttons/click-anywhere.png",
            "assets/fSprites/buttons/drag-the-bee.png"
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

    loadSprites(resources){
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png", resources);
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png", resources);
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png", resources);
        this.fSprites.foregroundPlants = new SpriteItem("assets/fSprites/backgrounds/foreground.fw.png", resources);

        this.fSprites.bench = new SpriteItem("assets/fSprites/objects/bench.png", resources);
        this.fSprites.pollen1 = new SpriteItem("assets/fSprites/objects/pollen.png", resources);
        this.fSprites.pollen2 = new SpriteItem("assets/fSprites/objects/pollen.png", resources);

        this.fSprites.honeyTube = new AnimatedItem([
            "assets/fSprites/objects/honeybee-tube.png",
            "assets/fSprites/objects/honeybee-pollen-tube.png"
        ],resources);
        this.fSprites.buffTube = new AnimatedItem([
            "assets/fSprites/objects/bufftail-tube.png",
            "assets/fSprites/objects/bufftail-pollen-tube.png"
        ], resources);
        this.fSprites.redTube = new AnimatedItem([
            "assets/fSprites/objects/redtail-tube.png",
            "assets/fSprites/objects/redtail-pollen-tube.png"
        ], resources);
        
        this.fSprites.bluebellMag = new SpriteItem("assets/fSprites/objects/bluebell-pollen-magnify.png", resources);
        this.fSprites.poppyMag = new SpriteItem("assets/fSprites/objects/poppy-pollen-magnify.png", resources);

        this.fSprites.net = new SpriteItem("assets/fSprites/objects/net-yellow.png", resources);

        this.fSprites.honeyBee = new AnimatedItem([
            "assets/fSprites/bees/Small-honey-bee-profile.png",
            "assets/fSprites/bees/Small-honey-bee-facing.png"
        ], resources);
        this.fSprites.buffBee = new AnimatedItem([
            "assets/fSprites/bees/Small-buff-tail-profile.png",
            "assets/fSprites/bees/Small-buff-tail-facing.png"
        ], resources);
        this.fSprites.redBee = new AnimatedItem([
            "assets/fSprites/bees/Small-red-tail-profile.png",
            "assets/fSprites/bees/Small-redtail-facing.png"
        ], resources);

        this.fSprites.ElieSpeech1 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/1-elie-speech-bubble-pollen.png", resources);
        this.fSprites.ElieSpeech2 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/2-elie-speech-bubble-pollen.png", resources);
        this.fSprites.ElieSpeech3 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/3-elie-speech-bubble-pollen.png", resources);
        this.fSprites.ElieSpeech4 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/1-elie-speech-bubble-pollen-barney.png", resources);
        this.fSprites.ElieSpeech5 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/2-elie-speech-bubble-pollen-bella.png", resources);
        this.fSprites.ElieSpeech6 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/3-elie-speech-bubble-pollen-billie.png", resources);


        this.fSprites.honeySpeech1 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/1-barney-tube-speech.png", resources);
        this.fSprites.honeySpeech2 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/2-barney-tube-speech.png", resources);
        this.fSprites.redSpeech1 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/1-billie-speech-bubble-pollen.png", resources);
        this.fSprites.redSpeech2 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/2-billie-speech-bubble-pollen.png", resources);
        this.fSprites.buffSpeech1 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/1-bella-speech-bubble-pollen.png", resources);
        this.fSprites.buffSpeech2 = new SpriteItem("assets/fSprites/speech-bubbles/pollen/2-bella-speech-bubble-pollen.png", resources);


        this.fSprites.netFront = new SpriteItem("assets/fSprites/objects/Artboard 4net-overlay.png", resources);
        this.fSprites.Elie = new AnimatedItem([
            "assets/fSprites/objects/elie-standing-NEW.png", 
            "assets/fSprites/objects/elie-waving-NEW.png",
        ], resources);

        this.fSprites.clickNotice = new SpriteItem("assets/fSprites/buttons/click-anywhere.png", resources);
        this.fSprites.dragNotice = new SpriteItem("assets/fSprites/buttons/drag-the-bee.png", resources);

        this.miscAssetCreation();
    }

    miscAssetCreation(){
        let tubeEntranceBox = new PIXI.Graphics()
            .lineStyle(4, 0xFF3300, 0)
            .drawRect(0, 0, 150, 160);
        this.fSprites.tubeEntranceBox = new ShapeItem(tubeEntranceBox, false);
    }

    assetPositioning(){
        this.fSprites.background3.setSize(1280, 960);
        this.fSprites.background2.setSize(1280, 960);
        this.fSprites.background1.setSize(1280, 960);
        this.fSprites.foregroundPlants.setSize(1280, 960);
        
        this.fSprites.bench.setScale(1280/2639);
        this.fSprites.bench.setLocation(0, 686);

        
        this.fSprites.honeyBee.setScale(0.5);
        this.fSprites.honeyBee.setLocation(130, 650);
        this.fSprites.honeyBee.setSpriteDirection('r');
        this.fSprites.honeyBee.setSpriteAnchor(0.5, 0.5);
        this.fSprites.honeyBee.setAlpha(0);

        this.fSprites.buffBee.setScale(0.5);
        this.fSprites.buffBee.setLocation(100, 650);
        this.fSprites.buffBee.setSpriteDirection('r');
        this.fSprites.buffBee.setSpriteAnchor(0.5, 0.5);
        this.fSprites.buffBee.setAlpha(0);

        this.fSprites.redBee.setScale(0.5);
        this.fSprites.redBee.setLocation(100, 650);
        this.fSprites.redBee.setSpriteDirection('r');
        this.fSprites.redBee.setSpriteAnchor(0.5, 0.5);
        this.fSprites.redBee.setAlpha(0);

        
        this.fSprites.honeyTube.setScale(0.4);
        this.fSprites.honeyTube.setPivot(0.5, 0.5);
        this.fSprites.honeyTube.setLocation(730, 380);
        this.fSprites.honeyTube.setAlpha(0);

        this.fSprites.buffTube.setScale(0.4);
        this.fSprites.buffTube.setPivot(0.5, 0.5);
        this.fSprites.buffTube.setLocation(730, 380);
        this.fSprites.buffTube.setAlpha(0);

        this.fSprites.redTube.setScale(0.4);
        this.fSprites.redTube.setPivot(0.5, 0.5);
        this.fSprites.redTube.setLocation(730, 380);
        this.fSprites.redTube.setAlpha(0);        

        this.fSprites.tubeEntranceBox.bringBefore(this.fSprites.honeyTube);
        this.fSprites.tubeEntranceBox.setLocation(450, 300);

        this.fSprites.net.setRotation(290);
        this.fSprites.net.setLocation(0, 800);
        this.fSprites.netFront.setRotation(290);
        this.fSprites.netFront.setLocation(0, 800);

        this.fSprites.honeySpeech1.setScale(0.8);
        this.fSprites.honeySpeech1.setLocation(500, 110);
        this.fSprites.honeySpeech1.setAlpha(0);
        this.fSprites.honeySpeech2.setScale(0.8);
        this.fSprites.honeySpeech2.setAlpha(0);
        this.fSprites.honeySpeech2.setLocation(500, 450);

        this.fSprites.buffSpeech1.setScale(0.8);
        this.fSprites.buffSpeech1.setLocation(500, 110);
        this.fSprites.buffSpeech1.setAlpha(0);
        this.fSprites.buffSpeech2.setScale(0.8);
        this.fSprites.buffSpeech2.setLocation(500, 450);
        this.fSprites.buffSpeech2.setAlpha(0);

        this.fSprites.redSpeech1.setScale(0.8);
        this.fSprites.redSpeech1.setAlpha(0);
        this.fSprites.redSpeech1.setLocation(500, 110)
        this.fSprites.redSpeech2.setScale(0.8);
        this.fSprites.redSpeech2.setAlpha(0);
        this.fSprites.redSpeech2.setLocation(500, 450);

        this.fSprites.ElieSpeech1.setScale(0.8);
        this.fSprites.ElieSpeech1.setLocation(400, 50);
        this.fSprites.ElieSpeech1.setAlpha(1);
        this.fSprites.ElieSpeech2.setScale(0.8);
        this.fSprites.ElieSpeech2.setLocation(400, 60);
        this.fSprites.ElieSpeech2.setAlpha(0);
        this.fSprites.ElieSpeech3.setScale(0.8);
        this.fSprites.ElieSpeech3.setLocation(470, 50);
        this.fSprites.ElieSpeech3.setAlpha(0);

        this.fSprites.ElieSpeech4.setScale(0.8);
        this.fSprites.ElieSpeech4.setLocation(50, 100);
        this.fSprites.ElieSpeech4.setAlpha(0);
        this.fSprites.ElieSpeech5.setScale(0.8);
        this.fSprites.ElieSpeech5.setLocation(50, 100);
        this.fSprites.ElieSpeech5.setAlpha(0);
        this.fSprites.ElieSpeech6.setScale(0.8);
        this.fSprites.ElieSpeech6.setLocation(50, 100);
        this.fSprites.ElieSpeech6.setAlpha(0);



        this.fSprites.Elie.setScale(0.5);
        this.fSprites.Elie.setLocation(900, 353);
        this.fSprites.Elie.gotoFrame(1);

        this.fSprites.clickNotice.setScale(0.8);
        this.fSprites.clickNotice.setLocation(350, 750);
        this.fSprites.clickNotice.setAlpha(1);
        this.fSprites.clickNotice.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.clickNotice.setAnimationFlag(true);

        this.fSprites.dragNotice.setScale(0.8);
        this.fSprites.dragNotice.setLocation(400, 750);
        this.fSprites.dragNotice.setAlpha(0);
        this.fSprites.dragNotice.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.dragNotice.setAnimationFlag(false);

        this.fSprites.bluebellMag.setScale(0.8);
        this.fSprites.bluebellMag.setLocation(700, 250);
        this.fSprites.bluebellMag.setAlpha(0);
        this.fSprites.poppyMag.setScale(0.8);
        this.fSprites.poppyMag.setLocation(700, 250);
        this.fSprites.poppyMag.setAlpha(0);

        this.fSprites.pollen1.setLocation(500, 330);
        this.fSprites.pollen1.setAlpha(0);

        this.fSprites.pollen2.setLocation(750, 330);
        this.fSprites.pollen2.setAlpha(0);

        this.foreground.setAlpha(0);
    }














    eventChainsDef(){
        this.eventChain
            //Elie!
            .addClickEvent(this.foreground)
            .next()
            .addFrameEvent(this.fSprites.Elie, 0)
            .addClickEvent(this.foreground)
            .addFade(this.fSprites.ElieSpeech1, -3, 0, 1)
            .addFade(this.fSprites.ElieSpeech2, 3, 0, 1)
            .next()
            .addFade(this.fSprites.ElieSpeech2, -3, 0, 1)
            .addFade(this.fSprites.ElieSpeech3, 3, 0, 1)
            .addClickEvent(this.foreground)            
            .next()
            .addFade(this.fSprites.ElieSpeech3, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.honeyTube, 3, 0, 1)
            .next()

            //Bee 1
            .addMovement(this.fSprites.honeyBee, [130, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.honeyBee, 1, 0, 1)
            .next()

            .addIdle(this.fSprites.honeyBee)
            .addFade(this.fSprites.dragNotice, 3, 0, 1)
            .next()

            .addIdle(this.fSprites.honeyBee)
            .addCollisionEvent(this.fSprites.honeyBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.honeyBee)
            .next()

            .addForceLocationEvent(this.fSprites.honeyBee, [420, 370])
            .addBringBehind(this.fSprites.honeyBee, this.fSprites.honeyTube)
            .next()

            .addFade(this.fSprites.dragNotice, -3, 0, 1)
            .addMovement(this.fSprites.honeyBee, [900, 370], 1, Movement.sinMvPattern)
            .next()

            .addClickEvent(this.foreground)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addIdle(this.fSprites.honeyBee)
            .addFrameEvent(this.fSprites.honeyBee, 1)
            .next()

            .addFrameEvent(this.fSprites.honeyBee, 0)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.honeySpeech1, -3, 0, 1)
            .addFade(this.fSprites.honeySpeech2, -3, 0, 1)
            .addMovement(this.fSprites.honeyBee, [400, 370], 4, Movement.straightMvPattern)
            .next()

            .addMovement(this.fSprites.honeyBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addFade(this.fSprites.honeyBee, -1, 0, 1)
            .next()

            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFade(this.fSprites.bluebellMag, 3, 0, 1)
            .addForceLocationEvent(this.fSprites.Elie, [100, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()

            .addFade(this.fSprites.ElieSpeech4, 3, 0, 1)
            .addClickEvent(this.foreground)
            .next()

            .addFade(this.fSprites.ElieSpeech4, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.bluebellMag, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .next()

            .addFade(this.fSprites.pollen1, -10, 0, 1)
            .addFade(this.fSprites.pollen2, -10, 0, 1)
            .addFrameEvent(this.fSprites.honeyTube, 1)
            .addRotationEvent(this.fSprites.honeyTube, 180, 270, 1)
            .addScaleEvent(this.fSprites.honeyTube, -0.6, 0.15, 1)
            .addMovement(this.fSprites.honeyTube, [900, 700], 4, Movement.quadCurveMvPattern, 50)
            .next()

        this.speechEventChain
            .addEventChainWait(this.foreground, this.eventChain, 8)
            .next()
            .addSleep(this.foreground, 70)
            .next()
            .addFade(this.fSprites.honeySpeech1, 3, 0, 1)
            .addFade(this.fSprites.pollen1, 1, 0, 1)
            .addSleep(this.foreground, 400)
            .next()
            .addFade(this.fSprites.pollen2, 1, 0, 1)
            .addFade(this.fSprites.honeySpeech2, 3, 0, 1)
            .next();


            //Bee 2
        this.eventChain
            .addFade(this.fSprites.buffTube, 3, 0, 1)
            .addMovement(this.fSprites.buffBee, [130, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.buffBee, 1, 0, 1)
            .next()

            .addIdle(this.fSprites.buffBee)
            .addFade(this.fSprites.dragNotice, 3, 0, 1)
            .next()

            .addIdle(this.fSprites.buffBee)
            .addCollisionEvent(this.fSprites.buffBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.buffBee)
            .next()

            .addForceLocationEvent(this.fSprites.buffBee, [360, 370])
            .addBringBehind(this.fSprites.buffBee, this.fSprites.buffTube)
            .next()

            .addFade(this.fSprites.dragNotice, -3, 0, 1)
            .addMovement(this.fSprites.buffBee, [900, 370], 1, Movement.sinMvPattern)
            .next()

            .addClickEvent(this.foreground)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addIdle(this.fSprites.buffBee)
            .addFrameEvent(this.fSprites.buffBee, 1)
            .next()

            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.buffSpeech1, -3, 0, 1)
            .addFade(this.fSprites.buffSpeech2, -3, 0, 1)
            .addFrameEvent(this.fSprites.buffBee, 0)
            .addMovement(this.fSprites.buffBee, [400, 370], 4, Movement.straightMvPattern)
            .next()

            .addMovement(this.fSprites.buffBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addFade(this.fSprites.buffBee, -1, 0, 1)
            .next()

            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFade(this.fSprites.poppyMag, 3, 0, 1)
            .addForceLocationEvent(this.fSprites.Elie, [100, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()

            .addFade(this.fSprites.ElieSpeech5, 3, 0, 1)
            .addClickEvent(this.foreground)
            .next()

            .addFade(this.fSprites.ElieSpeech5, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.poppyMag, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .next()

            .addFade(this.fSprites.pollen1, -10, 0, 1)
            .addFade(this.fSprites.pollen2, -10, 0, 1)
            .addFrameEvent(this.fSprites.buffTube, 1)
            .addRotationEvent(this.fSprites.buffTube, 180, 270, 0.85)
            .addScaleEvent(this.fSprites.buffTube, -0.5, 0.15, 1)
            .addMovement(this.fSprites.buffTube, [1000, 700], 4, Movement.quadCurveMvPattern, 50)
            .next();

        this.speechEventChain
            .addEventChainWait(this.foreground, this.eventChain, 19)
            .next()
            .addSleep(this.foreground, 90)
            .next()
            .addFade(this.fSprites.buffSpeech1, 3, -1, 1)
            .addFade(this.fSprites.pollen1, 1, -1, 1)
            .addSleep(this.foreground, 400)
            .next()
            .addFade(this.fSprites.pollen2, 1, -1, 1)
            .addFade(this.fSprites.buffSpeech2, 3, 0, 1)
            .next();

        //Bee 3
        this.eventChain
            .addFade(this.fSprites.redTube, 3, 0, 1)
            .addMovement(this.fSprites.redBee, [130, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.redBee, 1, 0, 1)
            .next()

            .addIdle(this.fSprites.redBee)
            .addFade(this.fSprites.dragNotice, 3, 0, 1)
            .next()

            .addIdle(this.fSprites.redBee)
            .addCollisionEvent(this.fSprites.redBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.redBee)
            .next()

            .addForceLocationEvent(this.fSprites.redBee, [360, 370])
            .addBringBehind(this.fSprites.redBee, this.fSprites.redTube)
            .next()

            .addFade(this.fSprites.dragNotice, -3, 0, 1)
            .addMovement(this.fSprites.redBee, [900, 370], 1, Movement.sinMvPattern)
            .next()

            .addClickEvent(this.foreground)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addIdle(this.fSprites.redBee)
            .addFrameEvent(this.fSprites.redBee, 1)
            .next()

            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFrameEvent(this.fSprites.redBee, 0)
            .addFade(this.fSprites.redSpeech1, -3, 0, 1)
            .addFade(this.fSprites.redSpeech2, -3, 0, 1)
            .addMovement(this.fSprites.redBee, [400, 370], 4, Movement.straightMvPattern)
            .next()

            .addMovement(this.fSprites.redBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addFade(this.fSprites.redBee, -1, 0, 1)
            .next()

            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            //.addFade(this.fSprites.bluebellMag, 3, 0, 1)
            .addForceLocationEvent(this.fSprites.Elie, [100, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()

            .addFade(this.fSprites.ElieSpeech6, 3, 0, 1)
            .addFade(this.fSprites.pollen1, -10, 0, 1)
            .addFade(this.fSprites.pollen2, -10, 0, 1)
            .addFrameEvent(this.fSprites.redTube, 1)
            .addRotationEvent(this.fSprites.redTube, 180, 270, 0.75)
            .addScaleEvent(this.fSprites.redTube, -0.3, 0.15, 1)
            .addMovement(this.fSprites.redTube, [1100, 700], 4, Movement.quadCurveMvPattern, 50)
            .addClickEvent(this.foreground)
            .next()

            .addFade(this.fSprites.ElieSpeech6, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            //.addFade(this.fSprites.bluebellMag, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .next()
            .addChangeStateEvent(this.foreground, this, 2);


        this.speechEventChain
            .addEventChainWait(this.foreground, this.eventChain, 31)
            .next()
            .addSleep(this.foreground, 80)
            .next()
            .addFade(this.fSprites.redSpeech1, 3, -1, 1)
            .addFade(this.fSprites.pollen1, 1, -1, 1)
            .addSleep(this.foreground, 400)
            .next()
            .addFade(this.fSprites.pollen2, 1, -1, 1)
            .addFade(this.fSprites.redSpeech2, 3, 0, 1)
            .next();

        //end
        /*
        this.eventChain
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.clickNotice, true)
            .addClickEvent(this.foreground)
            .next()
            .addChangeStateEvent(this.foreground, this, 2);*/
        this.eventChain.initialise();

        this.entryEventChain
            .addFade(this.foreground, 3, 0, 1)
            .next()
            .addChangeStateEvent(this.foreground, this, 1);
        this.entryEventChain.initialise();

        this.exitEventChain
            .addFade(this.foreground, -3, 0, 1.1)
            .next()
            .addChangeStageEvent(this.foreground, this, "hub");
        this.exitEventChain.initialise();

        this.speechEventChain.initialise();
    }

    loop(delta, context){
        context.state(delta);
    }

    entry(delta, context){
        context.entryEventChain.tick();
        context.foreground.tick();
    }

    main(delta, context){
        context.fSprites.clickNotice.tick();
        context.fSprites.dragNotice.tick();
        context.foreground.tick();
        context.eventChain.tick();
        context.speechEventChain.tick();
    }

    exit(delta, context){
        this.foreground.tick();
        this.exitEventChain.tick();
    }
}