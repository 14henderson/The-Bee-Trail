import {HubStage} from '/beetrail/stages/hub.js';
import {MinIONStage} from '/beetrail/stages/minION.js';
import {MeadowStage} from '/beetrail/stages/meadow.js';
import {PollenStage} from '/beetrail/stages/pollen.js';
import {SpriteItem} from '/beetrail/item/spriteItem.js';
import {ShapeItem} from '/beetrail/item/shapeItem.js';
import {Foreground} from '/beetrail/foregroundContainer.js';
import {SoundManager} from '/beetrail/soundManager.js'


export class StageManager{
    #stages;
    #stage;
    assetTextures;
    app;
    loader;
    bSprites;
    errorText;
    fpsErrorText;
    FPSTooLowTicker;
    fpsErrorFlag;
    soundManager;

    constructor(app){
        this.soundManager = new SoundManager();

        this.stages = {
            "hub":new HubStage(app, this, this.soundManager),
            "meadow":new MeadowStage(app, this, this.soundManager),            
            "pollen":new PollenStage(app, this, this.soundManager),
            "minION":new MinIONStage(app, this, this.soundManager)
        };
        this.stage = "hub";
        this.app = app;
        this.app.stage.sortableChildren = true;

        this.loader = new PIXI.Loader();
        this.bSprites = {};
        this.test;
        this.testContainer;
        this.FPSTooLowTicker = 0;
        this.fpsErrorFlag = false;
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
            this.app.ticker.maxFPS = 60;
            //this.app.ticker.minFPS = 60;
            this.app.ticker.add(this.loop, this);
        });
    }


    loop(){
        this.app.renderer.resize(window.innerWidth, window.innerHeight);    //resizing here instead of main.js stops flickering? Unsure about stability.
        this.centerAndScaleSprites(this.bSprites);

        if(!this.fpsErrorFlag){
            
            this.stages[this.stage].state(0, this.stages[this.stage]);
            this.addPauseScreen();
            this.FPSCheck(this.app.ticker.FPS);
        }else{
            this.addFPSErrorScreen();
        }
        
        
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
            .drawRect(0, 0, this.bSprites.mBackground.getSprite().width, this.bSprites.mBackground.getSprite().height)
            .endFill();
        this.bSprites.backgroundCol = new ShapeItem(backColour, false);

        let pausedColour = new PIXI.Graphics()
            .beginFill(0x3b3b3b)
            .drawRect(0, 0, 10, 10)
            .endFill();
        this.bSprites.pauseScreen = new ShapeItem(pausedColour, false);
        this.bSprites.pauseScreen.setAlpha(0);
        let errorText = new PIXI.Text("Screen size is too small. If on mobile \n view this page in landscape mode.", {fontFamily : 'Arial', fontSize: 30, fill : 0xffffff,  align : 'center'});
        this.errorText = new ShapeItem(errorText, false);
        this.errorText.alpha = 0;

        let fpsErrorText = new PIXI.Text("Minimum browser requirements not met. \nConsider enabling hardware acceleration or \nswitching to a different browser.", {fontFamily : 'Arial', fontSize: 30, fill : 0xffffff,  align : 'center'});
        this.fpsErrorText = new ShapeItem(fpsErrorText, false);
        this.fpsErrorText.setAlpha(0);
    }
    addToApp(){
        this.app.stage.addChild(this.bSprites.backgroundCol.getSprite());
        this.app.stage.addChild(this.bSprites.skyBackground.getSprite());
        this.app.stage.addChild(this.bSprites.mBackground.getSprite());
        this.app.stage.addChild(this.bSprites.pauseScreen.getSprite());
        this.app.stage.addChild(this.errorText.getSprite());
        this.app.stage.addChild(this.fpsErrorText.getSprite());
    }
    addPauseScreen(){
        if(window.innerWidth < (4/3)*window.innerHeight){
            this.bSprites.pauseScreen.setSize(window.innerWidth, window.innerHeight);
            this.bSprites.pauseScreen.setAlpha(1);
            this.errorText.setAlpha(1);
            this.bSprites.pauseScreen.sprite.zIndex = 100;
            this.errorText.sprite.zIndex = 101;
            this.errorText.setLocation(
                (window.innerWidth/2)-(this.errorText.getSize()[0]/2),
                (window.innerHeight/2)-100
            );
        }else{
            this.bSprites.pauseScreen.setAlpha(0);
            this.errorText.setAlpha(0);
            this.bSprites.pauseScreen.sprite.zIndex = 0;
            this.errorText.sprite.zIndex = 0;
        }
    }
    addFPSErrorScreen(){
        if(this.fpsErrorFlag){
            this.bSprites.pauseScreen.setSize(window.innerWidth, window.innerHeight);
            this.bSprites.pauseScreen.setAlpha(1);
            this.fpsErrorText.setAlpha(1);
            this.bSprites.pauseScreen.sprite.zIndex = 100;
            this.fpsErrorText.sprite.zIndex = 101;
            this.fpsErrorText.setLocation(
                (window.innerWidth/2)-(this.fpsErrorText.getSize()[0]/2),
                (window.innerHeight/2)-100
            );
        }
    }
    //----------------------------------------------------------//



    FPSCheck(currFPS){
        if(currFPS < 30){
            this.FPSTooLowTicker++;
        }else{
            this.FPSTooLowTicker = 0;
        }
        if(this.FPSTooLowTicker > 20){
            this.fpsErrorFlag = true;
        }
    }

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
        this.stages[this.stage].stop();
        this.stages[this.stage].assetPositioning();
        this.stages[this.stage].eventChainsDef();
        this.app.stage.addChild(this.stages[this.stage].foreground);
        
    }

    start(){
       // this.stages[this.stage].play();
    }




}