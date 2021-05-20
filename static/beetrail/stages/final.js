import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item/item.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';
import { VideoItem } from '/beetrail/item/videoItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement, Animation} from '/beetrail/movementMisc.js';



export class FinalStage extends Stage{
    entryEventChain;
    eventChain;
    exitEventChain;

    textures;

    constructor(app, stageManager, soundManager){
        super(app, stageManager, soundManager);

        this.states = [this.entry, this.main];
        this.state = this.entry;
        
        this.eventChain = new EventChain();
        this.entryEventChain = new EventChain();
    }

    getTextures(){
        this.textures = [
            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
            "assets/fSprites/backgrounds/foreground.fw.png",

            "assets/fSprites/objects/Artboard 1newspaper-backpage.png",
            "assets/fSprites/buttons/Artboard 2certificate-button-green.png",
            "assets/fSprites/buttons/Artboard 2certificate-button-pink.png",
            "assets/fSprites/buttons/video-play-button.png",
            "assets/fSprites/buttons/Artboard 3video-play-green.png",

            "assets/sound/012669617-my-little-adventure-60-sec-loo.mp3"
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
        
        this.eventChainsDef();
    }

    loadSprites(resources){
        //------------------//
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png", resources);
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png", resources);
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png", resources);
        this.fSprites.foregroundPlants = new SpriteItem("assets/fSprites/backgrounds/foreground.fw.png", resources);

        this.fSprites.newspaper = new SpriteItem("assets/fSprites/objects/Artboard 1newspaper-backpage.png", resources);
        this.fSprites.certButton = new AnimatedItem([
            "assets/fSprites/buttons/Artboard 2certificate-button-green.png",
            "assets/fSprites/buttons/Artboard 2certificate-button-pink.png"
        ], resources);

        this.fSprites.vidButton = new AnimatedItem([
            "assets/fSprites/buttons/Artboard 3video-play-green.png",
            "assets/fSprites/buttons/video-play-button.png"            
        ], resources);

        this.soundManager.add("soundtrack", "assets/sound/012669617-my-little-adventure-60-sec-loo.mp3", resources);
        this.soundManager.setVolume("soundtrack", 0.3);
        this.soundManager.setLoop("soundtrack", true);
    }




    assetPositioning(){
        this.fSprites.background3.setSize(1280, 960);
        this.fSprites.background2.setSize(1280, 960);
        this.fSprites.background1.setSize(1280, 960);
        this.fSprites.foregroundPlants.setSize(1280, 960);

        this.fSprites.newspaper.setSize(1280, 960);

        this.fSprites.certButton.centerPivot();
        this.fSprites.certButton.setScale(0.8);
        this.fSprites.certButton.setLocation(1000, 383);
        this.fSprites.certButton.enableInteractiveState();
        this.fSprites.certButton.enableMouseHoverFrame(1);

        this.fSprites.vidButton.centerPivot();
        this.fSprites.vidButton.setLocation(620, 760);
        this.fSprites.vidButton.enableInteractiveState();
        this.fSprites.vidButton.enableMouseHoverFrame(1);

        this.foreground.setAlpha(0);
    }



    eventChainsDef(){
        this.entryEventChain
            .addFade(this.foreground, 3, -0.1, 1)
            .addSoundFade(this.foreground, this.soundManager, "soundtrack", 0.01, 0, 0.5)
            .next()
            
            .addChangeStateEvent(this.foreground, this, 1);
        this.entryEventChain.initialise();
    }



    entry(delta, context){
        context.foreground.tick();
        context.entryEventChain.tick();
    }



    main(delta, context){
        if(this.fSprites.certButton.getClickedStateAndReset()){
            window.open("/assets/certificate/certificate.pdf");
        }

        if(this.fSprites.vidButton.getClickedStateAndReset()){
            window.open("https://www.earlham.ac.uk/");
        }

        context.foreground.tick();
    }

}