import {Foreground} from '/beetrail/foregroundContainer.js'
import {soundManager} from '/beetrail/soundManager.js'

export class Stage{
    assetsTextures;
    app;
    fSprites;
    states;
    state;
    manager;

    constructor(app, manager){
        this.assetsTextures = [];
        this.app = app;
        this.fSprites = {};
        this.states = [];
        this.state;

        this.foreground = new Foreground();
        this.foreground.tick();

        this.soundManager = new soundManager();

        this.stageManager = manager;
    }

    getForeground(){
        return this.foreground;
    }

    setState(stateNum){
        this.state = this.states[stateNum];
    }

    changeStage(stage){
        this.stageManager.changeStage(stage);
    }


    destroyAllItems(){
        for(let singleSprite in this.bSprites){
            console.log(singleSprite);
            this.bSprites[singleSprite].getSprite().destroy();
        }
        this.bSprites = {}

        for(let singleSprite in this.fSprites){
            this.fSprites[singleSprite].getSprite().destroy();
        }
        this.fSprites = {}
    }

    /* Abstract Methods to be Overwritten by Child Game Stages */
    setup(){
        throw new Error("You need to override method: setup");
    }
    loadSprites(){
        throw new Error("You need to override method: loadSprites");
    }
    miscAssetCreation(){
        throw new Error("You need to override method: assetCreation");
    }
    containerAssignment(){
        throw new Error("You need to override method: containerAssignment");
    }
    assetPositioning(){
        throw new Error("You need to override method: assetPositioning");
    }
    eventChainsDef(){
        throw new Error("You need to override method: eventChainsDef");
    }

    
}