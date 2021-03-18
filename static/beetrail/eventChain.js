import {Movement} from '/beetrail/movementMisc.js';

export class EventChain{
    constructor(){
        this._time = 0;
        this.chain = [[]];
        this.eventNumber = 0;
        this._locProgress = 0;
        this._creationMode = false;
        this._creationEvent
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
        this.eventNumber += 1;
        if(this.eventNumber >= this.chain.length){return;}

        let i;
        for(i=0; i<this.chain[this.eventNumber].length; i++){
            this.chain[this.eventNumber][i].item.dissableInteractiveState();
            this.chain[this.eventNumber][i].item.dissableDrag();
        }
        
        for(i=0; i<this.chain[this.eventNumber].length; i++){
            if(this.chain[this.eventNumber][i].type == "movement"){
                if(this.chain[this.eventNumber][i].origin[0] < this.chain[this.eventNumber][i].dest[0]){
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


    addMovement(item, dest, speed, mvtFunction, amplification=10){
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

    addCustomAction(itemFunction){
        this.chain[this.chain.length-1].push({
            'type':'customAction',
            'funcPointer':itemFunction,
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
                        }
                        eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    }
                    break;


                case 'movement':
                    if(!this.chain[this.eventNumber][i].completed){
                        let x = this.chain[this.eventNumber][i].progress;
                        this.chain[this.eventNumber][i].item.setLocation(
                            this.chain[this.eventNumber][i].points[x][0],
                            this.chain[this.eventNumber][i].points[x][1]
                        );
                        this.chain[this.eventNumber][i].progress += 1;
                        if(this.chain[this.eventNumber][i].progress >= this.chain[this.eventNumber][i].splice){
                            this.chain[this.eventNumber][i].completed = true;
                        }
                        eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    }
                    break;

                case 'click':
                    if(!this.chain[this.eventNumber][i].completed){
                        if(this.chain[this.eventNumber][i].item.getClickedState()){
                            this.chain[this.eventNumber][i].item.resetClickedState();
                            this.chain[this.eventNumber][i].item.dissableInteractiveState();
                            this.chain[this.eventNumber][i].completed = true;
                        }
                        eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    }
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
                        eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    }
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
                        this.chain[this.eventNumber][i].item.setAlpha(
                            this.chain[this.eventNumber][i].item.getAlpha()
                            +this.chain[this.eventNumber][i].delta/100);
                        if(this.chain[this.eventNumber][i].item.getAlpha() < this.chain[this.eventNumber][i].min
                        || this.chain[this.eventNumber][i].item.getAlpha() > this.chain[this.eventNumber][i].max){
                            this.chain[this.eventNumber][i].completed = true;
                        }
                        eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    }
                    break;

                case 'customAction':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].funcPointer();
                        this.chain[this.eventNumber][i].completed = true;
                        eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    }
                    break;

                case 'bringBefore':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.bringBefore(
                            this.chain[this.eventNumber][i].bItem);
                        this.chain[this.eventNumber][i].completed = true;
                        eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    }
                    break;

                case 'bringBehind':
                    if(!this.chain[this.eventNumber][i].completed){
                        this.chain[this.eventNumber][i].item.bringBehind(
                            this.chain[this.eventNumber][i].bItem);
                        this.chain[this.eventNumber][i].completed = true;
                        eGroupComp = eGroupComp && this.chain[this.eventNumber][i].completed;
                    }
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
                if(this.chain[i][eventI].type == "movement"){
                    return this.chain[i][eventI].dest;
                }
            }
        }
        return [item.getX(), item.getY()];
    }

}