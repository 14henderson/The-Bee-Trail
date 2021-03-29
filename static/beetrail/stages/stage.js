import {Foreground} from '/beetrail/foregroundContainer.js'

export class Stage {
    assetsTextures;
    app;
    fSprites;
    bSprites;
    states;
    state;

    constructor(app){
        this.assetsTextures = [];
        this.app = app;
        this.fSprites = {}
        this.bSprites = {}
        this.states = [];
        this.state;

        this.foreground = new Foreground();
        this.foreground.tick();
    }


    centerAndScaleSprites(sprites){
        for(let singleSprite in sprites){
            this.bSprites[singleSprite].centerX();
            this.bSprites[singleSprite].scaleByHeight(window.innerHeight);
        }
    }

    setState(stateNum){
        this.state = this.states[stateNum];
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