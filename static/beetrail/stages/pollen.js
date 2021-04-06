import {Stage} from '/beetrail/stages/stage.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement} from '/beetrail/movementMisc.js';

export class PollenStage extends Stage{
    entryEventChain;
    eventChain;
    exitEventChain;
    textures;

    constructor(app, stageManager){
        super(app, stageManager);
        
        this.states = [this.entry, this.main, this.exit];
        this.state = this.entry;
        
        this.entryEventChain = new EventChain();
        this.eventChain = new EventChain();
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

            "assets/fSprites/objects/elie-standing.png",
            "assets/fSprites/objects/elie-waving.png",
            "assets/fSprites/objects/net-yellow.png",
            "assets/fSprites/objects/Artboard 4net-overlay.png",
        
            "assets/fSprites/objects/bench.png",
            "assets/fSprites/objects/laptop.png",
            "assets/fSprites/objects/minion-cable.png",
            "assets/fSprites/objects/outer-tube.png",
            "assets/fSprites/objects/redtail-tube.png",
            "assets/fSprites/objects/honeybee-tube.png",
            "assets/fSprites/objects/bufftail-tube.png",
        
            "assets/fSprites/buttons/meadowNav.fw.png",
            "assets/fSprites/buttons/meadowNav_L.fw.png",
            "assets/fSprites/buttons/minIONNav.fw.png",
            "assets/fSprites/buttons/minIONNav_L.fw.png",
            "assets/fSprites/buttons/pollenNav.fw.png",
            "assets/fSprites/buttons/pollenNav_L.fw.png",

            "assets/fSprites/speech-bubbles/speech-bubble-tube-top.png"
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

        //---------------------------
        this.fSprites.bench = new SpriteItem("assets/fSprites/objects/bench.png", resources);
        //this.fSprites.laptop = new SpriteItem("assets/fSprites/objects/laptop.png", resources);
        //this.fSprites.minION = new SpriteItem("assets/fSprites/objects/minion-cable.png", resources);
        //---------------------------
        this.fSprites.honeyTube = new SpriteItem("assets/fSprites/objects/honeybee-tube.png", resources);
        this.fSprites.buffTube = new SpriteItem("assets/fSprites/objects/bufftail-tube.png", resources);
        this.fSprites.redTube = new SpriteItem("assets/fSprites/objects/redtail-tube.png", resources);
        
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

        this.fSprites.netFront = new SpriteItem("assets/fSprites/objects/Artboard 4net-overlay.png", resources);
        this.fSprites.beeSpeechDrag = new SpriteItem("assets/fSprites/speech-bubbles/speech-bubble-tube-top.png", resources);
        this.fSprites.Elie = new SpriteItem("assets/fSprites/objects/elie-waving-jeans.png", resources);


        this.miscAssetCreation();
    }

    miscAssetCreation(){
        let tubeEntranceBox = new PIXI.Graphics()
            .lineStyle(4, 0xFF3300, 1)
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

        this.fSprites.beeSpeechDrag.setScale(0.4)
        this.fSprites.beeSpeechDrag.setLocation(0, 300);
        this.fSprites.beeSpeechDrag.setAlpha(0);

        this.fSprites.Elie.setScale(0.5);
        this.fSprites.Elie.setLocation(900, 353);




        this.foreground.setAlpha(0);
    }

    eventChainsDef(){
        this.eventChain
            //Bee 1
            .addClickEvent(this.foreground)
            .next()
            .addFade(this.fSprites.Elie, -3, 0, 1)
            .next()
            .addMovement(this.fSprites.honeyBee, [130, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.honeyBee, 1, 0, 1)
            .next()
            .addFade(this.fSprites.beeSpeechDrag, 3, 0, 1)
            .addIdle(this.fSprites.honeyBee)
            .addCollisionEvent(this.fSprites.honeyBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.honeyBee)
            .next()
            .addForceLocationEvent(this.fSprites.honeyBee, [420, 370])
            .addBringBehind(this.fSprites.honeyBee, this.fSprites.honeyTube)
            .next()
            .addFade(this.fSprites.beeSpeechDrag, -3, 0, 1)
            .addMovement(this.fSprites.honeyBee, [900, 370], 1, Movement.sinMvPattern)
            .next()
            .addMovement(this.fSprites.honeyBee, [400, 370], 4, Movement.straightMvPattern)
            .next()
            .addMovement(this.fSprites.honeyBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addFade(this.fSprites.honeyBee, -1, 0, 1)
            .addRotationEvent(this.fSprites.honeyTube, 180, 270, 1)
            .addScaleEvent(this.fSprites.honeyTube, -0.6, 0.15, 1)
            .addMovement(this.fSprites.honeyTube, [900, 700], 4, Movement.quadCurveMvPattern, 50)
            .next()

            //Bee 2
            
        this.eventChain
            .addFade(this.fSprites.buffTube, 3, 0, 1)
            .addMovement(this.fSprites.buffBee, [130, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.buffBee, 1, 0, 1)
            .next()
            .addFade(this.fSprites.beeSpeechDrag, 3, -1, 1)
            .addIdle(this.fSprites.buffBee)
            .addCollisionEvent(this.fSprites.buffBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.buffBee)
            .next()
            .addForceLocationEvent(this.fSprites.buffBee, [360, 370])
            .addBringBehind(this.fSprites.buffBee, this.fSprites.buffTube)
            .next()
            .addFade(this.fSprites.beeSpeechDrag, -3, 0, 1)
            .addMovement(this.fSprites.buffBee, [900, 370], 1, Movement.sinMvPattern)
            .next()
            .addMovement(this.fSprites.buffBee, [400, 370], 4, Movement.straightMvPattern)
            .next()
            .addMovement(this.fSprites.buffBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addFade(this.fSprites.buffBee, -1, 0, 1)
            .addRotationEvent(this.fSprites.buffTube, 180, 270, 1)
            .addScaleEvent(this.fSprites.buffTube, -0.6, 0.15, 1)
            .addMovement(this.fSprites.buffTube, [1000, 700], 4, Movement.quadCurveMvPattern, 50)
            .next();

        //Bee 3
        this.eventChain
            .addFade(this.fSprites.redTube, 3, 0, 1)
            .addMovement(this.fSprites.redBee, [130, 450], 2, Movement.straightMvPattern)
            .addFade(this.fSprites.redBee, 1, 0, 1)
            .next()
            .addFade(this.fSprites.beeSpeechDrag, 3, -1, 1)
            .addIdle(this.fSprites.redBee)
            .addCollisionEvent(this.fSprites.redBee, this.fSprites.tubeEntranceBox)
            .addDragEvent(this.fSprites.redBee)
            .next()
            .addForceLocationEvent(this.fSprites.redBee, [360, 370])
            .addBringBehind(this.fSprites.redBee, this.fSprites.redTube)
            .next()
            .addFade(this.fSprites.beeSpeechDrag, -3, 0, 1)
            .addMovement(this.fSprites.redBee, [900, 370], 1, Movement.sinMvPattern)
            .next()
            .addMovement(this.fSprites.redBee, [400, 370], 4, Movement.straightMvPattern)
            .next()
            .addMovement(this.fSprites.redBee, [100, 100], 4, Movement.quadCurveMvPattern, 70)
            .addFade(this.fSprites.redBee, -1, 0, 1)
            .addRotationEvent(this.fSprites.redTube, 180, 270, 1)
            .addScaleEvent(this.fSprites.redTube, -0.6, 0.15, 1)
            .addMovement(this.fSprites.redTube, [1100, 700], 4, Movement.quadCurveMvPattern, 50)
            .next()

        //end
        this.eventChain
            .addFade(this.fSprites.Elie, 3, 0, 1)
            .next()
            .addClickEvent(this.foreground)
            .next()
            .addChangeStateEvent(this.foreground, this, 2);
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
    }

    loop(delta, context){
        context.state(delta);
    }

    entry(delta, context){
        context.entryEventChain.tick();
        context.foreground.tick();
    }

    main(delta, context){
        context.foreground.tick();
        context.eventChain.tick();
    }

    exit(delta, context){
        this.foreground.tick();
        this.exitEventChain.tick();
    }
}