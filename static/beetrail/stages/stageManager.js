import {HubStage} from '/beetrail/stages/hub.js';
import {MeadowStage} from '/beetrail/stages/meadow.js';
import {PollenStage} from '/beetrail/stages/pollen.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import {Foreground} from '/beetrail/foregroundContainer.js'


export class StageManager{
    #stages;
    #stage;
    assetTextures;
    app;
    loader;
    bSprites;

    constructor(app){
        this.stages = {
            "hub":new HubStage(app, this),
            "meadow":new MeadowStage(app, this),            
            "pollen":new PollenStage(app, this)
        };
        this.stage = "hub";
        this.app = app;

        this.loader = new PIXI.Loader();
        this.bSprites = {};
        this.test;
        this.testContainer;
        this.init();
    }



    init(){
        //add textures to resource loader.
        let textures = this._collateTextures();
        textures.add(this.getBackgroundAssets()); //add background textures
        let assets = Array.from(textures);
        this.loader.add(assets);


        //create assets for each stage.
        this.loader.load((loader, resources) => {
            this.createBSprites(resources); //create background sprites        

            for(let s in this.stages){
                this.stages[s].createAssets(resources);
                this.stages[s].assetPositioning();
                this.stages[s].eventChainsDef();
            }
        });


        this.loader.onProgress.add(() => {
        //    console.log(this.loader.progress);
        })

        //init first stage...
        this.loader.onComplete.add(() => {
            this.addToApp();    //add background assets to container.
            this.app.stage.addChild(this.stages[this.stage].foreground);
            
            this.app.ticker.add(this.loop, this);
        });
    }


    loop(){
        this.centerAndScaleSprites(this.bSprites);
        this.stages[this.stage].state(0, this.stages[this.stage]);
    }







   //---------------- Background Sprite Management ---------------//
    getBackgroundAssets(){
        return [
            "assets/bSprites/merged_background.fw.png",
            "assets/bSprites/Artboard 1sky-background.png"
        ];
    }
    centerAndScaleSprites(sprites){
        for(let singleSprite in sprites){
            this.bSprites[singleSprite].centerX();
            this.bSprites[singleSprite].scaleByHeight(window.innerHeight);
        }
    }
    createBSprites(resources){
        this.bSprites.mBackground = new SpriteItem("assets/bSprites/merged_background.fw.png", resources);
        this.bSprites.skyBackground = new SpriteItem("assets/bSprites/Artboard 1sky-background.png", resources);
        
        let backColour = new PIXI.Graphics()
            .beginFill(0xFFFFFF)
            .drawRect(0, 0, this.bSprites.mBackground.getSprite().width, window.innerHeight)
            .endFill();
        this.bSprites.backgroundCol = new ShapeItem(backColour, false);

    }
    addToApp(){
        this.app.stage.addChild(this.bSprites.backgroundCol.getSprite());
        this.app.stage.addChild(this.bSprites.skyBackground.getSprite());
        this.app.stage.addChild(this.bSprites.mBackground.getSprite());
    }
    //----------------------------------------------------------//





    _collateTextures(){
        let textures = new Set();
        let _t;
        for(let s in this.stages){
            _t = this.stages[s].getTextures();
            for(let i=0; i<_t.length; i++){
                textures.add(_t[i]);
            }
        }
        console.log(textures);
        return textures;
    }




    changeStage(newStage){
        this.stages[this.stage].stop();
        this.app.stage.removeChild(this.stages[this.stage].foreground);
        
        this.stage = newStage;
        this.stages[this.stage].assetPositioning();
        this.stages[this.stage].eventChainsDef();
        this.app.stage.addChild(this.stages[this.stage].foreground);
        
    }

    start(){
       // this.stages[this.stage].play();
    }




}