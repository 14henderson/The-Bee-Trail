import {Movement} from '/beetrail/movementMisc.js';

export class EventChain{
    constructor(){
        this._time = 0;
        this.chain = [[]];
        this.eventNumber = 0;
        this._locProgress = 0;
        this._creationMode = false;
        this._creationEvent
        this.name;
    }
    resetChain(){
        this.chain = [[]];
        this.eventNumber = 0;
    }
    getCurrentEventNumber(){
        return this.eventNumber;
    }
    startCreation(){
        this._creationMode = true;
        return this;
    }
    finishCreation(){
        this._creationMode = false;
        return this;
    }
    next(){
        this.chain.push([]);
        return this;
    }
    nextEvent(){
        //console.log("---------- Next Event Function for ", this.name, "----------");
        this.eventNumber += 1;
        //console.log("Event ", this.eventNumber, " of ", this.chain.length);
        if(this.eventNumber >= this.chain.length){
            return;
        }

        let i;
        
        for(i=0; i<this.chain[this.eventNumber].length; i++){
            this.chain[this.eventNumber][i].item.dissableInteractiveState();
            this.chain[this.eventNumber][i].item.dissableDrag();
        }
        
        for(i=0; i<this.chain[this.eventNumber].length; i++){
            if(this.chain[this.eventNumber][i].type == "movement"){
                if(this.chain[this.eventNumber][i].origin[0] < this.chain[this.eventNumber][i].dest[0] && this.chain[this.eventNumber][i].faceWith){
                    this.chain[this.eventNumber][i].item.setSpriteDirection('r');
                }else{
                    this.chain[this.eventNumber][i].item.setSpriteDirection('l');
                }
            }
            else if(this.chain[this.eventNumber][i].type == "click" || this.chain[this.eventNumber][i].type == "drag"){
                this.chain[this.eventNumber][i].item.resetClickedState();
                this.chain[this.eventNumber][i].item.enableInteractiveState();
            }
            if(this.chain[this.eventNumber][i].type == "drag"){
                this.chain[this.eventNumber][i].item.enableDrag();
            }
            
        }

    }

    initialise(){
        this.eventNumber = 0;
        let i;
        for(i=0; i<this.chain[0].length; i++){
            if(this.chain[0][i].type == "click" || this.chain[0][i].type == "drag"){
                this.chain[0][i].item.resetClickedState();
                this.chain[0][i].item.enableInteractiveState();
            }
            if(this.chain[0][i].type == "drag"){
                this.chain[0][i].item.enableDrag();
            }
        }
    }
    
    addSleep(item, length){
        this.chain[this.chain.length-1].push({
            'type':'sleep',
            'length': length,
            'item':item,
            'completed':false
        });
        return this;
    }

    addIdle(item, movementPattern = Movement.sinMvPattern, amplification=.7){
        this.chain[this.chain.length-1].push({
            'type':'idle',
            'item':item,
            'sleep': -1,
            'x': 0,
            'pattern':movementPattern,
            'amplification':amplification,
            'completed':true //as true due to this usually being alongside another event.
        });
        return this;
    }

    addFrameEvent(item, frameNum){
        this.chain[this.chain.length-1].push({
            'type':'frame',
            'item':item,
            'frameNum':frameNum,
            'completed':false
        });
        return this;
    }

    addMovement(item, dest, speed, mvtFunction, amplification=10, faceWith=true){
        let origin = this._getLastEventDest(item);
        
        let xDelta = (dest[0]-origin[0]);
        let yDelta = (dest[1]-origin[1]);
        let angle = Math.atan(yDelta/xDelta);

        if(xDelta < 0 && yDelta>0){angle = (Math.PI)-Math.abs(angle);}
        else if(xDelta < 0 && yDelta <= 0){angle += (Math.PI);}
        else if(xDelta >= 0 && yDelta < 0){angle += (2*Math.PI);}
        let length = Math.sqrt((dest[0]-origin[0])**2 + (dest[1]-origin[1])**2);
        let sinPoints = []
        let x, y, i;

        for(i=0; i<length/speed; i++){
            x = i*speed;
            y = mvtFunction(i*speed, length, amplification);

            sinPoints.push([
                origin[0] + (Math.cos(angle)*x) - (Math.sin(angle)*y),
                origin[1] + (Math.sin(angle)*x) + (Math.cos(angle)*y)
            ]);
        }
        item.setAbsoluteFlag('y', true);
        item.setAbsoluteFlag('x', true);
        this.chain[this.chain.length-1].push({
            'type': 'movement',
            'item':item,
            'origin':origin,
            'dest':dest,
            'splice':length/speed,
            'xDelta':xDelta,
            'yDelta':yDelta,
            'points':sinPoints,
            'faceWith':faceWith,
            'progress':0,
            'completed':false
        });
        return this;
    }


    addScaleEvent(item, delta, min, max){
        this.chain[this.chain.length-1].push({
            'type':'scale',
            'item':item,
            'delta':delta,
            'min':min,
            'max':max,
            'progress':0,
            'completed':false
        });
        return this;
    }


    addRotationEvent(item, startAngle, stopAngle, speed){
        this.chain[this.chain.length-1].push({
            'type': 'rotation',
            'item':item,
            'start':startAngle,
            'stop':stopAngle,
            'speed':speed,
            'progress':0,
            'completed':false
        });
        return this;
    }

    addFade(item, delta, min, max){
        this.chain[this.chain.length-1].push({
            'type':'fade',
            'item':item,
            'delta':delta,
            'min':min,
            'max':max,
            'progress':0,
            'completed':false
        });
        return this;
    }

    addBringBefore(newForwardItem, otherItem){
        this.chain[this.chain.length-1].push({
            'type':'bringBefore',
            'item':newForwardItem,
            'bItem':otherItem,
            'completed':false
        });
        return this;
    }

    addBringBehind(newBackItem, otherItem){
        this.chain[this.chain.length-1].push({
            'type':'bringBehind',
            'item':newBackItem,
            'bItem':otherItem,
            'completed':false
        });
        return this;
    }

    addCollisionEvent(item1, item2){
        this.chain[this.chain.length-1].push({
            'type':'collision',
            'item':item1,
            'item2':item2,
            'completed':false
        });
        return this;
    }

    addEventChainWait(item, eventChain, eventNumber){
        this.chain[this.chain.length-1].push({
            'type':'chain-wait',
            'item':item,
            'chain':eventChain,
            'eventNumber':eventNumber,
            'completed':false
        });
        return this;
    }

    setAnimationFlag(item, flag){
        this.chain[this.chain.length-1].push({
            'type':'item-animation-flag',
            'item':item,
            'flag':flag,
            'completed':false
        });
        return this;
    }


    addChangeStateEvent(item, stage, stateNum){
        this.chain[this.chain.length-1].push({
            'type':'state-change',
            'item':item,
            'stage':stage,
            'stateNum':stateNum,
            'completed':false
        });
        return this;
    }

    addChangeStageEvent(item, currentStage, newStageCode){
        this.chain[this.chain.length-1].push({
            'type':'stage-change',
            'item':item,
            'currStage':currentStage,
            'newStageCode':newStageCode,
            'completed':false
        });
        return this;
    }

    addPlayVideoEvent(item){
        this.chain[this.chain.length-1].push({
            'type':'play-video',
            'item':item,
            'completed':false
        });
        return this;
    }
    waitForVideoEvent(item){
        this.chain[this.chain.length-1].push({
            'type':'video-wait',
            'item':item,
            'completed':false
        });
        return this;
    }

    addPlaySoundEvent(item, soundManager, code){
        this.chain[this.chain.length-1].push({
            'type':'play-sound',
            'item':item,
            'soundManager':soundManager,
            'code':code,
            'completed':false
        });
        return this;
    }

    addStopSoundEvent(item, soundManager, code){
        this.chain[this.chain.length-1].push({
            'type':'stop-sound',
            'item':item,
            'soundManager':soundManager,
            'code':code,
            'completed':false
        });
        return this;
    }
    

    addSoundFade(item, soundManager, code, delta, min, max){
        this.chain[this.chain.length-1].push({
            'type':'fade-sound',
            'item':item,
            'soundManager':soundManager,
            'code':code,
            'delta':delta,
            'min':min,
            'max':max,
            'completed':false
        });
        return this;
    }


    addCustomAction(item, itemFunction){
        this.chain[this.chain.length-1].push({
            'type':'customAction',
            'item':item,
            'funcPointer':itemFunction,
            'completed':false
        });
        return this;
    }

    addCustomWait(item, func){
        this.chain[this.chain.length-1].push({
            'type':'customWait',
            'item':item,
            'funcPointer':func,
            'completed':false
        });
        return this;
    }

    addClickEvent(item){
        this.chain[this.chain.length-1].push({
            'type':'click',
            'item':item,
            'completed':false
        });
        return this;
    }
    
    addForceLocationEvent(item, location){
        this.chain[this.chain.length-1].push({
            'type':'location',
            'item':item,
            'dest':location,
            'completed':false
        });
        return this;
    }

    addDragEvent(item){
        this.chain[this.chain.length-1].push({
            'type':'drag',
            'item':item,
            'completed':false
        });
        return this;
    }


    tick(){
        if(this.eventNumber >= this.chain.length){
            return;
        }
        var eGroupComp = true;
        var i;
        for(i=0; i<this.chain[this.eventNumber].length; i++){

            switch(this.chain[this.eventNumber][i].type){
                case 'sleep':
                    if(!this.chain[this.eventNumber][i].completed){
                        this._locProgress += 1;
                        if(this._locProgress == this.chain[this.eventNumber][i].length){
                            this.chain[this.eventNumber][i].completed = true;
                            this._locProgress = 0;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'chain-wait':
                    if(!this.chain[this.eventNumber][i].completed){
                        if(this.chain[this.eventNumber][i].chain.getCurrentEventNumber()
                        >= this.chain[this.eventNumber][i].eventNumber){
                            this.chain[this.eventNumber][i].completed = true;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'state-change':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].stage.setState(
                            this.chain[this.eventNumber][i].stateNum
                        );
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'stage-change':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].currStage.changeStage(
                            this.chain[this.eventNumber][i].newStageCode
                        );
                    }
                    eGroupComp = eGroupComp && true;
                    break;

                case 'item-animation-flag':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.setAnimationFlag(
                            this.chain[this.eventNumber][i].flag
                        );
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && true;
                    break;

                case 'movement':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.animationFlag = false;
                        let x = this.chain[this.eventNumber][i].progress;
                        this.chain[this.eventNumber][i].item.setLocation(
                            this.chain[this.eventNumber][i].points[x][0],
                            this.chain[this.eventNumber][i].points[x][1]
                        );
                        this.chain[this.eventNumber][i].progress += 1;
                        if(this.chain[this.eventNumber][i].progress >= this.chain[this.eventNumber][i].splice){
                            this.chain[this.eventNumber][i].completed = true;
                            this.chain[this.eventNumber][i].item.animationFlag = true;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'click':
                    if(!this.chain[this.eventNumber][i].completed){
                        if(this.chain[this.eventNumber][i].item.getClickedState()){
                            this.chain[this.eventNumber][i].item.resetClickedState();
                            this.chain[this.eventNumber][i].item.dissableInteractiveState();
                            this.chain[this.eventNumber][i].completed = true;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'frame':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.gotoFrame(
                            this.chain[this.eventNumber][i].frameNum
                        );
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;
                
                case 'collision':
                    if(!this.chain[this.eventNumber][i].completed){
                        if(Movement.testCollision(
                            this.chain[this.eventNumber][i].item,
                            this.chain[this.eventNumber][i].item2
                        )){
                            this.chain[this.eventNumber][i].completed = true;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'drag':
                    if(this.chain[this.eventNumber][i].item.getDragState()){
                    }
                    break;

                case 'location':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.setLocation(
                            this.chain[this.eventNumber][i].dest[0],
                            this.chain[this.eventNumber][i].dest[1]
                        );
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'rotation':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.setRotation(
                            this.chain[this.eventNumber][i].start 
                            + this.chain[this.eventNumber][i].progress
                        );
                        this.chain[this.eventNumber][i].progress += this.chain[this.eventNumber][i].speed;
                        if(this.chain[this.eventNumber][i].item.getRotation() >= this.chain[this.eventNumber][i].stop){
                            this.chain[this.eventNumber][i].completed = true;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;


                case 'idle':
                    this.chain[this.eventNumber][i].item.setLocation(
                        this.chain[this.eventNumber][i].item.getX(),
                        this.chain[this.eventNumber][i].item.getY()+
                        this.chain[this.eventNumber][i].pattern(
                            this.chain[this.eventNumber][i].x,
                            0,
                            this.chain[this.eventNumber][i].amplification
                        )
                    );
                    this.chain[this.eventNumber][i].x += 1;
                    if(this.chain[this.eventNumber][i].x > 60){
                        this.chain[this.eventNumber][i].x = 0;
                    }
                    break;

                case 'fade':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.setAnimationFlag(false);
                        this.chain[this.eventNumber][i].item.setAlpha(
                            this.chain[this.eventNumber][i].item.getAlpha()
                            +this.chain[this.eventNumber][i].delta/100);
                        if(this.chain[this.eventNumber][i].item.getAlpha() < this.chain[this.eventNumber][i].min){
                            this.chain[this.eventNumber][i].item.setAlpha(this.chain[this.eventNumber][i].min);
                            this.chain[this.eventNumber][i].completed = true;
                            if(this.chain[this.eventNumber][i].item.getAlpha() > 0){
                                this.chain[this.eventNumber][i].item.setAnimationFlag(true);
                            }
                        }else if(this.chain[this.eventNumber][i].item.getAlpha() > this.chain[this.eventNumber][i].max){
                            this.chain[this.eventNumber][i].item.setAlpha(this.chain[this.eventNumber][i].max);
                            this.chain[this.eventNumber][i].completed = true;
                            if(this.chain[this.eventNumber][i].item.getAlpha() > 0){
                                this.chain[this.eventNumber][i].item.setAnimationFlag(true);
                            }
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'fade-sound':
                    if(!this.chain[this.eventNumber][i].completed){
                        let code = this.chain[this.eventNumber][i].code;
                        this.chain[this.eventNumber][i].soundManager.setVolume(code, 
                            this.chain[this.eventNumber][i].soundManager.getVolume(code)
                            + this.chain[this.eventNumber][i].delta);
                    
                        if(this.chain[this.eventNumber][i].soundManager.getVolume(code) <= this.chain[this.eventNumber][i].min){
                            this.chain[this.eventNumber][i].soundManager.setVolume(code, this.chain[this.eventNumber][i].min);
                            this.chain[this.eventNumber][i].completed = true;
                        }

                        if(this.chain[this.eventNumber][i].soundManager.getVolume(code) >= this.chain[this.eventNumber][i].max){
                            this.chain[this.eventNumber][i].soundManager.setVolume(code, this.chain[this.eventNumber][i].max);
                            this.chain[this.eventNumber][i].completed = true;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;
                
                case 'scale':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.setScale(
                            this.chain[this.eventNumber][i].item.getScale()
                            +this.chain[this.eventNumber][i].delta/100);
                        if(this.chain[this.eventNumber][i].item.getScale() < this.chain[this.eventNumber][i].min
                        || this.chain[this.eventNumber][i].item.getScale() > this.chain[this.eventNumber][i].max){
                            this.chain[this.eventNumber][i].completed = true;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'play-video':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.play();
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'video-wait':
                    if(!this.chain[this.eventNumber][i].completed){
                        if(this.chain[this.eventNumber][i].item.hasFinished()){
                            this.chain[this.eventNumber][i].completed = true;
                        }
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'play-sound':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].soundManager.play(
                            this.chain[this.eventNumber][i].code
                        );
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'stop-sound':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].soundManager.stop(
                            this.chain[this.eventNumber][i].code
                        );
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'customAction':
                    if(!this.chain[this.eventNumber][i].completed){
                        let func = this.chain[this.eventNumber][i].funcPointer;
                        this.chain[this.eventNumber][i].item[func]();
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'customWait':
                    let func = this.chain[this.eventNumber][i].funcPointer;
                    if(this.chain[this.eventNumber][i].item[func]()){
                        this.chain[this.eventNumber][i].completed = true;                        
                    }else{
                        this.chain[this.eventNumber][i].completed = false;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'bringBefore':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.bringBefore(
                            this.chain[this.eventNumber][i].bItem);
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;

                case 'bringBehind':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.bringBehind(
                            this.chain[this.eventNumber][i].bItem);
                        this.chain[this.eventNumber][i].completed = true;
                    }
                    eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    break;
            }
        }
        if(eGroupComp == true){
            this.nextEvent();
        }


    }


    _getLastEventDest(item){
        let i, eventI;
        for(i = this.chain.length-1; i>= 0; i--){   //make sure this movement starts where the last one ended.
            for(eventI=0; eventI<this.chain[i].length; eventI++){
                if(this.chain[i][eventI].item.getID() == item.getID() &&
                    (this.chain[i][eventI].type == "movement" || this.chain[i][eventI].type == "location")){
                    return this.chain[i][eventI].dest;
                }
            }
        }
        return [item.getX(), item.getY()];
    }

}