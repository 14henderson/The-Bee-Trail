import {Stage} from '/beetrail/stages/stage.js';
import {Item} from '/beetrail/item/item.js';
import {Foreground} from '/beetrail/foregroundContainer.js'


export class Hub{
    constructor(app){
        this.assetsTextures = [];
        this.assets = {}
        this.sprites = {}
        this.setup(app);
        this.states = [this.start, this.main, this.end];
        this.state = this.start;
        this.app = app;
    }

    setup(){
        this.assetsTextures = ["assets/bee_test.png",
                                "assets/backgrounds/hub.png"];
        PIXI.loader.add(this.assetsTextures).load((loader, resources) => {
            this.sprites.background = new Item("assets/backgrounds/hub.png", true);
            this.sprites.background.setAbsoluteFlag('y', true);
            this.app.stage.addChild(this.sprites.background.getSprite());
            
            this.foreground = new Foreground();
            this.app.stage.addChild(this.foreground.getSprite());

            this.assetCreation();
            this.assetPositioning();
            this.app.ticker.add(delta => this.loop(delta));
        });        
    }

    assetCreation(){
        let hoverBox1 = new PIXI.Graphics()
            .lineStyle(2, 0xBABABA, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, 900, (window.innerHeight/2)-40, 10)
            .endFill();
        this.sprites.meadowNav = new Item(hoverBox1, false);

        let hoverBox2 = new PIXI.Graphics()
            .lineStyle(2, 0xBABABA, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, (window.innerWidth/2)-30, (window.innerHeight/2)-40, 10)
            .endFill();
        this.sprites.PollenNav = new Item(hoverBox2, false);

        let hoverBox3 = new PIXI.Graphics()
            .lineStyle(2, 0xBABABA, 1)
            .beginFill(0xE8E8E8)
            .drawRoundedRect(0, 0, (window.innerWidth/2)-30, (window.innerHeight/2)-40, 10)
            .endFill();
        this.sprites.meadowNav.setAbsoluteFlag('y', true);
        this.sprites.minIONNav = new Item(hoverBox3, false);


        this.sprites.bee = new Item("assets/bee_test.png", true);
        this.foreground.addChild(this.sprites.meadowNav.getSprite());
        this.foreground.addChild(this.sprites.PollenNav.getSprite());
        this.foreground.addChild(this.sprites.minIONNav.getSprite());
    }
    assetPositioning(){
        this.sprites.background.scaleByHeight(window.innerHeight);
        this.sprites.meadowNav.getSprite().position.set(20, 20);
        this.sprites.meadowNav.getSprite().alpha = 0.2;
        this.sprites.PollenNav.getSprite().position.set(20, (window.innerHeight/2));
        this.sprites.PollenNav.getSprite().alpha = 0.2;
        this.sprites.minIONNav.getSprite().position.set((window.innerWidth/2)+10, (window.innerHeight/2));
        this.sprites.minIONNav.getSprite().alpha = 0.2;
        this.sprites.bee.setLocation(0, 0); 
    }



    loop(delta){
        this.state(delta);
    }
    


    //STATES
    start(delta){
        if(!document.hasFocus()){
            this.app.ticker.stop();
            console.log("Lot focus");
        }



        if(this.sprites.meadowNav.onMouseHover(this.app)){
            this.sprites.meadowNav.setFadeAnimation(0.2, 0.8, -0.05);
        }else{
            this.sprites.meadowNav.setFadeAnimation(0.2, 0.8, 0.05);
        }

        if(this.sprites.PollenNav.onMouseHover(this.app)){
            this.sprites.PollenNav.setFadeAnimation(0.2, 0.8, -0.05);
        }else{
            this.sprites.PollenNav.setFadeAnimation(0.2, 0.8, 0.05);
        }

        if(this.sprites.minIONNav.onMouseHover(this.app)){
            this.sprites.minIONNav.setFadeAnimation(0.2, 0.8, -0.05);
        }else{
            this.sprites.minIONNav.setFadeAnimation(0.2, 0.8, 0.05);
        }


        this.sprites.meadowNav.tick();
        this.sprites.PollenNav.tick();
        this.sprites.minIONNav.tick();
        this.sprites.bee.tick();
        this.sprites.background.centerX();
        this.sprites.background.scaleByHeight(window.innerHeight);
        this.sprites.background.tick();
        this.foreground.tick();
        //console.log(this.sprites.bee.getX(), this.sprites.bee.getY());
    }

    main(delta){

    }

    end(delta){

    }


    


    
}