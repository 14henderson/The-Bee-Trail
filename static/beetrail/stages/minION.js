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

    constructor(app, stageManager){
        super(app, stageManager);

        this.states = [this.entry, this.main, this.exit];
        this.state = this.entry;
        
        this.eventChain = new EventChain();
        this.entryEventChain = new EventChain();
        this.exitEventChain = new EventChain();

        this.matchCurrent = 0;
        this.matches = [];
    }

    getTextures(){
        this.textures = [
            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
            "assets/fSprites/backgrounds/foreground.fw.png",
            "assets/fSprites/backgrounds/minion.png",
        
            "assets/fSprites/objects/elie-standing-NEW.png", 
            "assets/fSprites/objects/elie-waving-NEW.png",

            "assets/fSprites/objects/full-lever.png",
            "assets/fSprites/objects/half-lever.png",

            "assets/fSprites/objects/bluebell-pollen.png",
            "assets/fSprites/objects/blackberry-pollen.png",
            "assets/fSprites/objects/poppy-pollen.png",

            "assets/fSprites/objects/DNA/dna-poppy.png",
            "assets/fSprites/objects/DNA/dna-poppy-large-match.png",

            "assets/fSprites/buttons/click-anywhere.png",
            "assets/fSprites/objects/top-layer-grabber.png"

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
        this.fSprites.minion = new SpriteItem("assets/fSprites/backgrounds/minion.png", resources);

        this.fSprites.tGrabber1 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);
        this.fSprites.tGrabber2 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);
        this.fSprites.tGrabber3 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);

        this.fSprites.lever = new AnimatedItem([
            "assets/fSprites/objects/full-lever.png",
            "assets/fSprites/objects/half-lever.png"
        ], resources);

        this.fSprites.blackberry = new SpriteItem("assets/fSprites/objects/blackberry-pollen.png", resources);
        this.fSprites.bluebell = new SpriteItem("assets/fSprites/objects/bluebell-pollen.png", resources);
        this.fSprites.poppy = new SpriteItem("assets/fSprites/objects/poppy-pollen.png", resources);

        this.fSprites.DNAPoppy = new SpriteItem("assets/fSprites/objects/DNA/dna-poppy.png", resources);
        this.fSprites.DNAPoppyMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-poppy-large-match.png", resources);

        this.matches.push(this.fSprites.DNAPoppyMatch);
            
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

        this.fSprites.lever.setLocation(73, 420);
        this.fSprites.lever.enableInteractiveState()
        this.fSprites.lever.enableMouseHoverFrame(1);

        this.fSprites.blackberry.setScale(0.3);
        this.fSprites.blackberry.setLocation(150, 180);
        this.fSprites.blackberry.enableInteractiveState();
        this.fSprites.blackberry.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.blackberry.setAnimationFlag(true);
        this.fSprites.blackberry.setSpriteAnchor(0.5, 0.5);
        this.fSprites.bluebell.setScale(0.3);
        this.fSprites.bluebell.setLocation(115, 245);
        this.fSprites.bluebell.enableInteractiveState();
        this.fSprites.bluebell.setAlpha(0.5);
        this.fSprites.poppy.setScale(0.3);
        this.fSprites.poppy.setLocation(120, 345);
        this.fSprites.poppy.enableInteractiveState();
        this.fSprites.poppy.setAlpha(0.5);

        this.fSprites.DNAPoppy.setLocation(702, 240);
        this.fSprites.DNAPoppy.setAlpha(0);

        this.fSprites.DNAPoppyMatch.setScale(0.8);
        this.fSprites.DNAPoppyMatch.setLocation(340, 640);
        


        this.fSprites.tGrabber1.setScale(0.8);
        this.fSprites.tGrabber1.setLocation(108, 177);
        this.fSprites.tGrabber1.bringBefore(this.fSprites.blackberry);
        this.fSprites.tGrabber2.setScale(0.8);
        this.fSprites.tGrabber2.setLocation(108, 279);
        this.fSprites.tGrabber2.bringBefore(this.fSprites.bluebell);
        this.fSprites.tGrabber3.setScale(0.8);
        this.fSprites.tGrabber3.setLocation(108, 381);
        this.fSprites.tGrabber2.bringBefore(this.fSprites.poppy);

        this.fSprites.pollenDropBox.setLocation(630, 230);
        this.foreground.setAlpha(0);
    }
    

    eventChainsDef(){
        this.entryEventChain
            .addFade(this.foreground, 3, 0, 1)
            .next()
            .addChangeStateEvent(this.foreground, this, 1);
        this.entryEventChain.initialise();

        this.eventChain
            .addDragEvent(this.fSprites.blackberry)
            .addCollisionEvent(this.fSprites.blackberry, this.fSprites.pollenDropBox)
            .next()
            .addForceLocationEvent(this.fSprites.blackberry, [660, 280])
            .addFade(this.fSprites.blackberry, 3, 0, 1)
            .addFade(this.fSprites.DNAPoppy, 100, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.blackberry, false);
        
        this.eventChain.initialise();
    }


    

    entry(delta, context){
        context.foreground.tick();
        context.entryEventChain.tick();
    }

    //STATES
    main(delta, context){
        context.foreground.tick();
        this.eventChain.tick();
        this.fSprites.blackberry.tick();

        if(this.fSprites.lever._beingDragged){
            this.fSprites.lever.gotoFrame(1);
            this.matches[this.matchCurrent].setAlpha(0);
            this.matchCurrent++;
            if(this.matchCurrent == this.matches.length){this.matchCurrent = 0;}
            this.matches[this.matchCurrent].setAlpha(1);

        }else{
            this.fSprites.lever.gotoFrame(0);
        }
    }

    exit(delta, context){
        context.foreground.tick();
    }

}