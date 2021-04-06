import {Stage} from '/beetrail/stages/stage.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement} from '/beetrail/movementMisc.js';


export class HubStage extends Stage{
    startEventChain;
    entryEventChain;
    mainEventChain;
    exitEventChain;

    animationTick;

    customState;    //increases on completion of stage.
    textures;

    constructor(app, stageManager){
        super(app, stageManager);
        
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
        
            "assets/fSprites/buttons/meadowNav.fw.png",
            "assets/fSprites/buttons/meadowNav_L.fw.png",
            "assets/fSprites/buttons/minIONNav.fw.png",
            "assets/fSprites/buttons/minIONNav_L.fw.png",
            "assets/fSprites/buttons/pollenNav.fw.png",
            "assets/fSprites/buttons/pollenNav_L.fw.png",
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
        this.eventChainsDef();

        this.state = this.states[1];
    }


    loadSprites(resources){
        //this.bSprites.foregroundMeadow = new SpriteItem("assets/bSprites/Artboard 1meadow-foreground.png", loader);
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
            "assets/fSprites/buttons/meadowNav.fw.png",
            "assets/fSprites/buttons/meadowNav_L.fw.png"
        ], resources);
        this.fSprites.pollenNav = new AnimatedItem([
            "assets/fSprites/buttons/pollenNav.fw.png",
            "assets/fSprites/buttons/pollenNav_L.fw.png"
        ], resources);
        this.fSprites.minIONNav = new AnimatedItem([
            "assets/fSprites/buttons/minIONNav.fw.png",
            "assets/fSprites/buttons/minIONNav_L.fw.png"
        ], resources);

        this.fSprites.playButton = new AnimatedItem([
            "assets/fSprites/buttons/static-play-button-click.png",
            "assets/fSprites/buttons/play-button-hover.png"
        ], resources);
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

        this.fSprites.playButton.setScale(0.2);
        this.fSprites.playButton.centerPivot();//?????????????????????
        this.fSprites.playButton.setLocation(1000, 880);
        this.fSprites.playButton.enableInteractiveState();
        this.fSprites.playButton.enableMouseHoverFrame(1);
        this.fSprites.playButton.setAlpha(0);

        this.fSprites.meadowNav.enableInteractiveState();
        this.fSprites.meadowNav.setAlpha(0.18);
        this.fSprites.meadowNav.setLocation(0, 70);

        this.fSprites.pollenNav.enableInteractiveState();
        this.fSprites.pollenNav.setAlpha(0.2);
        this.fSprites.pollenNav.setLocation(0, 500);
        if(this.customState >= 1){
            this.fSprites.pollenNav.gotoFrame(0);
        }else{
            this.fSprites.pollenNav.gotoFrame(1);
        }
        

        this.fSprites.minIONNav.enableInteractiveState();
        this.fSprites.minIONNav.setAlpha(0.2);
        this.fSprites.minIONNav.setLocation(660, 500);
        if(this.customState >= 2){
            this.fSprites.minIONNav.gotoFrame(0);
        }else{
            this.fSprites.minIONNav.gotoFrame(1);
        }
        
        
        this.fSprites.newspaper.bringBefore(this.fSprites.minIONNav);
        
    }

    eventChainsDef(){
        this.startEventChain
            .addFade(this.fSprites.newspaper, 3, 0, 1)
            .addFade(this.fSprites.playButton, 3, 0, 1)
            .next()
            .addClickEvent(this.fSprites.playButton)
            .next()
            .addFade(this.fSprites.newspaper, -3, 0, 1)
            .addFade(this.fSprites.playButton, -3, 0, 1)
            .next()
            .addChangeStateEvent(this.fSprites.playButton, this, 2);
        this.startEventChain.initialise();

        this.entryEventChain
            .addFade(this.foreground, 3, -0.1, 1)
            .next()
            .addChangeStateEvent(this.foreground, this, 2);
        this.entryEventChain.initialise();

        this.exitEventChain
            .addFade(this.foreground, -3, 0, 1);
        this.exitEventChain.initialise();

    }

    navigateAction(item, customStateNum, stage){
        if(item.getClickedState()){
            if(this.customState == customStateNum-1){this.customState = customStateNum;}
            this.exitEventChain.next().addChangeStageEvent(this.foreground, this, stage);
            this.exitEventChain.initialise();
            this.setState(3);
            item.resetClickedState();
        }
    }
    hoverAnimation(item){
        if(item.onMouseHover()){
            item.setFadeAnimation(0.19, 1, 0.05);
        }else{
            item.setFadeAnimation(0.2, 1, -0.05);
        }
    }

    pulseAnimation(item){
        if(this.animationTick == 0){
            item.setFadeAnimation(0, 1, 0.005);
        }else if(this.animationTick == 150){
            item.setFadeAnimation(0, 1, -0.005);
        }
        this.animationTick++;
        if(this.animationTick == 300){
            this.animationTick = 0;
        }
    }


    loop(delta, context){
        context.state(delta, context);
    }
    


    //STATES
    start(delta, context){
        context.foreground.tick();
        context.startEventChain.tick();
    }

    entry(delta, context){
        context.foreground.tick();
        context.entryEventChain.tick();
    }

    main(delta, context){   
        context.navigateAction(context.fSprites.meadowNav, 1, "meadow");
        if(this.customState == 0){context.pulseAnimation(context.fSprites.meadowNav);
        }else{context.hoverAnimation(context.fSprites.meadowNav);}

        context.navigateAction(context.fSprites.pollenNav, 2, "pollen");
        if(this.customState == 1){context.pulseAnimation(context.fSprites.pollenNav);
        }else{context.hoverAnimation(context.fSprites.pollenNav);}

        context.navigateAction(context.fSprites.minIONNav, 3, "minION");
        if(this.customState == 1){context.pulseAnimation(context.fSprites.minIONNav);
        }else{context.hoverAnimation(context.fSprites.minIONNav);}


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