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
}