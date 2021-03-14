export class EventChain{
    constructor(){
        this._time = 0;
        this.chain = [];
        this.eventNumber = 0;
        this._locProgress = 0;
    }
    
    
    addSleep(length){
        this.chain.push({
            'type':'sleep',
            'length': length
        });
        return this;
    }

    addHang(){
        this.chain.push({
            'type':'hang',
            'sleep': -1
        });
        return this;
    }


    addMovement(item, dest, speed){
        //dest = [x, y]
        item.getX();

        let xDiff = dest[0]-item.getX();
        let yDiff = dest[1]-item.getY();

        this.chain.push({
            'type': 'movement',
            'item':item,
            'dest':dest,
            'speed':speed,
            'progress':0
        });
        return this;
    }

    addFade(item, delta, min, max){
        this.chain.push({
            'type':'fade',
            'item':item,
            'delta':delta,
            'min':min,
            'max':max,
            'progress':0    //0 -> 100
        });
        return this;
    }

    addCustomAction(itemFunction){
        this.chain.push({
            'type':'customAction',
            'funcPointer':itemFunction
        });
        return this;
    }


    tick(){
        if(this.eventNumber >= this.chain.length){
            return;
        }

        switch(this.chain[this.eventNumber].type){
            case 'sleep':
                this._locProgress += 1;
                if(this._locProgress == this.chain[this.eventNumber].length){
                    this.eventNumber += 1;
                }
                break;
            
            case 'hang':
                break;

            case 'fade':
                this.chain[this.eventNumber].item.setAlpha(
                    this.chain[this.eventNumber].item.getAlpha()
                    +this.chain[this.eventNumber].delta/100);
                if(this.chain[this.eventNumber].item.getAlpha() < this.chain[this.eventNumber].min
                || this.chain[this.eventNumber].item.getAlpha() > this.chain[this.eventNumber].max){
                    this.eventNumber += 1;
                }
                break;

            case 'customAction':
                this.chain[this.eventNumber].funcPointer();
                this.eventNumber += 1;
                break;
        }

    }

}