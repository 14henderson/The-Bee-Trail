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
    }

    getTextures(){
        this.textures = [
            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
            "assets/fSprites/backgrounds/foreground.fw.png",
        
            "assets/fSprites/objects/elie-standing-NEW.png", 
            "assets/fSprites/objects/elie-waving-NEW.png",

            "assets/fSprites/buttons/click-anywhere.png"
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
    }

    assetPositioning(){
        //this.soundManager.play("golden");
        this.fSprites.background3.setSize(1280, 960);
        this.fSprites.background2.setSize(1280, 960);
        this.fSprites.background1.setSize(1280, 960);
        this.fSprites.foregroundPlants.setSize(1280, 960);

        this.foreground.setAlpha(0);
    }

    eventChainsDef(){
    }

    loop(delta, context){
        context.state(delta, context);
    }
    

    entry(delta, context){
        context.foreground.tick();
    }

    //STATES
    main(delta, context){
        context.foreground.tick();
    }

    exit(delta, context){
        context.foreground.tick();
    }

}