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
        this.flipTick = 0;
    }

    getTextures(){
        this.textures = [
            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
            "assets/fSprites/backgrounds/foreground.fw.png",
            "assets/fSprites/backgrounds/minion-markII.png",
        
            "assets/fSprites/objects/elie-standing-NEW.png", 
            "assets/fSprites/objects/elie-waving-NEW.png",

            "assets/fSprites/objects/full-lever.png",
            "assets/fSprites/objects/half-lever.png",

            "assets/fSprites/objects/bluebell-pollen.png",
            "assets/fSprites/objects/blackberry-pollen.png",
            "assets/fSprites/objects/poppy-pollen.png",

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

            "assets/flowers/blackberry.png",
            "assets/flowers/lavender.png",
            "assets/flowers/poppy.png",
            "assets/flowers/foxglove.png",
            
            "assets/flowers/label-poppy.fw.png",
            "assets/flowers/label-blackberry.fw.png",
            "assets/flowers/label-bluebell.fw.png",
            "assets/flowers/label-buttercup.fw.png",
            "assets/flowers/label-daisy.fw.png",
            "assets/flowers/label-forget.fw.png",
            "assets/flowers/label-foxglove.fw.png",
            "assets/flowers/label-lavender.fw.png",
            "assets/flowers/label-yarrow.fw.png"

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
        this.fSprites.minion = new SpriteItem("assets/fSprites/backgrounds/minion-markII.png", resources);

        this.fSprites.tGrabber1 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);
        this.fSprites.tGrabber2 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);
        this.fSprites.tGrabber3 = new SpriteItem("assets/fSprites/objects/top-layer-grabber.png", resources);

        this.fSprites.lever = new AnimatedItem([
            "assets/fSprites/objects/full-lever.png",
            "assets/fSprites/objects/half-lever.png"
        ], resources);

        this.fSprites.labelBlackberry = new SpriteItem("assets/flowers/label-blackberry.fw.png", resources);
        this.fSprites.labelPoppy = new SpriteItem("assets/flowers/label-poppy.fw.png", resources);
        this.fSprites.labelBluebell = new SpriteItem("assets/flowers/label-bluebell.fw.png", resources);
        this.fSprites.labelButtercup = new SpriteItem("assets/flowers/label-buttercup.fw.png", resources);
        this.fSprites.labelDaisy = new SpriteItem("assets/flowers/label-daisy.fw.png", resources);
        this.fSprites.labelForget = new SpriteItem("assets/flowers/label-forget.fw.png", resources);
        this.fSprites.labelFoxglove = new SpriteItem("assets/flowers/label-foxglove.fw.png", resources);
        this.fSprites.labelLavender = new SpriteItem("assets/flowers/label-lavender.fw.png", resources);
        this.fSprites.labelYarrow = new SpriteItem("assets/flowers/label-yarrow.fw.png", resources);

        this.fSprites.DNABlackberryMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-blackberry-large-match.fw.png", resources);
        this.fSprites.DNAPoppyMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-poppy-large-match.png", resources);
        this.fSprites.DNABluebellMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-bluebell-large-match.fw.png", resources);
        this.fSprites.DNAButtercupMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-buttercup-large-match.fw.png", resources);
        this.fSprites.DNADaisyMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-daisy-large-match.fw.png", resources);
        this.fSprites.DNAForgetMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-forget-large-match.fw.png", resources);
        this.fSprites.DNAFoxgloveMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-foxglove-large-match.fw.png", resources);
        this.fSprites.DNALavenderMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-lavender-large-match.fw.png", resources);
        this.fSprites.DNAYarrowMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-yarrow-large-match.fw.png", resources);


        this.fSprites.blackberry = new SpriteItem("assets/flowers/blackberry.png", resources);
        this.fSprites.poppy = new SpriteItem("assets/flowers/poppy.png", resources);
        this.fSprites.lavender = new SpriteItem("assets/flowers/lavender.png", resources);
        this.fSprites.foxglove= new SpriteItem("assets/flowers/foxglove.png", resources);


        this.fSprites.pollenBlackberry = new SpriteItem("assets/fSprites/objects/blackberry-pollen.png", resources);       
        this.fSprites.pollenBluebell = new SpriteItem("assets/fSprites/objects/bluebell-pollen.png", resources);
        this.fSprites.pollenPoppy = new SpriteItem("assets/fSprites/objects/poppy-pollen.png", resources);

        
        this.fSprites.DNAPoppy = new SpriteItem("assets/fSprites/objects/DNA/dna-poppy.png", resources);
        //this.fSprites.DNANikMatch = new SpriteItem("assets/fSprites/objects/DNA/dna-test-large-match.fw.png", resources);


        this.matches.push([this.fSprites.DNAPoppyMatch, this.fSprites.poppy, this.fSprites.labelPoppy]);
        this.matches.push([this.fSprites.DNABlackberryMatch, this.fSprites.blackberry, this.fSprites.labelBlackberry]);
        this.matches.push([this.fSprites.DNALavenderMatch, this.fSprites.lavender, this.fSprites.labelLavender]);
        this.matches.push([this.fSprites.DNAFoxgloveMatch, this.fSprites.foxglove, this.fSprites.labelFoxglove]);
        
            
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
        this.fSprites.lever.enableInteractiveState()
        this.fSprites.lever.enableMouseHoverFrame(1);

        this.fSprites.pollenBlackberry.setScale(0.3);
        this.fSprites.pollenBlackberry.setLocation(150, 180);
        this.fSprites.pollenBlackberry.enableInteractiveState();
        this.fSprites.pollenBlackberry.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.pollenBlackberry.setAnimationFlag(true);
        this.fSprites.pollenBlackberry.setSpriteAnchor(0.5, 0.5);
        this.fSprites.pollenBluebell.setScale(0.3);
        this.fSprites.pollenBluebell.setLocation(115, 245);
        this.fSprites.pollenBluebell.enableInteractiveState();
        this.fSprites.pollenBluebell.setAlpha(0.5);
        this.fSprites.pollenPoppy.setScale(0.3);
        this.fSprites.pollenPoppy.setLocation(120, 345);
        this.fSprites.pollenPoppy.enableInteractiveState();
        this.fSprites.pollenPoppy.setAlpha(0.5);

        this.fSprites.DNAPoppy.setLocation(702, 240);
        this.fSprites.DNAPoppy.setAlpha(0);

        this.fSprites.DNAPoppyMatch.setScale(0.8);
        this.fSprites.DNAPoppyMatch.setLocation(310, 555);
        this.fSprites.DNABlackberryMatch.setScale(0.8);
        this.fSprites.DNABlackberryMatch.setLocation(310, 555);
        this.fSprites.DNABlackberryMatch.setAlpha(0);
        this.fSprites.DNABluebellMatch.setScale(0.8);
        this.fSprites.DNABluebellMatch.setLocation(310, 555);
        this.fSprites.DNABluebellMatch.setAlpha(0);
        this.fSprites.DNAButtercupMatch.setScale(0.8);
        this.fSprites.DNAButtercupMatch.setLocation(310, 555);
        this.fSprites.DNAButtercupMatch.setAlpha(0);
        this.fSprites.DNADaisyMatch.setScale(0.8);
        this.fSprites.DNADaisyMatch.setLocation(310, 555);
        this.fSprites.DNADaisyMatch.setAlpha(0);
        this.fSprites.DNAFoxgloveMatch.setScale(0.8);
        this.fSprites.DNAFoxgloveMatch.setLocation(310, 555);
        this.fSprites.DNAFoxgloveMatch.setAlpha(0);
        this.fSprites.DNAForgetMatch.setScale(0.8);
        this.fSprites.DNAForgetMatch.setLocation(310, 555);
        this.fSprites.DNAForgetMatch.setAlpha(0);
        this.fSprites.DNALavenderMatch.setScale(0.8);
        this.fSprites.DNALavenderMatch.setLocation(310, 555);
        this.fSprites.DNALavenderMatch.setAlpha(0);
        this.fSprites.DNAYarrowMatch.setScale(0.8);
        this.fSprites.DNAYarrowMatch.setLocation(310, 555);
        this.fSprites.DNAYarrowMatch.setAlpha(0);

        this.fSprites.poppy.setScale(0.3);
        this.fSprites.poppy.setLocation(980, 600);
        this.fSprites.poppy.setAlpha(1);
        
        this.fSprites.lavender.setScale(0.4);
        this.fSprites.lavender.setLocation(1000, 600);
        this.fSprites.lavender.setAlpha(0);

        this.fSprites.blackberry.setScale(0.4);
        this.fSprites.blackberry.setLocation(980, 590);
        this.fSprites.blackberry.setAlpha(0);

        this.fSprites.foxglove.setScale(0.3);
        this.fSprites.foxglove.setLocation(940, 580);
        this.fSprites.foxglove.setAlpha(0);


        this.fSprites.labelPoppy.setScale(0.8);
        this.fSprites.labelPoppy.setLocation(920, 507);
        this.fSprites.labelBlackberry.setScale(0.8);
        this.fSprites.labelBlackberry.setLocation(920, 507);
        this.fSprites.labelBlackberry.setAlpha(0);
        this.fSprites.labelBluebell.setScale(0.8);
        this.fSprites.labelBluebell.setLocation(920, 507);
        this.fSprites.labelBluebell.setAlpha(0);
        this.fSprites.labelButtercup.setScale(0.8);
        this.fSprites.labelButtercup.setLocation(920, 507);
        this.fSprites.labelButtercup.setAlpha(0);
        this.fSprites.labelDaisy.setScale(0.8);
        this.fSprites.labelDaisy.setLocation(920, 507);
        this.fSprites.labelDaisy.setAlpha(0);
        this.fSprites.labelForget.setScale(0.8);
        this.fSprites.labelForget.setLocation(920, 507);
        this.fSprites.labelForget.setAlpha(0);
        this.fSprites.labelFoxglove.setScale(0.8);
        this.fSprites.labelFoxglove.setLocation(920, 507);
        this.fSprites.labelFoxglove.setAlpha(0);
        this.fSprites.labelLavender.setScale(0.8);
        this.fSprites.labelLavender.setLocation(920, 507);
        this.fSprites.labelLavender.setAlpha(0);
        this.fSprites.labelYarrow.setScale(0.8);
        this.fSprites.labelYarrow.setLocation(920, 507);
        this.fSprites.labelYarrow.setAlpha(0);


        this.fSprites.tGrabber1.setScale(0.8);
        this.fSprites.tGrabber1.setLocation(108, 177);
        this.fSprites.tGrabber1.bringBefore(this.fSprites.pollenBlackberry);
        this.fSprites.tGrabber2.setScale(0.8);
        this.fSprites.tGrabber2.setLocation(108, 279);
        this.fSprites.tGrabber2.bringBefore(this.fSprites.pollenBluebell);
        this.fSprites.tGrabber3.setScale(0.8);
        this.fSprites.tGrabber3.setLocation(108, 381);
        this.fSprites.tGrabber2.bringBefore(this.fSprites.pollenPoppy);

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
            .addDragEvent(this.fSprites.pollenBlackberry)
            .addCollisionEvent(this.fSprites.pollenBlackberry, this.fSprites.pollenDropBox)
            .next()
            .addForceLocationEvent(this.fSprites.pollenBlackberry, [660, 280])
            .addFade(this.fSprites.pollenBlackberry, 3, 0, 1)
            .addFade(this.fSprites.DNAPoppy, 100, 0, 1)
            .next()
            .setAnimationFlag(this.fSprites.pollenBlackberry, false);
        
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
        this.fSprites.pollenBlackberry.tick();

        if(this.fSprites.lever._beingDragged){
            
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
            

        }else{
            this.flipTick = 0;
            this.fSprites.lever.gotoFrame(0);
        }
    }

    exit(delta, context){
        context.foreground.tick();
    }

}