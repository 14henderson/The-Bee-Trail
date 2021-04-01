import {HubStage} from '/beetrail/stages/hub.js';
import {MeadowStage} from '/beetrail/stages/meadow.js';
import {PollenStage} from '/beetrail/stages/pollen.js';

export class StageManager{
    #stages;
    #stage;
    assetTextures;
    app;

    constructor(app){
        this.stages = {
            "hub":new HubStage(app, this),
            "meadow":new MeadowStage(app, this),
            "pollen":new PollenStage(app, this)
        };
        this.stage = "hub";
        this.app = app;
    }


    changeStage(newStage){
        this.stages[this.stage].stop();
        this.app.stage.removeChildren();
        //this.stages[this.stage].destroyAllItems();
        
        this.stage = newStage;
        this.stages[newStage].play();
    }

    start(){
        this.stages[this.stage].play();
    }




}