import {Stage} from '/beetrail/stages/stage.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement} from '/beetrail/movementMisc.js';


export class HubStage extends Stage{
    startEventChain;
    mainEventChain;
    loader;
    textures;

    constructor(app, stageManager){
        super(app, stageManager);
        
        this.states = [this.start, this.main];
        this.state = this.start;
        
        this.startEventChain = new EventChain();
        this.mainEventChain = new EventChain();
        this.loader = new PIXI.Loader();
    }

    play(){
        this.textures = [
            "assets/bSprites/Artboard 1grass-background.png",
            "assets/bSprites/Artboard 1grass-foreground.png",
            "assets/bSprites/Artboard 1grass-middleground.png",
            "assets/bSprites/Artboard 1meadow-foreground.png",
        
            "assets/fSprites/backgrounds/background3.fw.png",
            "assets/fSprites/backgrounds/background2.fw.png",
            "assets/fSprites/backgrounds/background1.fw.png",
        
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

        this.loader.add(this.textures);
        this.loader.load((loader, resources) => {
            this.loadSprites();            
            this.miscAssetCreation();
        });

        this.loader.onComplete.add(() => {
            this.containerAssignment();
            this.assetPositioning();
            this.app.stage.addChild(this.foreground.getSprite());
            this.eventChainsDef();
            this.app.ticker.add(this.loop, this);
        });
    }


    stop(){
        this.app.ticker.remove(this.loop, this);
        this.loader.destroy();
    }



    loadSprites(){
        this.bSprites.background1 = new SpriteItem("assets/bSprites/Artboard 1grass-background.png", this.loader);
        this.bSprites.background2 = new SpriteItem("assets/bSprites/Artboard 1grass-middleground.png", this.loader);
        this.bSprites.background3 = new SpriteItem("assets/bSprites/Artboard 1grass-foreground.png", this.loader);
        this.bSprites.foregroundMeadow = new SpriteItem("assets/bSprites/Artboard 1meadow-foreground.png", this.loader);
        //---------------------------
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png", this.loader);
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png", this.loader);
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png", this.loader);
        //---------------------------
        this.fSprites.bench = new SpriteItem("assets/fSprites/objects/bench.png", this.loader);
        this.fSprites.laptop = new SpriteItem("assets/fSprites/objects/laptop.png", this.loader);
        this.fSprites.minION = new SpriteItem("assets/fSprites/objects/minion-cable.png", this.loader);
        this.fSprites.newspaper = new SpriteItem("assets/fSprites/objects/Artboard 1newspaper-front-cover.png", this.loader);
        //---------------------------
        
        this.fSprites.meadowNav = new AnimatedItem([
            "assets/fSprites/buttons/meadowNav.fw.png",
            "assets/fSprites/buttons/meadowNav_L.fw.png"
        ], this.loader);
        this.fSprites.pollenNav = new AnimatedItem([
            "assets/fSprites/buttons/pollenNav.fw.png",
            "assets/fSprites/buttons/pollenNav_L.fw.png"
        ], this.loader);
        this.fSprites.minIONNav = new AnimatedItem([
            "assets/fSprites/buttons/minIONNav.fw.png",
            "assets/fSprites/buttons/minIONNav_L.fw.png"
        ], this.loader);

        this.fSprites.playButton = new AnimatedItem([
            "assets/fSprites/buttons/static-play-button-click.png",
            "assets/fSprites/buttons/play-button-hover.png"
        ], this.loader);
    }


    miscAssetCreation(){
        let backColour = new PIXI.Graphics()
            .beginFill(0xE8E8E8)
            .drawRect(0, 0, this.bSprites.background1.getSprite().width, window.innerHeight)
            .endFill();
        this.bSprites.backgroundCol = new ShapeItem(backColour, false);
    }

    containerAssignment(){
        this.app.stage.addChild(this.bSprites.backgroundCol.getSprite());
        this.app.stage.addChild(this.bSprites.background1.getSprite());
        this.app.stage.addChild(this.bSprites.background2.getSprite());
        this.app.stage.addChild(this.bSprites.background3.getSprite());
        
        this.foreground.addAllSprites(this.fSprites);
    }

    assetPositioning(){
        this.fSprites.background3.setSize(1280, 960);
        this.fSprites.background2.setSize(1280, 960);
        this.fSprites.background1.setSize(1280, 960);
        
        this.fSprites.newspaper.setSize(1280, 960);
        this.fSprites.newspaper.setAlpha(0.5);

        this.fSprites.bench.setScale(1280/2639);
        this.fSprites.bench.setLocation(0, 686);

        this.fSprites.laptop.setScale(0.5);
        this.fSprites.laptop.setLocation(700, 550);
        this.fSprites.minION.setScale(0.4);
        this.fSprites.minION.setLocation(750, 750);

        this.fSprites.playButton.setScale(0.2);
        this.fSprites.playButton.centerPivot();
        this.fSprites.playButton.setLocation(1000, 880);
        this.fSprites.playButton.enableInteractiveState();
        this.fSprites.playButton.enableMouseHoverFrame(1);
        this.fSprites.playButton.setAlpha(0);

        this.fSprites.meadowNav.enableInteractiveState();
        this.fSprites.meadowNav.setAlpha(1);
        this.fSprites.meadowNav.centerPivot();
        this.fSprites.meadowNav.setLocation(650, 300);

        this.fSprites.pollenNav.enableInteractiveState();
        this.fSprites.pollenNav.setAlpha(1);
        this.fSprites.pollenNav.centerPivot();
        this.fSprites.pollenNav.setLocation(320, 720);
        this.fSprites.pollenNav.gotoFrame(1);

        this.fSprites.minIONNav.enableInteractiveState();
        this.fSprites.minIONNav.setAlpha(1);
        this.fSprites.minIONNav.centerPivot();
        this.fSprites.minIONNav.setLocation(975, 720);
        this.fSprites.minIONNav.gotoFrame(1);
        
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
            .addChangeStateEvent(this.fSprites.playButton, this, 1);

        this.mainEventChain
            .addFade(this.fSprites.meadowNav, 1, 0, 0.8);

        this.startEventChain.initialise();
        this.mainEventChain.initialise();
    }

    loop(delta){
        this.state(delta);
    }
    


    //STATES
    start(delta){
        this.centerAndScaleSprites(this.bSprites);
        this.foreground.tick();
        this.startEventChain.tick();
    }

    main(delta){
        this.centerAndScaleSprites(this.bSprites);
        

        if(this.fSprites.meadowNav.onMouseHover()){
            this.changeStage("meadow");
            this.fSprites.meadowNav.setFadeAnimation(0.2, 1, 0.05);
        }else{
            console.log()
            this.fSprites.meadowNav.setFadeAnimation(0.2, 1, -0.05);
        }    
        if(this.fSprites.pollenNav.onMouseHover()){
            this.fSprites.pollenNav.setFadeAnimation(0.2, 1, 0.05);
        }else{
            this.fSprites.pollenNav.setFadeAnimation(0.2, 1, -0.05);
        }
        
        if(this.fSprites.minIONNav.onMouseHover()){
            this.fSprites.minIONNav.setFadeAnimation(0.2, 1, 0.05);
        }else{
            this.fSprites.minIONNav.setFadeAnimation(0.2, 1, -0.05);
        }

        this.fSprites.meadowNav.tick();
        this.fSprites.pollenNav.tick();
        this.fSprites.minIONNav.tick();

        this.foreground.tick();
        this.mainEventChain.tick();
    }

    end(delta){

    }


    


    
}