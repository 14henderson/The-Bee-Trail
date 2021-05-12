import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item/item.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';
import { VideoItem } from '/beetrail/item/videoItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement, Animation} from '/beetrail/movementMisc.js';



export class MinIONStage extends Stage{
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

        this.matchCurrent = 1; //start at 1, as the 0th match is done in event chain
        this.matches = [];
        this.flipTick = 0;
        this.soundFlip = false;

        this.currentPollen = "poppy";
    }

    getTextures(){
        this.textures = [
            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
            "assets/fSprites/backgrounds/foreground.fw.png",
            "assets/fSprites/backgrounds/minion-markIII.png",
        
            "assets/fSprites/objects/elie-standing-NEW.png", 
            "assets/fSprites/objects/elie-waving-NEW.png",
            "assets/fSprites/objects/full-lever.png",
            "assets/fSprites/objects/half-lever.png",

            "assets/fSprites/objects/bluebell-pollen.png",
            "assets/fSprites/objects/blackberry-pollen.png",
            "assets/fSprites/objects/poppy-pollen.png",

            "assets/fSprites/bees/minion/buff-blackberry-yellow.png",
            "assets/fSprites/bees/minion/honey-poppy-orange.png",
            "assets/fSprites/bees/minion/red-bluebell-purple.png",

            "assets/fSprites/objects/DNA/dna-poppy.png",
            "assets/fSprites/objects/DNA/dna-poppy-large-match.png",
            "assets/fSprites/objects/DNA/dna-blackberry-large-match.fw.png",
            "assets/fSprites/objects/DNA/dna-bluebell-large-match.fw.png",
            "assets/fSprites/objects/DNA/dna-buttercup-large-match.fw.png",
            "assets/fSprites/objects/DNA/dna-daisy-large-match.fw.png",
            "assets/fSprites/objects/DNA/dna-forget-large-match.fw.png",
            "assets/fSprites/objects/DNA/dna-foxglove-large-match.fw.png",
            "assets/fSprites/objects/DNA/dna-lavender-large-match.fw.png",
            "assets/fSprites/objects/DNA/dna-yarrow-large-match.fw.png",

            "assets/fSprites/buttons/click-anywhere.png",
            "assets/fSprites/objects/top-layer-grabber.png",
            "assets/fSprites/objects/flashing-arrow-green.png",

            "assets/flowers/blackberry.png",
            "assets/flowers/bluebell.png",
            "assets/flowers/buttercup.png",
            "assets/flowers/forget.png",
            "assets/flowers/foxglove.png",
            "assets/flowers/lavender.png",
            "assets/flowers/poppy.png",
            "assets/flowers/scarlet.png",
            "assets/flowers/daisy.png",
            
            "assets/flowers/label-poppy.fw.png",
            "assets/flowers/label-blackberry.fw.png",
            "assets/flowers/label-bluebell.fw.png",
            "assets/flowers/label-buttercup.fw.png",
            "assets/flowers/label-daisy.fw.png",
            "assets/flowers/label-forget.fw.png",
            "assets/flowers/label-foxglove.fw.png",
            "assets/flowers/label-lavender.fw.png",
            "assets/flowers/label-scarlet.fw.png",

            "assets/fSprites/objects/Elie/elie.fw.png",
            "assets/fSprites/objects/Elie/elie-waving.fw.png",
            "assets/fSprites/objects/Elie/elie-left.fw.png",
            "assets/fSprites/objects/Elie/elie-right.fw.png",

            "assets/fSprites/buttons/match.png",
            "assets/fSprites/buttons/match-pink.png",
            "assets/fSprites/buttons/pull-lever-green.png",
            "assets/fSprites/buttons/pull-lever-pink.png",
            "assets/fSprites/buttons/1drag-pollen.png",

            "assets/fSprites/speech-bubbles/minion/1-elie-speech-minion.png",
            "assets/fSprites/speech-bubbles/minion/2-elie-speech-minion.png",
            "assets/fSprites/speech-bubbles/minion/3-elie-speech-minion.png",
            "assets/fSprites/speech-bubbles/minion/4-elie-speech-minion.png",
            "assets/fSprites/speech-bubbles/minion/5-elie-speech-minion.png",
            "assets/fSprites/speech-bubbles/minion/6-elie-speech-minion.png",
            "assets/fSprites/speech-bubbles/minion/7-elie-speech-minion.png",
            "assets/fSprites/speech-bubbles/minion/8-elie-speech-minion.png",
            
            "assets/fSprites/buttons/yellowflashing-lights.png",
            "assets/fSprites/buttons/greenflashing-lights.png",
            "assets/fSprites/buttons/redflashing-lights.png",

            "assets/sound/meadow.wav",
            "assets/sound/048863013-menu-click-casual-mobile-game.wav",
            "assets/sound/043738205-ting-game-sound.wav",
            "assets/sound/077024761-bees.wav",
            "assets/sound/066893573-casino-slot-machines-slot-mach.wav",
            "assets/sound/054250043-wrong-03.wav",
            "assets/sound/049974748-quiz-correct.wav",
            "assets/sound/143406883-machine-printer-02-scanning-ex.wav",
            
            "assets/sound/Elie/MinION/9-This-machine.mp3",
            "assets/sound/Elie/MinION/10-If-we-can-match.mp3",
            "assets/sound/Elie/MinION/11-The-dna-barcode.mp3",
            "assets/sound/Elie/MinION/12-Can-you-pull.mp3",
            "assets/sound/Elie/MinION/13-Does-this-DNA-match.mp3",
            "assets/sound/Elie/MinION/14-Great-Barney-poppy-match.mp3",
            "assets/sound/Elie/MinION/15-Great-Bella-blackberry-match.wav",
            "assets/sound/Elie/MinION/16-Great-Billie-bluebell.mp3"
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

    loadSprites(resources){
        //------------------//
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png", resources);
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png", resources);
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png", resources);
        this.fSprites.foregroundPlants = new SpriteItem("assets/fSprites/backgrounds/foreground.fw.png", resources);
        this.fSprites.minion = new SpriteItem("assets/fSprites/backgrounds/minion-markIII.png", resources);

        this.fSprites.tGrabber1 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);
        this.fSprites.tGrabber2 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);
        this.fSprites.tGrabber3 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);

        this.fSprites.arrowHighlight = new SpriteItem("assets/fSprites/objects/flashing-arrow-green.png", resources);

        this.fSprites.lever = new AnimatedItem([
            "assets/fSprites/objects/full-lever.png",
            "assets/fSprites/objects/half-lever.png"
        ], resources);

        this.fSprites.matchButton = new AnimatedItem([
            "assets/fSprites/buttons/match.png",
            "assets/fSprites/buttons/match-pink.png"
        ], resources);

        this.fSprites.pullButton = new AnimatedItem([
            "assets/fSprites/buttons/pull-lever-green.png",
            "assets/fSprites/buttons/pull-lever-pink.png"
        ], resources);

        this.fSprites.LEDs1 = new AnimatedItem([
            "assets/fSprites/buttons/yellowflashing-lights.png",
            "assets/fSprites/buttons/greenflashing-lights.png",
            "assets/fSprites/buttons/redflashing-lights.png"
        ], resources);
        this.fSprites.LEDs2 = new AnimatedItem([
            "assets/fSprites/buttons/yellowflashing-lights.png",
            "assets/fSprites/buttons/greenflashing-lights.png",
            "assets/fSprites/buttons/redflashing-lights.png"
        ], resources);


        this.fSprites.labelBlackberry = new SpriteItem("assets/flowers/label-blackberry.fw.png", resources);
        this.fSprites.labelPoppy = new SpriteItem("assets/flowers/label-poppy.fw.png", resources);
        this.fSprites.labelBluebell = new SpriteItem("assets/flowers/label-bluebell.fw.png", resources);
        this.fSprites.labelButtercup = new SpriteItem("assets/flowers/label-buttercup.fw.png", resources);
        this.fSprites.labelDaisy = new SpriteItem("assets/flowers/label-daisy.fw.png", resources);
        this.fSprites.labelForget = new SpriteItem("assets/flowers/label-forget.fw.png", resources);
        this.fSprites.labelFoxglove = new SpriteItem("assets/flowers/label-foxglove.fw.png", resources);
        this.fSprites.labelLavender = new SpriteItem("assets/flowers/label-lavender.fw.png", resources);
        this.fSprites.labelScarlet = new SpriteItem("assets/flowers/label-scarlet.fw.png", resources);

        this.fSprites.DNABlackberryMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-blackberry-large-match.fw.png", resources);
        this.fSprites.DNAPoppyMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-poppy-large-match.png", resources);
        this.fSprites.DNABluebellMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-bluebell-large-match.fw.png", resources);
        this.fSprites.DNAButtercupMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-buttercup-large-match.fw.png", resources);
        this.fSprites.DNADaisyMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-daisy-large-match.fw.png", resources);
        this.fSprites.DNAForgetMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-forget-large-match.fw.png", resources);
        this.fSprites.DNAFoxgloveMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-foxglove-large-match.fw.png", resources);
        this.fSprites.DNALavenderMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-lavender-large-match.fw.png", resources);
        this.fSprites.DNAScarletMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-yarrow-large-match.fw.png", resources);


        this.fSprites.DNABlackberry = new SpriteItem("assets/fSprites/objects/DNA/dna-blackberry-large-match.fw.png", resources);
        this.fSprites.DNABluebell = new SpriteItem("assets/fSprites/objects/DNA/dna-bluebell-large-match.fw.png", resources)
        this.fSprites.DNAPoppy = new SpriteItem("assets/fSprites/objects/DNA/dna-poppy-large-match.png", resources);


        this.fSprites.blackberry = new SpriteItem("assets/flowers/blackberry.png", resources);
        this.fSprites.blackberry2 = new SpriteItem("assets/flowers/blackberry.png", resources);
        this.fSprites.bluebell = new SpriteItem("assets/flowers/bluebell.png", resources);
        this.fSprites.bluebell2 = new SpriteItem("assets/flowers/bluebell.png", resources);
        this.fSprites.poppy = new SpriteItem("assets/flowers/poppy.png", resources);
        this.fSprites.poppy2 = new SpriteItem("assets/flowers/poppy.png", resources);
        this.fSprites.lavender = new SpriteItem("assets/flowers/lavender.png", resources);
        this.fSprites.foxglove= new SpriteItem("assets/flowers/foxglove.png", resources);
        this.fSprites.buttercup = new SpriteItem("assets/flowers/buttercup.png", resources);
        this.fSprites.daisy = new SpriteItem("assets/flowers/daisy.png", resources);
        this.fSprites.forget = new SpriteItem("assets/flowers/forget.png", resources);
        this.fSprites.scarlet = new SpriteItem("assets/flowers/scarlet.png", resources);

        
        
        this.fSprites.redBee = new SpriteItem("assets/fSprites/bees/minion/red-bluebell-purple.png", resources);
        this.fSprites.buffBee = new SpriteItem("assets/fSprites/bees/minion/buff-blackberry-yellow.png", resources);
        this.fSprites.honeyBee = new SpriteItem("assets/fSprites/bees/minion/honey-poppy-orange.png", resources);
        

        this.fSprites.pollenBlackberry = new SpriteItem("assets/fSprites/objects/blackberry-pollen.png", resources);       
        this.fSprites.pollenBluebell = new SpriteItem("assets/fSprites/objects/bluebell-pollen.png", resources);
        this.fSprites.pollenPoppy = new SpriteItem("assets/fSprites/objects/poppy-pollen.png", resources);

        this.fSprites.Elie = new AnimatedItem([
            "assets/fSprites/objects/Elie/elie.fw.png",
            "assets/fSprites/objects/Elie/elie-waving.fw.png",
            "assets/fSprites/objects/Elie/elie-left.fw.png",
            "assets/fSprites/objects/Elie/elie-right.fw.png",
        ], resources);
        
        this.fSprites.eSpeech1 = new SpriteItem("assets/fSprites/speech-bubbles/minion/1-elie-speech-minion.png", resources);
        this.fSprites.eSpeech2 = new SpriteItem("assets/fSprites/speech-bubbles/minion/2-elie-speech-minion.png", resources);
        this.fSprites.eSpeech3 = new SpriteItem("assets/fSprites/speech-bubbles/minion/3-elie-speech-minion.png", resources);
        this.fSprites.eSpeech4 = new SpriteItem("assets/fSprites/speech-bubbles/minion/4-elie-speech-minion.png", resources);
        this.fSprites.eSpeech5 = new SpriteItem("assets/fSprites/speech-bubbles/minion/5-elie-speech-minion.png", resources);
        this.fSprites.eSpeech6 = new SpriteItem("assets/fSprites/speech-bubbles/minion/6-elie-speech-minion.png", resources);
        this.fSprites.eSpeech7 = new SpriteItem("assets/fSprites/speech-bubbles/minion/7-elie-speech-minion.png", resources);
        this.fSprites.eSpeech8 = new SpriteItem("assets/fSprites/speech-bubbles/minion/8-elie-speech-minion.png", resources);

        this.fSprites.dragInfoBox = new SpriteItem("assets/fSprites/buttons/1drag-pollen.png", resources);
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

        this.soundManager.add("lever", "assets/sound/066893573-casino-slot-machines-slot-mach.wav", resources);
        this.soundManager.setVolume("lever", 0.5);

        this.soundManager.add("wrong", "assets/sound/054250043-wrong-03.wav", resources);
        this.soundManager.setVolume("wrong", 0.5);

        this.soundManager.add("correct", "assets/sound/049974748-quiz-correct.wav", resources);
        this.soundManager.setVolume("correct", 0.5);

        this.soundManager.add("scan", "assets/sound/143406883-machine-printer-02-scanning-ex.wav", resources);
        this.soundManager.setVolume("scan", 0.3);


        this.soundManager.add("elie9", "assets/sound/Elie/MinION/9-This-machine.mp3", resources);
        this.soundManager.setVolume("elie9", 0.8);
        this.soundManager.add("elie10", "assets/sound/Elie/MinION/10-If-we-can-match.mp3", resources);
        this.soundManager.setVolume("elie10", 0.8);
        this.soundManager.add("elie11", "assets/sound/Elie/MinION/11-The-dna-barcode.mp3", resources);
        this.soundManager.setVolume("elie11", 0.8);
        this.soundManager.add("elie12", "assets/sound/Elie/MinION/12-Can-you-pull.mp3", resources);
        this.soundManager.setVolume("elie12", 0.8);
        this.soundManager.add("elie13", "assets/sound/Elie/MinION/13-Does-this-DNA-match.mp3", resources);
        this.soundManager.setVolume("elie13", 0.8);
        this.soundManager.add("elie14", "assets/sound/Elie/MinION/14-Great-Barney-poppy-match.mp3", resources);
        this.soundManager.setVolume("elie14", 0.8);
        this.soundManager.add("elie15", "assets/sound/Elie/MinION/15-Great-Bella-blackberry-match.wav", resources);
        this.soundManager.setVolume("elie15", 0.8);
        this.soundManager.add("elie16", "assets/sound/Elie/MinION/16-Great-Billie-bluebell.mp3", resources);
        this.soundManager.setVolume("elie16", 0.8);



        this.matches.push([this.fSprites.DNABlackberryMatch, this.fSprites.blackberry, this.fSprites.labelBlackberry]);
        this.matches.push([this.fSprites.DNABluebellMatch, this.fSprites.bluebell, this.fSprites.labelBluebell]);
        this.matches.push([this.fSprites.DNAPoppyMatch, this.fSprites.poppy, this.fSprites.labelPoppy]);
        this.matches.push([this.fSprites.DNALavenderMatch, this.fSprites.lavender, this.fSprites.labelLavender]);
        this.matches.push([this.fSprites.DNAFoxgloveMatch, this.fSprites.foxglove, this.fSprites.labelFoxglove]);
        this.matches.push([this.fSprites.DNAButtercupMatch, this.fSprites.buttercup, this.fSprites.labelButtercup]);
        this.matches.push([this.fSprites.DNADaisyMatch, this.fSprites.daisy, this.fSprites.labelDaisy]);
        this.matches.push([this.fSprites.DNAForgetMatch, this.fSprites.forget, this.fSprites.labelForget]);
        this.matches.push([this.fSprites.DNAScarletMatch, this.fSprites.scarlet, this.fSprites.labelScarlet]);
        
            
        this.miscAssetCreation();
    }

    miscAssetCreation(){
        let pollenDropBox = new PIXI.Graphics()
            .lineStyle(4, 0xFF3300, 0)
            .drawRect(0, 0, 60, 100);
        this.fSprites.pollenDropBox = new ShapeItem(pollenDropBox, false);
    }

    assetPositioning(){
        //this.soundManager.play("golden");
        this.fSprites.background3.setSize(1280, 960);
        this.fSprites.background2.setSize(1280, 960);
        this.fSprites.background1.setSize(1280, 960);
        this.fSprites.foregroundPlants.setSize(1280, 960);

        this.fSprites.minion.setScale(0.8);
        this.fSprites.minion.setLocation(50, 50);

        this.fSprites.lever.setLocation(75, 477);
        this.fSprites.lever.setScale(0.8);
        //this.fSprites.lever.enableInteractiveState()
        this.fSprites.lever.enableMouseHoverFrame(1);

        //Bees!
        this.fSprites.honeyBee.setScale(0.8);
        this.fSprites.honeyBee.setLocation(280, 178);
        this.fSprites.honeyBee.setSpriteAnchor(0.5, 0.5);

        this.fSprites.buffBee.setScale(0.8);
        this.fSprites.buffBee.setLocation(282, 280);
        this.fSprites.buffBee.setSpriteAnchor(0.5, 0.5);

        this.fSprites.redBee.setScale(0.8);
        this.fSprites.redBee.setLocation(281, 380);
        this.fSprites.redBee.setSpriteAnchor(0.5, 0.5);
 


        //Three pollen samples
        this.fSprites.pollenPoppy.setScale(0.3);
        this.fSprites.pollenPoppy.setLocation(146, 175);
        this.fSprites.pollenPoppy.enableInteractiveState();
        this.fSprites.pollenPoppy.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.pollenPoppy.setAnimationFlag(true);
        this.fSprites.pollenPoppy.setSpriteAnchor(0.5, 0.5);

        this.fSprites.pollenBlackberry.setScale(0.3);
        this.fSprites.pollenBlackberry.setLocation(144, 277);
        this.fSprites.pollenBlackberry.enableInteractiveState();
        //this.fSprites.pollenBlackberry.setAlpha(0.5);
        this.fSprites.pollenBlackberry.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.pollenBlackberry.setAnimationFlag(false);
        this.fSprites.pollenBlackberry.setSpriteAnchor(0.5, 0.5);

        this.fSprites.pollenBluebell.setScale(0.3);
        this.fSprites.pollenBluebell.setLocation(143, 381);
        this.fSprites.pollenBluebell.enableInteractiveState();
        //this.fSprites.pollenBluebell.setAlpha(0.5);
        this.fSprites.pollenBluebell.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.pollenBluebell.setAnimationFlag(false);
        this.fSprites.pollenBluebell.setSpriteAnchor(0.5, 0.5);

        


        //minION DNA Sequences
        this.fSprites.DNABlackberry.setLocation(720, 245);
        this.fSprites.DNABlackberry.setScale(0.65);
        this.fSprites.DNABlackberry.setAlpha(0);

        this.fSprites.DNABluebell.setLocation(720, 245);
        this.fSprites.DNABluebell.setScale(0.65);
        this.fSprites.DNABluebell.setAlpha(0);

        this.fSprites.DNAPoppy.setLocation(720, 245);
        this.fSprites.DNAPoppy.setScale(0.65);
        this.fSprites.DNAPoppy.setAlpha(0);




        //Computer DNA Sequences
        this.fSprites.DNABlackberryMatch.setLocation(260, 543);
        this.fSprites.DNABlackberryMatch.setAlpha(0);
        this.fSprites.DNABluebellMatch.setLocation(260, 543);
        this.fSprites.DNABluebellMatch.setAlpha(0);
        this.fSprites.DNAPoppyMatch.setLocation(260, 543);
        this.fSprites.DNAPoppyMatch.setAlpha(0);
        this.fSprites.DNAButtercupMatch.setLocation(260, 543);
        this.fSprites.DNAButtercupMatch.setAlpha(0);
        this.fSprites.DNADaisyMatch.setLocation(260, 543);
        this.fSprites.DNADaisyMatch.setAlpha(0);
        this.fSprites.DNAFoxgloveMatch.setLocation(260, 543);
        this.fSprites.DNAFoxgloveMatch.setAlpha(0);
        this.fSprites.DNAForgetMatch.setLocation(260, 543);
        this.fSprites.DNAForgetMatch.setAlpha(0);
        this.fSprites.DNALavenderMatch.setLocation(260, 543);
        this.fSprites.DNALavenderMatch.setAlpha(0);
        this.fSprites.DNAScarletMatch.setLocation(260, 543);
        this.fSprites.DNAScarletMatch.setAlpha(0);



        //Plants
        this.fSprites.blackberry.setScale(0.4);
        this.fSprites.blackberry.setLocation(980, 590);
        this.fSprites.blackberry.setAlpha(0);
        this.fSprites.blackberry2.setScale(0.4);
        this.fSprites.blackberry2.setLocation(980, 590);
        this.fSprites.blackberry2.setAlpha(0);
        this.fSprites.bluebell.setScale(0.4);
        this.fSprites.bluebell.setLocation(960, 590);
        this.fSprites.bluebell.setAlpha(0);
        this.fSprites.bluebell2.setScale(0.4);
        this.fSprites.bluebell2.setLocation(960, 590);
        this.fSprites.bluebell2.setAlpha(0);
        this.fSprites.poppy.setScale(0.35);
        this.fSprites.poppy.setLocation(960, 600);
        this.fSprites.poppy.setAlpha(0);
        this.fSprites.poppy2.setScale(0.3);
        this.fSprites.poppy2.setLocation(980, 600);
        this.fSprites.poppy2.setAlpha(0);
        //------------------------------
        this.fSprites.lavender.setScale(0.4);
        this.fSprites.lavender.setLocation(965, 580);
        this.fSprites.lavender.setAlpha(0);
        this.fSprites.foxglove.setScale(0.4);
        this.fSprites.foxglove.setLocation(940, 580);
        this.fSprites.foxglove.setAlpha(0);
        this.fSprites.buttercup.setScale(0.4);
        this.fSprites.buttercup.setLocation(960, 580);
        this.fSprites.buttercup.setAlpha(0);
        this.fSprites.daisy.setScale(0.4);
        this.fSprites.daisy.setLocation(955, 570);
        this.fSprites.daisy.setAlpha(0);
        this.fSprites.forget.setScale(0.4);
        this.fSprites.forget.setLocation(960, 575);
        this.fSprites.forget.setAlpha(0);
        this.fSprites.scarlet.setScale(0.4);
        this.fSprites.scarlet.setLocation(945, 575);
        this.fSprites.scarlet.setAlpha(0);



        //Computer Labels
        this.fSprites.labelBlackberry.setScale(0.8);
        this.fSprites.labelBlackberry.setLocation(900, 507);
        this.fSprites.labelBlackberry.setAlpha(0);
        this.fSprites.labelPoppy.setScale(0.8);
        this.fSprites.labelPoppy.setLocation(900, 507);
        this.fSprites.labelPoppy.setAlpha(0);
        this.fSprites.labelBluebell.setScale(0.8);
        this.fSprites.labelBluebell.setLocation(900, 507);
        this.fSprites.labelBluebell.setAlpha(0);
        this.fSprites.labelButtercup.setScale(0.8);
        this.fSprites.labelButtercup.setLocation(900, 507);
        this.fSprites.labelButtercup.setAlpha(0);
        this.fSprites.labelDaisy.setScale(0.8);
        this.fSprites.labelDaisy.setLocation(900, 507);
        this.fSprites.labelDaisy.setAlpha(0);
        this.fSprites.labelForget.setScale(0.8);
        this.fSprites.labelForget.setLocation(900, 507);
        this.fSprites.labelForget.setAlpha(0);
        this.fSprites.labelFoxglove.setScale(0.8);
        this.fSprites.labelFoxglove.setLocation(900, 507);
        this.fSprites.labelFoxglove.setAlpha(0);
        this.fSprites.labelLavender.setScale(0.8);
        this.fSprites.labelLavender.setLocation(900, 507);
        this.fSprites.labelLavender.setAlpha(0);
        this.fSprites.labelScarlet.setScale(0.8);
        this.fSprites.labelScarlet.setLocation(900, 507);
        this.fSprites.labelScarlet.setAlpha(0);

        //speech bubbles
        this.fSprites.eSpeech1.setScale(0.8);
        this.fSprites.eSpeech1.setLocation(550, 110);
        this.fSprites.eSpeech1.setAlpha(1);
        this.fSprites.eSpeech2.setScale(0.8);
        this.fSprites.eSpeech2.setAlpha(0);
        this.fSprites.eSpeech2.setLocation(450, 50);
        this.fSprites.eSpeech3.setScale(0.8);
        this.fSprites.eSpeech3.setAlpha(0);
        this.fSprites.eSpeech3.setLocation(100, 150);
        this.fSprites.eSpeech4.setScale(0.8);
        this.fSprites.eSpeech4.setAlpha(0);
        this.fSprites.eSpeech4.setLocation(30, 50);
        this.fSprites.eSpeech5.setScale(0.8);
        this.fSprites.eSpeech5.setAlpha(0);
        this.fSprites.eSpeech5.setLocation(230, 50);
        this.fSprites.eSpeech6.setScale(0.8);
        this.fSprites.eSpeech6.setAlpha(0);
        this.fSprites.eSpeech6.setLocation(150, 100);
        this.fSprites.eSpeech7.setScale(0.8);
        this.fSprites.eSpeech7.setAlpha(0);
        this.fSprites.eSpeech7.setLocation(300, 100);
        this.fSprites.eSpeech8.setScale(0.8);
        this.fSprites.eSpeech8.setAlpha(0);
        this.fSprites.eSpeech8.setLocation(50, 100);
        

        //grabbers and buttons
        this.fSprites.tGrabber1.setScale(0.8);
        this.fSprites.tGrabber1.setLocation(108, 177);
        this.fSprites.tGrabber1.bringBefore(this.fSprites.pollenPoppy);
        this.fSprites.tGrabber2.setScale(0.8);
        this.fSprites.tGrabber2.setLocation(108, 279);
        this.fSprites.tGrabber2.bringBefore(this.fSprites.pollenBlackberry);
        this.fSprites.tGrabber3.setScale(0.8);
        this.fSprites.tGrabber3.setLocation(108, 381);
        this.fSprites.tGrabber3.bringBefore(this.fSprites.pollenBluebell);

        this.fSprites.matchButton.setScale(0.7);
        this.fSprites.matchButton.setLocation(200, 710);
        this.fSprites.matchButton.enableMouseHoverFrame(1);
        this.fSprites.pullButton.setScale(1);
        this.fSprites.pullButton.setLocation(70, 750);
        this.fSprites.pullButton.enableMouseHoverFrame(1);

        this.fSprites.arrowHighlight.setScale(0.81);
        this.fSprites.arrowHighlight.setLocation(647, 149);
        this.fSprites.arrowHighlight.setAnimationFunction(Animation.fullAlphaPulse);
        this.fSprites.arrowHighlight.setAnimationFlag(true);

        this.fSprites.LEDs1.setScale(0.8);
        this.fSprites.LEDs1.setLocation(910, 467);
        this.fSprites.LEDs1.setAnimationFunction(Animation.fullAlphaPulse);
        this.fSprites.LEDs1.setAnimationFlag(false);

        this.fSprites.LEDs2.setScale(0.8);
        this.fSprites.LEDs2.setLocation(910, 870);
        this.fSprites.LEDs2.setAnimationFunction(Animation.fullAlphaPulse);
        this.fSprites.LEDs2.setAnimationFlag(false);

        this.fSprites.Elie.setScale(0.5);
        this.fSprites.Elie.gotoFrame(1);
        this.fSprites.Elie.setAlpha(1);
        this.fSprites.Elie.setSpriteAnchor(0.5, 0);
        this.fSprites.Elie.setLocation(1000, 353);

        this.fSprites.dragInfoBox.setScale(0.8);
        this.fSprites.dragInfoBox.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.dragInfoBox.setAnimationFlag(false);
        this.fSprites.dragInfoBox.setSpriteAnchor(0.5, 0.5);
        this.fSprites.dragInfoBox.setLocation(640, 830);
        this.fSprites.dragInfoBox.setAlpha(0);

        this.fSprites.clickNotice.setScale(0.8);
        this.fSprites.clickNotice.setLocation(640, 830);
        this.fSprites.clickNotice.setSpriteAnchor(0.5, 0.5);
        this.fSprites.clickNotice.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.clickNotice.setAnimationFlag(true);

        this.fSprites.pollenDropBox.setLocation(630, 230);
        this.foreground.setAlpha(0);
    }
    
    testForBlackberry(){return this.matchCurrent == 0;}
    testForBluebell(){return this.matchCurrent == 1;}
    testForPoppy(){return this.matchCurrent == 2;}
    
 
    eventChainsDef(){
        this.entryEventChain
            .addFade(this.foreground, 3, 0, 1)
            .addSoundFade(this.foreground, this.soundManager, "meadow", 0.01, 0, 0.5)
            .addPlaySoundEvent(this.foreground, this.soundManager, "meadow")
            .next()
            .addChangeStateEvent(this.foreground, this, 1);
        this.entryEventChain.initialise();

        this.eventChain
            .next()
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie9")
            .addClickEvent(this.foreground)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie9")
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie10")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFrameEvent(this.fSprites.Elie, 0)
            .addFade(this.fSprites.eSpeech1, -3, 0, 1)
            .addFade(this.fSprites.eSpeech2, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addClickEvent(this.foreground)
            .next()

            //-------------------------FIRST BEE MATCHING-------------------------//
            .addStopSoundEvent(this.foreground, this.soundManager, "elie10")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.eSpeech2, -3, 0, 1)
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.dragInfoBox, 3, 0, 1)
            .next()
            
            .setAnimationFlag(this.fSprites.dragInfoBox, true)
            .addDragEvent(this.fSprites.pollenPoppy)
            .addCollisionEvent(this.fSprites.pollenPoppy, this.fSprites.pollenDropBox)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "scan")
            .addFade(this.fSprites.dragInfoBox, -3, 0, 1)
            .setAnimationFlag(this.fSprites.dragInfoBox, false)
            .addForceLocationEvent(this.fSprites.Elie, [500, 353])
            .addForceLocationEvent(this.fSprites.pollenPoppy, [660, 280])
            .setAnimationFlag(this.fSprites.pollenPoppy, false)
            .addFade(this.fSprites.pollenPoppy, 3, 0, 1)
            .addSleep(this.foreground, 80)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "elie11")
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .addFade(this.fSprites.eSpeech3, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFrameEvent(this.fSprites.Elie, 3)
            .addFade(this.fSprites.DNAPoppy, 100, 0, 1)
            .addClickEvent(this.foreground)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie11")
            .addPlaySoundEvent(this.foreground, this.soundManager, "elie12")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addClickEvent(this.foreground)
            .addFrameEvent(this.fSprites.Elie, 0)
            .addFade(this.fSprites.eSpeech3, -3, 0, 1)
            .addFade(this.fSprites.eSpeech4, 3, 0, 1)
            .addFade(this.fSprites.DNABlackberryMatch, 3, 0, 1)
            .addFade(this.fSprites.blackberry, 3, 0, 1)
            .addFade(this.fSprites.labelBlackberry, 3, 0, 1)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie12")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addClickEvent(this.fSprites.pullButton)
            .addCustomAction(this.fSprites.pullButton, 'enableInteractiveState')
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.eSpeech4, -3, 0, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "lever")
            .addFrameEvent(this.fSprites.lever, 1)
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.DNABlackberryMatch, -100, 0, 1)
            .addFade(this.fSprites.blackberry, -100, 0, 1)
            .addFade(this.fSprites.labelBlackberry, -100, 0, 1)
            .addFade(this.fSprites.DNABluebellMatch, 100, 0, 1)
            .addFade(this.fSprites.bluebell, 100, 0, 1)
            .addFade(this.fSprites.labelBluebell, 100, 0, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "elie13")
            .addForceLocationEvent(this.fSprites.Elie, [900, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFrameEvent(this.fSprites.Elie, 2)
            .addFade(this.fSprites.eSpeech5, 3, 0, 1)
            .addClickEvent(this.foreground)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie13")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.eSpeech5, -3, 0, 1)
            .addFrameEvent(this.fSprites.lever, 0)
            .next()
            
            
            .addCustomAction(this.fSprites.matchButton, 'enableInteractiveState')
            .addCustomAction(this.fSprites.pullButton, 'enableInteractiveState')
            .addCustomWait(this, 'testForPoppy')
            .addCustomWait(this.fSprites.matchButton, 'getClickedStateAndReset')
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "correct")
            .setAnimationFlag(this.fSprites.LEDs1, true)
            .addFrameEvent(this.fSprites.LEDs1, 1)
            .setAnimationFlag(this.fSprites.LEDs2, true)
            .addFrameEvent(this.fSprites.LEDs2, 1)
            .addFade(this.fSprites.DNAPoppy, -100, 0, 1)
            .addMovement(this.fSprites.pollenPoppy, [338, 814], 3, Movement.straightMvPattern, 30, false)
            .addMovement(this.fSprites.honeyBee, [380, 750], 3, Movement.straightMvPattern, 30, false)
            .addFade(this.fSprites.poppy2, 100, 0, 1)
            .addMovement(this.fSprites.poppy2, [393, 782], 3, Movement.straightMvPattern, 30, false)
            .addScaleEvent(this.fSprites.poppy2, -0.14, 0.15, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "elie14")
            .addFrameEvent(this.fSprites.Elie, 0)
            .addForceLocationEvent(this.fSprites.Elie, [600, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFade(this.fSprites.eSpeech6, 3, 0, 1)
            .addClickEvent(this.foreground)
            .setAnimationFlag(this.fSprites.LEDs1, false)
            .addFrameEvent(this.fSprites.LEDs1, 0)
            .setAnimationFlag(this.fSprites.LEDs2, false)
            .addFrameEvent(this.fSprites.LEDs2, 0)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie14")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.eSpeech6, -3, 0, 1)
            .addFade(this.fSprites.dragInfoBox, 3, 0, 1)
            .next()


            //-------------------------SECOND BEE MATCHING-------------------------//
            .setAnimationFlag(this.fSprites.pollenBlackberry, true)
            .setAnimationFlag(this.fSprites.dragInfoBox, true)
            .addDragEvent(this.fSprites.pollenBlackberry)
            .addCollisionEvent(this.fSprites.pollenBlackberry, this.fSprites.pollenDropBox)
            .next()


            .addPlaySoundEvent(this.foreground, this.soundManager, "scan")
            .addForceLocationEvent(this.fSprites.pollenBlackberry, [660, 280])
            .addFade(this.fSprites.pollenBlackberry, 3, 0, 1)
            .addSleep(this.foreground, 80)
            .next()

            .addFade(this.fSprites.DNABlackberry, 100, 0, 1)
            .setAnimationFlag(this.fSprites.pollenBlackberry, false)
            .addFade(this.fSprites.dragInfoBox, -3, 0, 1)
            .setAnimationFlag(this.fSprites.dragInfoBox, false)
            .next()

            .addCustomAction(this.fSprites.matchButton, 'enableInteractiveState')
            .addCustomWait(this, 'testForBlackberry')
            .addCustomWait(this.fSprites.matchButton, 'getClickedStateAndReset')
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "correct")
            .setAnimationFlag(this.fSprites.LEDs1, true)
            .addFrameEvent(this.fSprites.LEDs1, 1)
            .setAnimationFlag(this.fSprites.LEDs2, true)
            .addFrameEvent(this.fSprites.LEDs2, 1)
            .addFade(this.fSprites.DNABlackberry, -100, 0, 1)
            .addMovement(this.fSprites.pollenBlackberry, [535, 814], 3, Movement.straightMvPattern, 30, false)
            .addMovement(this.fSprites.buffBee, [574, 745], 3, Movement.straightMvPattern, 30, false)
            .addFade(this.fSprites.blackberry2, 100, 0, 1)
            .addMovement(this.fSprites.blackberry2, [597, 785], 3, Movement.straightMvPattern, 30, false)
            .addScaleEvent(this.fSprites.blackberry2, -0.2, 0.15, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "elie15")
            .addFrameEvent(this.fSprites.Elie, 0)
            .addForceLocationEvent(this.fSprites.Elie, [750, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFade(this.fSprites.eSpeech7, 3, 0, 1)
            .addClickEvent(this.foreground)
            .setAnimationFlag(this.fSprites.LEDs1, false)
            .addFrameEvent(this.fSprites.LEDs1, 0)
            .setAnimationFlag(this.fSprites.LEDs2, false)
            .addFrameEvent(this.fSprites.LEDs2, 0)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie15")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .addFade(this.fSprites.clickNotice, -3, 0, 1)
            .addFade(this.fSprites.eSpeech7, -3, 0, 1)
            .addFade(this.fSprites.dragInfoBox, 3, 0, 1)
            .next()

            //--------------------THIRD BEE MATCHING-------------------------//
            .setAnimationFlag(this.fSprites.pollenBluebell, true)
            .setAnimationFlag(this.fSprites.dragInfoBox, true)
            .addDragEvent(this.fSprites.pollenBluebell)
            .addCollisionEvent(this.fSprites.pollenBluebell, this.fSprites.pollenDropBox)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "scan")
            .addForceLocationEvent(this.fSprites.pollenBluebell, [660, 280])
            .addFade(this.fSprites.pollenBluebell, 3, 0, 1)
            .addSleep(this.foreground, 80)
            .next()

            .addFade(this.fSprites.DNABluebell, 100, 0, 1)
            .setAnimationFlag(this.fSprites.pollenBluebell, false)
            .addFade(this.fSprites.dragInfoBox, -3, 0, 1)
            .setAnimationFlag(this.fSprites.dragInfoBox, false)
            .next()
            
            .addCustomAction(this.fSprites.matchButton, 'enableInteractiveState')
            .addCustomWait(this, 'testForBluebell')
            .addCustomWait(this.fSprites.matchButton, 'getClickedStateAndReset')
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "correct")
            .setAnimationFlag(this.fSprites.LEDs1, true)
            .addFrameEvent(this.fSprites.LEDs1, 1)
            .setAnimationFlag(this.fSprites.LEDs2, true)
            .addFrameEvent(this.fSprites.LEDs2, 1)
            .addFade(this.fSprites.DNABluebell, -100, 0, 1)
            .addMovement(this.fSprites.pollenBluebell, [725, 814], 3, Movement.straightMvPattern, 30, false)
            .addMovement(this.fSprites.redBee, [767, 745], 3, Movement.straightMvPattern, 30, false)
            .addFade(this.fSprites.bluebell2, 100, 0, 1)
            .addMovement(this.fSprites.bluebell2, [784, 782], 3, Movement.straightMvPattern, 30, false)
            .addScaleEvent(this.fSprites.bluebell2, -0.3, 0.15, 1)
            .next()

            .addPlaySoundEvent(this.foreground, this.soundManager, "elie16")
            .addFrameEvent(this.fSprites.Elie, 0)
            .addForceLocationEvent(this.fSprites.Elie, [500, 353])
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .addFade(this.fSprites.clickNotice, 3, 0, 1)
            .addFade(this.fSprites.eSpeech8, 3, 0, 1)
            .addClickEvent(this.foreground)
            .setAnimationFlag(this.fSprites.LEDs1, false)
            .addFrameEvent(this.fSprites.LEDs1, 0)
            .setAnimationFlag(this.fSprites.LEDs2, false)
            .addFrameEvent(this.fSprites.LEDs2, 0)
            .next()

            .addStopSoundEvent(this.foreground, this.soundManager, "elie16")
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addChangeStateEvent(this.foreground, this, 2);
        
        this.eventChain.initialise();

        this.exitEventChain
            .addFade(this.foreground, -3, 0, 1.1)
            .addSoundFade(this.foreground, this.soundManager, "meadow", -0.01, 0, 0.5)
            .next()
            .addChangeStageEvent(this.foreground, this, "final");
        this.exitEventChain.initialise();
    }


    

    entry(delta, context){
        context.foreground.tick();
        context.entryEventChain.tick();
    }

    //STATES
    main(delta, context){
        context.foreground.tick();
        this.eventChain.tick();
        this.fSprites.pollenBlackberry.tick();
        this.fSprites.pollenBluebell.tick();
        this.fSprites.pollenPoppy.tick();
        this.fSprites.arrowHighlight.tick();
        this.fSprites.dragInfoBox.tick();
        this.fSprites.clickNotice.tick();
        this.fSprites.LEDs1.tick();
        this.fSprites.LEDs2.tick();

        if(!(
                ((this.eventChain.eventNumber == 12 || this.eventChain.eventNumber == 13) && this.testForPoppy())
            ||  ((this.eventChain.eventNumber == 19 || this.eventChain.eventNumber == 20) && this.testForBlackberry())
            ||  ((this.eventChain.eventNumber == 26 || this.eventChain.eventNumber == 27) && this.testForBluebell())
        )){
            if(this.fSprites.matchButton._beingDragged){
                this.fSprites.LEDs1.gotoFrame(2);
                this.fSprites.LEDs2.gotoFrame(2);
                if(this.soundFlip == false){
                    this.soundManager.play("wrong");
                    this.soundFlip = true;
                }
            }else{
                this.soundFlip = false;
                this.fSprites.LEDs1.gotoFrame(0);
                this.fSprites.LEDs2.gotoFrame(0);
            }
            if(this.fSprites.matchButton.getClickedState()){
                
            }
        }
        if(this.fSprites.pullButton.getClickedStateAndReset()){
            this.soundManager.play("lever");
        }

        if(this.fSprites.pullButton._beingDragged){
            this.flipTick++;
            if(this.flipTick == 1){
                this.fSprites.lever.gotoFrame(1);
                this.matches[this.matchCurrent][0].setAlpha(0);
                this.matches[this.matchCurrent][1].setAlpha(0);
                this.matches[this.matchCurrent][2].setAlpha(0);
                this.matchCurrent++;
                if(this.matchCurrent == this.matches.length){this.matchCurrent = 0;}
                this.matches[this.matchCurrent][0].setAlpha(1);
                this.matches[this.matchCurrent][1].setAlpha(1);
                this.matches[this.matchCurrent][2].setAlpha(1);
            }
        }else if(this.eventChain.eventNumber < 8 || this.eventChain.eventNumber > 10){
            this.flipTick = 0;
            this.fSprites.lever.gotoFrame(0);
        }
    }

    exit(delta, context){
        context.foreground.tick();
        this.exitEventChain.tick();
    }

}