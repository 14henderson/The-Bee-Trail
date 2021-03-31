import {Stage} from '/beetrail/stages/stage.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import { AnimatedItem } from '/beetrail/item/animatedItem.js';

import {EventChain} from '/beetrail/eventChain.js';
import {Movement} from '/beetrail/movementMisc.js';


export class Hub extends Stage{
    constructor(app){
        super(app);
        this.setup(app);
        
        this.states = [this.start, this.main];
        this.state = this.start;
        
        this.startEventChain = new EventChain();
        this.mainEventChain = new EventChain();
    }

    setup(){
        this.assetsTextures = ["assets/bSprites/Artboard 1grass-background.png",
                                "assets/bSprites/Artboard 1grass-foreground.png",
                                "assets/bSprites/Artboard 1grass-middleground.png",
                                "assets/bSprites/Artboard 1meadow-foreground.png",

                                "assets/fSprites/objects/bench.png",
                                "assets/fSprites/objects/laptop.png",
                                "assets/fSprites/objects/minion-cable.png",

                                "assets/fSprites/backgrounds/background3.fw.png",
                                "assets/fSprites/backgrounds/background2.fw.png",
                                "assets/fSprites/backgrounds/background1.fw.png",

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


        PIXI.loader.add(this.assetsTextures).load((loader, resources) => {
            this.loadSprites();            
            this.miscAssetCreation();
            this.containerAssignment();
            this.assetPositioning();
            this.eventChainsDef();
            
            this.app.stage.addChild(this.foreground.getSprite());
            //this.app.stage.addChild(this.bSprites.foregroundMeadow.getSprite());
            this.app.ticker.add(delta => this.loop(delta));
        });        
    }
    loadSprites(){
        this.bSprites.background1 = new SpriteItem("assets/bSprites/Artboard 1grass-background.png");
        this.bSprites.background2 = new SpriteItem("assets/bSprites/Artboard 1grass-middleground.png");
        this.bSprites.background3 = new SpriteItem("assets/bSprites/Artboard 1grass-foreground.png");
        this.bSprites.foregroundMeadow = new SpriteItem("assets/bSprites/Artboard 1meadow-foreground.png");
        //---------------------------
        this.fSprites.background3 = new SpriteItem("assets/fSprites/backgrounds/background3.fw.png");
        this.fSprites.background2 = new SpriteItem("assets/fSprites/backgrounds/background2.fw.png");
        this.fSprites.background1 = new SpriteItem("assets/fSprites/backgrounds/background1.fw.png");
        //---------------------------
        this.fSprites.bench = new SpriteItem("assets/fSprites/objects/bench.png");
        this.fSprites.laptop = new SpriteItem("assets/fSprites/objects/laptop.png");
        this.fSprites.minION = new SpriteItem("assets/fSprites/objects/minion-cable.png");
        this.fSprites.newspaper = new SpriteItem("assets/fSprites/objects/Artboard 1newspaper-front-cover.png");
        //---------------------------
        this.fSprites.meadowNav = new AnimatedItem([
            "assets/fSprites/buttons/meadowNav.fw.png",
            "assets/fSprites/buttons/meadowNav_L.fw.png"
        ]);
        this.fSprites.pollenNav = new AnimatedItem([
            "assets/fSprites/buttons/pollenNav.fw.png",
            "assets/fSprites/buttons/pollenNav_L.fw.png"
        ]);
        this.fSprites.minIONNav = new AnimatedItem([
            "assets/fSprites/buttons/minIONNav.fw.png",
            "assets/fSprites/buttons/minIONNav_L.fw.png"
        ]);






        this.fSprites.playButton = new AnimatedItem([
            "assets/fSprites/buttons/static-play-button-click.png",
            "assets/fSprites/buttons/play-button-hover.png"
        ])
    }

    miscAssetCreation(){
        let hoverBox1 = new PIXI.Graphics()
            .lineStyle(2, 0xffd026, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, 1279, 400, 10)
            .endFill();
        //this.fSprites.meadowNav = new ShapeItem(hoverBox1);

        let hoverBox2 = new PIXI.Graphics()
            .lineStyle(2, 0xffd026, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, (window.innerWidth/2)-30, (window.innerHeight/2)-40, 10)
            .endFill();
        //this.fSprites.pollenNav = new ShapeItem(hoverBox2);

        let hoverBox3 = new PIXI.Graphics()
            .lineStyle(2, 0xffd026, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, (window.innerWidth/2)-30, (window.innerHeight/2)-40, 10)
            .endFill();
        //this.fSprites.minIONNav = new ShapeItem(hoverBox3);

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
        this.fSprites.newspaper.setAlpha(0);

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
        this.fSprites.meadowNav.setAlpha(0.2);
        this.fSprites.meadowNav.centerPivot();
        this.fSprites.meadowNav.setLocation(650, 300);
        

        this.fSprites.pollenNav.enableInteractiveState();
        this.fSprites.pollenNav.setAlpha(0.2);
        this.fSprites.pollenNav.centerPivot();
        this.fSprites.pollenNav.setLocation(320, 720);
        this.fSprites.pollenNav.gotoFrame(1);
        

        this.fSprites.minIONNav.enableInteractiveState();
        this.fSprites.minIONNav.setAlpha(0.2);
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
        
        if(this.fSprites.meadowNav.getClickedState()){
            this.changeStage("meadow");
        }
        if(this.fSprites.meadowNav.onMouseHover()){
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