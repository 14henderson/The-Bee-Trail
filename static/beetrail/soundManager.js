

export class SoundManager{
    static sounds;

    constructor(){
        if(this.sounds == undefined){
            this.sounds = {};
        }
        
    }

    add(code, URI, resource){
        if(!PIXI.sound.exists(code)){
            let s = PIXI.sound.add(code, resource[URI]);
            this.sounds[code] = s;
        }
    }
    setVolume(code, volume){
        this.sounds[code].volume = volume;
    }
    getVolume(code){
        return this.sounds[code].volume;
    }

    setLoop(code, loop){
        this.sounds[code].loop = loop;
    }

    play(code){
        PIXI.sound.stop(code);
        PIXI.sound.play(code);
    }

    stop(code){
        PIXI.sound.stop(code);
    }
    getSound(code){
        return this.sounds[code];
    }
}