import {Stage} from '/beetrail/stages/stage.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement, Animation} from '/beetrail/movementMisc.js';


export class HubStage extends Stage{
    startEventChain;
    entryEventChain;
    mainEventChain;
    exitEventChain;

    animationTick;

    customState;    //increases on completion of stage.
    textures;

    constructor(app, stageManager, soundManager){
        super(app, stageManager, soundManager);
        
        this.states = [this.start, this.entry, this.main, this.exit];
        this.state = this.start;
        
        this.startEventChain = new EventChain();
        this.entryEventChain = new EventChain();
        this.mainEventChain = new EventChain();
        this.exitEventChain = new EventChain();

        this.customState = 0;
        this.animationTick = 0;
    }

    getTextures(){
        this.textures = [       
            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
            "assets/fSprites/backgrounds/foreground.fw.png",
        
            "assets/fSprites/objects/elie-standing.png",
            "assets/fSprites/objects/elie-waving.png",
            "assets/fSprites/objects/net-yellow.png",
        
            "assets/fSprites/objects/bench.png",
            "assets/fSprites/objects/laptop.png",
            "assets/fSprites/objects/minion-cable.png",
        
            "assets/fSprites/objects/Artboard 1newspaper-front-cover.png",
            "assets/fSprites/buttons/play-button-hover.png",
            "assets/fSprites/buttons/static-play-button-click.png",

            "assets/fSprites/buttons/Artboard 2click-to-apply-newspaper-static.png",
            "assets/fSprites/buttons/Artboard 2click-to-apply-newspaper-hover.png",
        
            "assets/fSprites/buttons/meadowNav.png",
            "assets/fSprites/buttons/meadowNav_L.png",
            "assets/fSprites/buttons/minIONNav.png",
            "assets/fSprites/buttons/minIONNav_L.png",
            "assets/fSprites/buttons/pollenNav.png",
            "assets/fSprites/buttons/pollenNav_L.png",

            "assets/sound/048863013-menu-click-casual-mobile-game.wav",
            "assets/sound/043738205-ting-game-sound.wav",
            "assets/sound/012669617-my-little-adventure-60-sec-loo.wav"
        ];
        return this.textures;
    }

    createAssets(resources){
        this.loadSprites(resources);            
        this.foreground.addAllSprites(this.fSprites);
    }


    stop(){
        this.assetPositioning();

        this.mainEventChain.resetChain();
        this.entryEventChain.resetChain();
        this.exitEventChain.resetChain();

        this.state = this.states[1];
    }


    loadSprites(resources){
        //---------------------------
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png", resources);
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png", resources);
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png", resources);
        this.fSprites.foregroundPlants = new SpriteItem("assets/fSprites/backgrounds/foreground.fw.png", resources);
        //---------------------------
        this.fSprites.bench = new SpriteItem("assets/fSprites/objects/bench.png", resources);
        this.fSprites.laptop = new SpriteItem("assets/fSprites/objects/laptop.png", resources);
        this.fSprites.minION = new SpriteItem("assets/fSprites/objects/minion-cable.png", resources);
        this.fSprites.newspaper = new SpriteItem("assets/fSprites/objects/Artboard 1newspaper-front-cover.png", resources);
        //---------------------------
        
        this.fSprites.meadowNav = new AnimatedItem([
            "assets/fSprites/buttons/meadowNav.png",
            "assets/fSprites/buttons/meadowNav_L.png"
        ], resources);
        this.fSprites.pollenNav = new AnimatedItem([
            "assets/fSprites/buttons/pollenNav.png",
            "assets/fSprites/buttons/pollenNav_L.png"
        ], resources);
        this.fSprites.minIONNav = new AnimatedItem([
            "assets/fSprites/buttons/minIONNav.png",
            "assets/fSprites/buttons/minIONNav_L.png"
        ], resources, "minion nav ");

        this.fSprites.playButton = new AnimatedItem([
            "assets/fSprites/buttons/Artboard 2click-to-apply-newspaper-hover.png",
            "assets/fSprites/buttons/Artboard 2click-to-apply-newspaper-static.png"
        ], resources);


        this.soundManager.add("speech-click", "assets/sound/048863013-menu-click-casual-mobile-game.wav", resources);
        this.soundManager.setVolume("speech-click", 0.5);

        this.soundManager.add("soundtrack", "assets/sound/012669617-my-little-adventure-60-sec-loo.wav", resources);
        this.soundManager.setVolume("soundtrack", 0.3);
        this.soundManager.setLoop("soundtrack", true);



    }



    assetPositioning(){
        this.fSprites.background3.setSize(1280, 960);
        this.fSprites.background2.setSize(1280, 960);
        this.fSprites.background1.setSize(1280, 960);
        this.fSprites.foregroundPlants.setSize(1280, 960);
        
        this.fSprites.newspaper.setSize(1280, 960);
        this.fSprites.newspaper.setAlpha(0);

        this.fSprites.bench.setScale(1280/2639);
        this.fSprites.bench.setLocation(0, 686);

        this.fSprites.laptop.setScale(0.5);
        this.fSprites.laptop.setLocation(700, 550);
        this.fSprites.minION.setScale(0.4);
        this.fSprites.minION.setLocation(750, 750);

        this.fSprites.playButton.centerPivot();
        this.fSprites.playButton.setLocation(970, 680);
        this.fSprites.playButton.enableInteractiveState();
        this.fSprites.playButton.enableMouseHoverFrame(1);
        this.fSprites.playButton.setAlpha(0);

        this.fSprites.meadowNav.dissableInteractiveState();
        this.fSprites.meadowNav.setLocation(0, 70);
        this.fSprites.meadowNav.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.meadowNav.gotoFrame(1);
        this.fSprites.meadowNav.setAnimationFlag(false);
        this.fSprites.meadowNav.setAlpha(0.5);

        
        this.fSprites.pollenNav.setLocation(0, 500);
        this.fSprites.pollenNav.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.pollenNav.gotoFrame(1);
        this.fSprites.pollenNav.setAnimationFlag(false);
        this.fSprites.pollenNav.setAlpha(0.5);
        this.fSprites.pollenNav.dissableInteractiveState();
        

        this.fSprites.minIONNav.dissableInteractiveState();
        this.fSprites.minIONNav.setLocation(660, 500);
        this.fSprites.minIONNav.setAnimationFunction(Animation.halfAlphaPulse);
        this.fSprites.minIONNav.gotoFrame(1);
        this.fSprites.minIONNav.setAnimationFlag(false);
        this.fSprites.minIONNav.setAlpha(0.5);

        if(this.customState == 0){
            this.fSprites.meadowNav.enableInteractiveState();
            this.fSprites.meadowNav.gotoFrame(0);
            this.fSprites.meadowNav.setAnimationFlag(true);
            this.fSprites.meadowNav.setAlpha(1);
        }else if(this.customState == 1){
            this.fSprites.meadowNav.enableInteractiveState();
            this.fSprites.meadowNav.gotoFrame(0);
            this.fSprites.pollenNav.enableInteractiveState();
            this.fSprites.pollenNav.gotoFrame(0);
            this.fSprites.pollenNav.setAnimationFlag(true);
            this.fSprites.pollenNav.setAlpha(1);
        }else if(this.customState == 2){
            this.fSprites.meadowNav.enableInteractiveState();
            this.fSprites.pollenNav.enableInteractiveState();
            this.fSprites.minIONNav.enableInteractiveState();
            this.fSprites.meadowNav.gotoFrame(0);
            this.fSprites.pollenNav.gotoFrame(0);
            this.fSprites.minIONNav.gotoFrame(0);
            this.fSprites.minIONNav.setAnimationFlag(true);
            this.fSprites.minIONNav.setAlpha(1);
        }
        
        //For debugging purposes only - not to go in final v
        //this.fSprites.meadowNav.enableInteractiveState();
        //this.fSprites.pollenNav.enableInteractiveState();
        //this.fSprites.minIONNav.enableInteractiveState();


    
        this.fSprites.newspaper.bringBefore(this.fSprites.minIONNav);        
    }

    eventChainsDef(){
        this.entryEventChain
            .addSoundFade(this.foreground, this.soundManager, "soundtrack", 0.01, 0, 0.5)
            .addFade(this.foreground, 3, -0.1, 1)
            .addCustomAction(this.fSprites.playButton, "dissableInteractiveState")
            .next()
            .addChangeStateEvent(this.foreground, this, 2);
        this.entryEventChain.initialise();


        this.startEventChain
            .addPlaySoundEvent(this.foreground, this.soundManager, "soundtrack")
            .addFade(this.fSprites.newspaper, 3, 0, 1)
            .addFade(this.fSprites.playButton, 3, 0, 1)
            .next()
            .addClickEvent(this.fSprites.playButton)
            .next()
            .addPlaySoundEvent(this.foreground, this.soundManager, "speech-click")
            .addFade(this.fSprites.newspaper, -3, 0, 1)
            .addFade(this.fSprites.playButton, -3, 0, 1)
            .next()
            .addChangeStateEvent(this.foreground, this, 2);
        this.startEventChain.initialise();

        this.exitEventChain
            .addSoundFade(this.foreground, this.soundManager, "soundtrack", -0.01, 0, 1)
            .addFade(this.foreground, -3, 0, 1);
        this.exitEventChain.initialise();

    }

    navigateAction(item, customStateNum, stage){
        if(item.getClickedStateAndReset()){
            this.customState = customStateNum;
            this.exitEventChain.next().addChangeStageEvent(this.foreground, this, stage);
            this.exitEventChain.initialise();
            this.setState(3);
            this.soundManager.play("speech-click");
        }
    }



    //STATES    
    entry(delta, context){
        context.foreground.tick();
        context.entryEventChain.tick();
    }

    start(delta, context){
        context.foreground.tick();
        context.startEventChain.tick();
    }


    main(delta, context){   
        context.navigateAction(context.fSprites.meadowNav, 1, "meadow");
        //if(this.customState == 0){context.pulseAnimation(context.fSprites.meadowNav);}
        //}else{context.hoverAnimation(context.fSprites.meadowNav);}

        context.navigateAction(context.fSprites.pollenNav, 2, "pollen");
       // if(this.customState == 1){context.pulseAnimation(context.fSprites.pollenNav);}
       // }else{context.hoverAnimation(context.fSprites.pollenNav);}

        context.navigateAction(context.fSprites.minIONNav, 2, "minION");
        //if(this.customState == 2){context.pulseAnimation(context.fSprites.minIONNav);}
       // }else{context.hoverAnimation(context.fSprites.minIONNav);}


        context.fSprites.meadowNav.tick();
        context.fSprites.pollenNav.tick();
        context.fSprites.minIONNav.tick();

        context.foreground.tick();        
    }

    exit(delta, context){
        context.foreground.tick();
        context.exitEventChain.tick();


    }


    


    
}