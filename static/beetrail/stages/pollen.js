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

    constructor(app, stageManager, soundManager){
        super(app, stageManager, soundManager);
        
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
            "assets/fSprites/objects/pollen-tube-blackberry.png",
            "assets/fSprites/objects/pollen-tube-bluebell.png",
            "assets/fSprites/objects/pollen-tube-poppy.png",
        
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

            "assets/fSprites/objects/bluebell-pollen-magnify.png",
            "assets/fSprites/objects/poppy-pollen-magnify.png",
            "assets/fSprites/objects/blackberry-pollen-magnify.png",

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
            "assets/fSprites/buttons/drag-the-bee.png",

            "assets/sound/meadow.wav",
            "assets/sound/048863013-menu-click-casual-mobile-game.wav",
            "assets/sound/043738205-ting-game-sound.wav",
            "assets/sound/077024761-bees.wav",

            "assets/sound/Elie/Pollen/3-Now-we-have.wav",
            "assets/sound/Elie/Pollen/4-Instead-were-going.mp3",
            "assets/sound/Elie/Pollen/5-First-can-you.mp3",
            "assets/sound/Elie/Pollen/6-We-can-look-at.mp3",
            "assets/sound/Elie/Pollen/7-If-I-know-the-dna.mp3",
            "assets/sound/Elie/Pollen/8-Thanks-it-looks-like.mp3",

            "assets/sound/bees/2-This-doesnt-hurt-barney.mp3",
            "assets/sound/bees/3-You-can-see-that.mp3",
            "assets/sound/bees/2-bella-did-you-know.mp3",
            "assets/sound/bees/3-bella-dna-is-what-makes-unique.mp3",
            "assets/sound/bees/3 im-so-excited.mp3",
            "assets/sound/bees/4 if-we-can-find-out.mp3"
        ];
        return this.textures;
    }
    createAssets(resources){
        this.loadSprites(resources);            
        this.foreground.addAllSprites(this.fSprites);
    }

    stop(){
        this.state = this.states[0];
        
        //this.assetPositioning();
        this.miscAssetCreation();

        this.entryEventChain.resetChain();
        this.eventChain.resetChain();
        this.speechEventChain.resetChain();
        this.exitEventChain.resetChain();
        
        //this.eventChainsDef();
    }

    loadSprites(resources){
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png", resources);
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png", resources);
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png", resources);
        this.fSprites.foregroundPlants = new SpriteItem("assets/fSprites/backgrounds/foreground.fw.png", resources);

        this.fSprites.bench = new SpriteItem("assets/fSprites/objects/bench.png", resources);
        this.fSprites.pollenA1 = new SpriteItem("assets/fSprites/objects/pollen-tube-poppy.png", resources);
        this.fSprites.pollenA2 = new SpriteItem("assets/fSprites/objects/pollen-tube-poppy.png", resources);
        this.fSprites.pollenB1 = new SpriteItem("assets/fSprites/objects/pollen-tube-blackberry.png", resources);
        this.fSprites.pollenB2 = new SpriteItem("assets/fSprites/objects/pollen-tube-blackberry.png", resources);
        this.fSprites.pollenC1 = new SpriteItem("assets/fSprites/objects/pollen-tube-bluebell.png", resources);
        this.fSprites.pollenC2 = new SpriteItem("assets/fSprites/objects/pollen-tube-bluebell.png", resources);
        

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
        this.fSprites.blackberryMag = new SpriteItem("assets/fSprites/objects/blackberry-pollen-magnify.png", resources);

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
            "assets/fSprites/objects/Elie/elie.fw.png",
            "assets/fSprites/objects/Elie/elie-waving.fw.png",
            "assets/fSprites/objects/Elie/elie-left.fw.png",
            "assets/fSprites/objects/Elie/elie-right.fw.png",
        ], resources);

        this.fSprites.clickNotice = new SpriteItem("assets/fSprites/buttons/click-anywhere.png", resources);
        this.fSprites.dragNotice = new SpriteItem("assets/fSprites/buttons/drag-the-bee.png", resources);

        
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

        this.soundManager.add("elie3", "assets/sound/Elie/Pollen/3-Now-we-have.wav", resources);
        this.soundManager.setVolume("elie3", 0.5);

        this.soundManager.add("elie4", "assets/sound/Elie/Pollen/4-Instead-were-going.mp3", resources);
        this.soundManager.setVolume("elie4", 0.5);

        this.soundManager.add("elie5", "assets/sound/Elie/Pollen/5-First-can-you.mp3", resources);
        this.soundManager.setVolume("elie5", 0.5);

        this.soundManager.add("elie6", "assets/sound/Elie/Pollen/6-We-can-look-at.mp3", resources);
        this.soundManager.setVolume("elie6", 0.5);

        this.soundManager.add("elie7", "assets/sound/Elie/Pollen/7-If-I-know-the-dna.mp3", resources);
        this.soundManager.setVolume("elie7", 0.5);

        this.soundManager.add("elie8", "assets/sound/Elie/Pollen/8-Thanks-it-looks-like.mp3", resources);
        this.soundManager.setVolume("elie8", 0.5);

        this.soundManager.add("barney2", "assets/sound/bees/2-This-doesnt-hurt-barney.mp3", resources);
        this.soundManager.setVolume("barney2", 0.5);
        this.soundManager.add("barney3", "assets/sound/bees/3-You-can-see-that.mp3", resources);
        this.soundManager.setVolume("barney3", 0.5);

        this.soundManager.add("bella2", "assets/sound/bees/2-bella-did-you-know.mp3", resources);
        this.soundManager.setVolume("bella2", 2.5);
        this.soundManager.add("bella3", "assets/sound/bees/3-bella-dna-is-what-makes-unique.mp3", resources);
        this.soundManager.setVolume("bella3", 2.5);

        this.soundManager.add("billie3", "assets/sound/bees/3 im-so-excited.mp3", resources);
        this.soundManager.setVolume("billie3", 1);
        this.soundManager.add("billie4", "assets/sound/bees/4 if-we-can-find-out.mp3", resources);
        this.soundManager.setVolume("billie4", 1);

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
        this.fSprites.honeyBee.spriteDirection = 'l';
        this.fSprites.honeyBee.setLocation(130, 650);
        this.fSprites.honeyBee.setSpriteDirection('r');
        this.fSprites.honeyBee.setSpriteAnchor(0.5, 0.5);
        this.fSprites.honeyBee.setAlpha(0);
        this.fSprites.honeyBee.setAnimationFunction(Animation.idle);
        this.fSprites.honeyBee.setAnimationFlag(false);

        this.fSprites.buffBee.setScale(0.5);
        this.fSprites.buffBee.spriteDirection = 'l';
        this.fSprites.buffBee.setLocation(100, 650);
        this.fSprites.buffBee.setSpriteDirection('r');
        this.fSprites.buffBee.setSpriteAnchor(0.5, 0.5);
        this.fSprites.buffBee.setAlpha(0);
        this.fSprites.buffBee.setAnimationFunction(Animation.idle);
        this.fSprites.buffBee.setAnimationFlag(false);

        this.fSprites.redBee.setScale(0.5);
        this.fSprites.redBee.spriteDirection = 'l';
        this.fSprites.redBee.setLocation(100, 650);
        this.fSprites.redBee.setSpriteDirection('r');
        this.fSprites.redBee.setSpriteAnchor(0.5, 0.5);
        this.fSprites.redBee.setAlpha(0);
        this.fSprites.redBee.setAnimationFunction(Animation.idle);
        this.fSprites.redBee.setAnimationFlag(false);

        
        this.fSprites.honeyTube.setScale(0.4);
        this.fSprites.honeyTube.setPivot(0.5, 0.5);
        this.fSprites.honeyTube.setLocation(730, 380);
        this.fSprites.honeyTube.setAlpha(0);
        this.fSprites.honeyTube.setRotation(0);
        this.fSprites.honeyTube.gotoFrame(0);
        this.fSprites.honeyTube.setRotation(0);
        this.fSprites.buffTube.setScale(0.4);
        this.fSprites.buffTube.setPivot(0.5, 0.5);
        this.fSprites.buffTube.setLocation(730, 380);
        this.fSprites.buffTube.setAlpha(0);
        this.fSprites.buffTube.gotoFrame(0);
        this.fSprites.buffTube.setRotation(0);

        this.fSprites.redTube.setScale(0.4);
        this.fSprites.redTube.setPivot(0.5, 0.5);
        this.fSprites.redTube.setLocation(730, 380);
        this.fSprites.redTube.setAlpha(0);       
        this.fSprites.redTube.gotoFrame(0);
        this.fSprites.redTube.setRotation(0); 

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
        this.fSprites.ElieSpeech2.setLocation(400, 50);
        this.fSprites.ElieSpeech2.setAlpha(0);
        this.fSprites.ElieSpeech3.setScale(0.8);
        this.fSprites.ElieSpeech3.setLocation(400, 50);
        this.fSprites.ElieSpeech3.setAlpha(0);

        this.fSprites.ElieSpeech4.setScale(0.8);
        this.fSprites.ElieSpeech4.setLocation(50, 100);
        this.fSprites.ElieSpeech4.setAlpha(0);
        this.fSprites.ElieSpeech5.setScale(0.8);
        this.fSprites.ElieSpeech5.setLocation(50, 100);
        this.fSprites.ElieSpeech5.setAlpha(0);
        this.fSprites.ElieSpeech6.setScale(0.8);
        this.fSprites.ElieSpeech6.setLocation(50, 50);
        this.fSprites.ElieSpeech6.setAlpha(0);



        this.fSprites.Elie.setScale(0.5);
        this.fSprites.Elie.setLocation(900, 353);
        this.fSprites.Elie.gotoFrame(1);
        this.fSprites.Elie.setAlpha(1);

        this.fSprites.clickNotice.setScale(0.8);
        this.fSprites.clickNotice.setLocation(350, 750);
        this.fSprites.clickNotice.setAlpha(1);
        this.fSprites.clickNotice.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.clickNotice.setAnimationFlag(false);

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
        this.fSprites.blackberryMag.setScale(0.8);
        this.fSprites.blackberryMag.setLocation(700, 250);
        this.fSprites.blackberryMag.setAlpha(0);

        this.fSprites.pollenA1.setLocation(510, 360);
        this.fSprites.pollenA1.setAlpha(0);
        this.fSprites.pollenA1.setScale(0.5);
        this.fSprites.pollenA2.setLocation(720, 360);
        this.fSprites.pollenA2.setAlpha(0);
        this.fSprites.pollenA2.setScale(0.5);
        this.fSprites.pollenB1.setLocation(510, 360);
        this.fSprites.pollenB1.setAlpha(0);
        this.fSprites.pollenB1.setScale(0.5);
        this.fSprites.pollenB2.setLocation(720, 360);
        this.fSprites.pollenB2.setAlpha(0);
        this.fSprites.pollenB2.setScale(0.5);
        this.fSprites.pollenC1.setLocation(510, 360);
        this.fSprites.pollenC1.setAlpha(0);
        this.fSprites.pollenC1.setScale(0.5);
        this.fSprites.pollenC2.setLocation(720, 360);
        this.fSprites.pollenC2.setAlpha(0);
        this.fSprites.pollenC2.setScale(0.5);

        this.foreground.setAlpha(0);
    }














    eventChainsDef(){
        this.eventChain
            //Elie!
            .next()
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie3")
            .addClickEvent(this.foreground)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFrameEvent(this.fSprites.Elie, 0)
            .addClickEvent(this.foreground)
            .addStopSoundEvent(this.foreground, this.soundManager, "elie3")
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie4")
            .addFade(this.fSprites.ElieSpeech1, -3, 0, 1)
            .addFade(this.fSprites.ElieSpeech2, 3, 0, 1)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie4")
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie5")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.ElieSpeech2, -3, 0, 1)
            .addFade(this.fSprites.ElieSpeech3, 3, 0, 1)
            .addClickEvent(this.foreground)            
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie5")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.ElieSpeech3, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.honeyTube, 3, 0, 1)
            .next()

            //Bee 1
            .addPlaySoundEvent(this.foreground, this.soundManager, "bee-hum")
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.001, 0, 0.075)
            .addMovement(this.fSprites.honeyBee, [131, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.honeyBee, 3, 0, 1)
            .next()

            .setAnimationFlag(this.fSprites.honeyBee, true)
            .addFade(this.fSprites.dragNotice, 3, 0, 1)
            .next()

            .addCollisionEvent(this.fSprites.honeyBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.honeyBee)
            .next()

            .addForceLocationEvent(this.fSprites.honeyBee, [420, 370])
            .addBringBehind(this.fSprites.honeyBee, this.fSprites.honeyTube)
            .addPlaySoundEvent(this.foreground, this.soundManager, "celeb-ding")
            .next()

            .addFade(this.fSprites.dragNotice, -3, 0, 1)
            .addMovement(this.fSprites.honeyBee, [900, 370], 1, Movement.sinMvPattern)
            .next()

            .addClickEvent(this.foreground)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFrameEvent(this.fSprites.honeyBee, 1)
            .setAnimationFlag(this.fSprites.honeyBee, true)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFrameEvent(this.fSprites.honeyBee, 0)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.honeySpeech1, -3, 0, 1)
            .addFade(this.fSprites.honeySpeech2, -3, 0, 1)
            .addMovement(this.fSprites.honeyBee, [400, 370], 4, Movement.straightMvPattern)
            .next()

            .addMovement(this.fSprites.honeyBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", -0.001, 0, 1)
            .addFade(this.fSprites.honeyBee, -1, 0, 1)
            .next()

            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFade(this.fSprites.poppyMag, 3, 0, 1)
            .addFrameEvent(this.fSprites.Elie, 3)
            .addForceLocationEvent(this.fSprites.Elie, [100, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()

            .addFade(this.fSprites.ElieSpeech4, 3, 0, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie6")
            .addClickEvent(this.foreground)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie6")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.ElieSpeech4, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.poppyMag, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .next()

            .addFade(this.fSprites.pollenA1, -10, 0, 1)
            .addFade(this.fSprites.pollenA2, -10, 0, 1)
            .addFrameEvent(this.fSprites.honeyTube, 1)
            .addRotationEvent(this.fSprites.honeyTube, 0, 90, 1)
            .addScaleEvent(this.fSprites.honeyTube, -0.6, 0.15, 1)
            .addMovement(this.fSprites.honeyTube, [900, 700], 4, Movement.straightMvPattern, 50, false)
            .next()

        this.speechEventChain
            .addEventChainWait(this.foreground, this.eventChain, 9)
            .next()
            .addSleep(this.foreground, 70)
            .next()
            .addFade(this.fSprites.honeySpeech1, 3, 0, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "barney2")
            .addFade(this.fSprites.pollenA1, .5, 0, 1)
            .addSleep(this.foreground, 200)
            .next()
            .addFade(this.fSprites.pollenA2, .5, 0, 1)
            .addSleep(this.foreground, 200)
            .next()
            .addFade(this.fSprites.honeySpeech2, 3, 0, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "barney3")
            .next();


            //Bee 2
        this.eventChain
            .addFade(this.fSprites.buffTube, 3, 0, 1)
            .addMovement(this.fSprites.buffBee, [131, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.buffBee, 3, 0, 1)
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.001, 0, 0.075)
            .addPlaySoundEvent(this.foreground, this.soundManager, "bee-hum")
            .next()

            .setAnimationFlag(this.fSprites.buffBee, true)
            .addFade(this.fSprites.dragNotice, 3, 0, 1)
            .next()

            .addCollisionEvent(this.fSprites.buffBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.buffBee)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "celeb-ding")
            .addForceLocationEvent(this.fSprites.buffBee, [360, 370])
            .addBringBehind(this.fSprites.buffBee, this.fSprites.buffTube)
            .next()

            .addFade(this.fSprites.dragNotice, -3, 0, 1)
            .addMovement(this.fSprites.buffBee, [900, 370], 1, Movement.sinMvPattern)
            .next()

            .addClickEvent(this.foreground)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .setAnimationFlag(this.fSprites.buffBee, true)
            .addFrameEvent(this.fSprites.buffBee, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.buffSpeech1, -3, 0, 1)
            .addFade(this.fSprites.buffSpeech2, -3, 0, 1)
            .addFrameEvent(this.fSprites.buffBee, 0)
            .addMovement(this.fSprites.buffBee, [400, 370], 4, Movement.straightMvPattern)
            .next()

            .addMovement(this.fSprites.buffBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", -0.001, 0, 1)
            .addFade(this.fSprites.buffBee, -1, 0, 1)
            .next()

            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFade(this.fSprites.blackberryMag, 3, 0, 1)
            .addForceLocationEvent(this.fSprites.Elie, [100, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "elie7")
            .addFade(this.fSprites.ElieSpeech5, 3, 0, 1)
            .addClickEvent(this.foreground)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie7")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.ElieSpeech5, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.blackberryMag, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .next()

            .addFade(this.fSprites.pollenB1, -10, 0, 1)
            .addFade(this.fSprites.pollenB2, -10, 0, 1)
            .addFrameEvent(this.fSprites.buffTube, 1)
            .addRotationEvent(this.fSprites.buffTube, 0, 90, 0.85)
            .addScaleEvent(this.fSprites.buffTube, -0.5, 0.15, 1)
            .addMovement(this.fSprites.buffTube, [1000, 700], 4, Movement.quadCurveMvPattern, 50, false)
            .next();

        this.speechEventChain
            .addEventChainWait(this.foreground, this.eventChain, 20)
            .next()
            .addSleep(this.foreground, 90)
            .next()
            .addFade(this.fSprites.buffSpeech1, 3, -1, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "bella2")
            .addFade(this.fSprites.pollenB1, .5, -1, 1)
            .addSleep(this.foreground, 200)
            .next()
            .addFade(this.fSprites.pollenB2, .5, -1, 1)
            .addSleep(this.foreground, 200)
            .next()
            .addFade(this.fSprites.buffSpeech2, 3, 0, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "bella3")
            .next();

        //Bee 3
        this.eventChain
            .addFade(this.fSprites.redTube, 3, 0, 1)
            .addMovement(this.fSprites.redBee, [131, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.redBee, 3, 0, 1)
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", 0.001, 0, 0.075)
            .addPlaySoundEvent(this.foreground, this.soundManager, "bee-hum")
            .next()

            .setAnimationFlag(this.fSprites.redBee, true)
            .addFade(this.fSprites.dragNotice, 3, 0, 1)
            .next()

            //.addIdle(this.fSprites.redBee)
            .addCollisionEvent(this.fSprites.redBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.redBee)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "celeb-ding")
            .addForceLocationEvent(this.fSprites.redBee, [360, 370])
            .addBringBehind(this.fSprites.redBee, this.fSprites.redTube)
            .next()

            .addFade(this.fSprites.dragNotice, -3, 0, 1)
            .addMovement(this.fSprites.redBee, [900, 370], 1, Movement.sinMvPattern)
            .next()

            .addClickEvent(this.foreground)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .setAnimationFlag(this.fSprites.redBee, true)
            .addFrameEvent(this.fSprites.redBee, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFrameEvent(this.fSprites.redBee, 0)
            .addFade(this.fSprites.redSpeech1, -3, 0, 1)
            .addFade(this.fSprites.redSpeech2, -3, 0, 1)
            .addMovement(this.fSprites.redBee, [400, 370], 4, Movement.straightMvPattern)
            .next()

            .addMovement(this.fSprites.redBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addSoundFade(this.foreground, this.soundManager, "bee-hum", -0.001, 0, 1)
            .addFade(this.fSprites.redBee, -1, 0, 1)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "bee-hum")
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFrameEvent(this.fSprites.Elie, 0)
            .addForceLocationEvent(this.fSprites.Elie, [100, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "elie8")
            .addFade(this.fSprites.ElieSpeech6, 3, 0, 1)
            .addFade(this.fSprites.pollenC1, -10, 0, 1)
            .addFade(this.fSprites.pollenC2, -10, 0, 1)
            .addFrameEvent(this.fSprites.redTube, 1)
            .addRotationEvent(this.fSprites.redTube, 0, 90, 0.75)
            .addScaleEvent(this.fSprites.redTube, -0.3, 0.15, 1)
            .addMovement(this.fSprites.redTube, [1100, 700], 4, Movement.quadCurveMvPattern, 50, false)
            .addClickEvent(this.foreground)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie8")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.ElieSpeech6, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .next()
            .addChangeStateEvent(this.foreground, this, 2);


        this.speechEventChain
            .addEventChainWait(this.foreground, this.eventChain, 32)
            .next()
            .addSleep(this.foreground, 80)
            .next()
            .addFade(this.fSprites.redSpeech1, 3, -1, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "billie3")
            .addFade(this.fSprites.pollenC1, .5, -1, 1)
            .addSleep(this.foreground, 200)
            .next()
            .addFade(this.fSprites.pollenC2, .5, -1, 1)
            .addSleep(this.foreground, 200)
            .next()
            .addFade(this.fSprites.redSpeech2, 3, 0, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "billie4")
            .next();

        this.eventChain.initialise();
        this.eventChain.name = "main event chain";

        this.entryEventChain
            .addFade(this.foreground, 3, 0, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "meadow")
            .addSoundFade(this.foreground, this.soundManager, "meadow", 0.01, 0, 0.5)
            .next()
            .addChangeStateEvent(this.foreground, this, 1);
        this.entryEventChain.initialise();
        this.entryEventChain.name = "entry event chain";

        this.exitEventChain
            .addFade(this.foreground, -3, 0, 1.1)
            .addSoundFade(this.foreground, this.soundManager, "meadow", -0.01, 0, 0.5)
            .next()
            .addStopSoundEvent(this.foreground, this.soundManager, "meadow")
            .addChangeStageEvent(this.foreground, this, "hub");
        this.exitEventChain.initialise();
        this.exitEventChain.name = "exit event chain";

        this.speechEventChain.initialise();
        this.speechEventChain.name = "speech event chain";
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

        context.fSprites.honeyBee.tick();
        context.fSprites.buffBee.tick();
        context.fSprites.redBee.tick();
    }

    exit(delta, context){
        this.foreground.tick();
        this.exitEventChain.tick();
    }
}