export class Movement{
        //-----------CUSTOM MOVEMENT PATTERNS-----------//
    //These functions must define a horizontal movement path, which gets rotated to...
    //...the correct directing in the future.
    //Each function returns a y coordinate, based on the paramater x.
    //A length of the path is provided for reference.

    static sinMvPattern(x, length, amplification){
        return (Math.sin((x)/10)*amplification)
    }

    static quadCurveMvPattern(x, length, amplification){
        return ((((x*(2/length))-1)**2)-1)*amplification;
    }

    static straightMvPattern(x, length, amplification){
        return 0;
    }

    static testCollision(item1, item2){
        if(item1.getX() - (item1.getWidth()*item1.getAnchor().x) < item2.getX()+item2.getWidth()
        && item1.getX() + item1.getWidth() - (item1.getWidth()*item1.getAnchor().x) > item2.getX()
        && item1.getY() - (item1.getHeight()*item1.getAnchor().y) < item2.getY() + item2.getHeight()
        && item1.getY() + item1.getHeight() - (item1.getHeight()*item1.getAnchor().y) > item2.getY()
        ){
            return true;
        }
        return false;
    }
}

export class Animation{

    static halfAlphaPulse(item, x){
        let a = (Math.cos(x*(Math.PI*2)/100)/8)+7/8;
        item.setAlpha(a);
    }

    static fullAlphaPulse(item, x){
        let a = (Math.cos(x*(Math.PI*2)/100)/2)+0.5;
        item.setAlpha(a);
    }

    static idle(item, x, amplification=1){
        item.setLocation(
            item.getX(),
            item.getY()+Movement.sinMvPattern(
                x,
                0,
                amplification
            ));
        if(item.animationTick == 63){
            item.animationTick = 0;
        }
        
            
        
        /*
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
        break;*/
    }
}