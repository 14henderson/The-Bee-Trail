

export class soundManager{
    constructor(){

    }

    add(code, URI, resource){
        PIXI.sound.add(code, resource[URI]);
    }

    play(code){
        PIXI.sound.play(code);
    }
}