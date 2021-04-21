

export class SoundManager{
    sounds;

    constructor(){
        this.sounds = {};
    }

    add(code, URI, resource){
        let s = PIXI.sound.add(code, resource[URI]);
        this.sounds[code] = s;
        console.log("new sound: ", s);
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
        PIXI.sound.play(code);
    }
    getSound(code){
        return this.sounds[code];
    }
}