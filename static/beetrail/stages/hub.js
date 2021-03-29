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
        
        this.eventChain = new EventChain();
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

                                "assets/fSprites/objects/Artboard 1newspaper-front-cover.png"
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
    }

    miscAssetCreation(){
        let hoverBox1 = new PIXI.Graphics()
            .lineStyle(2, 0xBABABA, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, 900, (window.innerHeight/2)-40, 10)
            .endFill();
        //this.fSprites.meadowNav = new ShapeItem(hoverBox1);

        let hoverBox2 = new PIXI.Graphics()
            .lineStyle(2, 0xBABABA, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, (window.innerWidth/2)-30, (window.innerHeight/2)-40, 10)
            .endFill();
       // this.fSprites.PollenNav = new ShapeItem(hoverBox2);

        let hoverBox3 = new PIXI.Graphics()
            .lineStyle(2, 0xBABABA, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, (window.innerWidth/2)-30, (window.innerHeight/2)-40, 10)
            .endFill();
      //  this.fSprites.minIONNav = new ShapeItem(hoverBox3);

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
        this.fSprites.bench.setLocation(0, 576);

        this.fSprites.laptop.setScale(0.5);
        this.fSprites.laptop.setLocation(650, 400);
        this.fSprites.minION.setScale(0.4);
        this.fSprites.minION.setLocation(700, 600);
        //this.fSprites.bench.centerX();

        //this.sprites.background.scaleByHeight(window.innerHeight);
        //this.sprites.meadowNav.getSprite().position.set(20, 20);
        //this.sprites.meadowNav.getSprite().alpha = 0.2;
       // this.sprites.PollenNav.getSprite().position.set(20, (window.innerHeight/2));
        //this.sprites.PollenNav.getSprite().alpha = 0.2;
        //this.sprites.minIONNav.getSprite().position.set((window.innerWidth/2)+10, (window.innerHeight/2));
        //this.sprites.minIONNav.getSprite().alpha = 0.2;
        //this.sprites.bee.setLocation(0, 0); 
    }

    eventChainsDef(){
        this.eventChain
            .addFade(this.fSprites.newspaper, 3, 0, 1);

            
        this.eventChain.initialise();
    }

    loop(delta){
        this.state(delta);
    }
    


    //STATES
    start(delta){
        this.centerAndScaleSprites(this.bSprites);
        this.foreground.tick();
        this.eventChain.tick();

    }

    main(delta){
        this.centerAndScaleSprites(this.bSprites);
        

       /* if(this.fSprites.meadowNav.onMouseHover(this.app)){
            this.fSprites.meadowNav.setFadeAnimation(0.2, 0.8, -0.05);
        }else{
            this.fSprites.meadowNav.setFadeAnimation(0.2, 0.8, 0.05);
        }

        if(this.fSprites.PollenNav.onMouseHover(this.app)){
            this.fSprites.PollenNav.setFadeAnimation(0.2, 0.8, -0.05);
        }else{
            this.fSprites.PollenNav.setFadeAnimation(0.2, 0.8, 0.05);
        }

        if(this.fSprites.minIONNav.onMouseHover(this.app)){
            this.fSprites.minIONNav.setFadeAnimation(0.2, 0.8, -0.05);
        }else{
            this.fSprites.minIONNav.setFadeAnimation(0.2, 0.8, 0.05);
        }*/


        //this.fSprites.meadowNav.tick();
       // this.fSprites.PollenNav.tick();
        //this.fSprites.minIONNav.tick();


        this.foreground.tick();
    }

    end(delta){

    }


    


    
}