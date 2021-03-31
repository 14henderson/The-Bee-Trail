import {Item} from '/beetrail/item/item.js';
import {HubStage} from '/beetrail/stages/hub.js'
import {Test} from '/beetrail/stages/test.js'
import {MeadowStage} from '/beetrail/stages/meadow.js'
import { StageManager } from '/beetrail/stages/stageManager.js';

//Create a Pixi Application
var app = new PIXI.Application({ 
        width: 256, 
        height: 256,                       
        antialias: true, 
        transparent: false,
        resizeTo: window,
        resolution: 1
    }
);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
/*
//load an image and run the `setup` function when it's done
PIXI.loader
  .add("assets/bee_test.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  let cat = new PIXI.Sprite(PIXI.loader.resources["assets/bee_test.png"].texture);
  
  //Add the cat to the stage
  app.stage.addChild(cat);
}

PIXI.loader.add("assets/bee_test.png").load(test);

function test(){
    let bee = new PIXI.Sprite(PIXI.loader.resources["assets/bee_test.png"].texture);
    app.stage.addChild(bee);
    
}
*/

//app.stage.addChild(bee);
let manager = new StageManager(app);

/*
let textures = [
    "assets/bSprites/Artboard 1grass-background.png",
    "assets/bSprites/Artboard 1grass-foreground.png",
    "assets/bSprites/Artboard 1grass-middleground.png",
    "assets/bSprites/Artboard 1meadow-foreground.png",

    "assets/fSprites/bees/Small-buff-tail-profile.png",
    "assets/fSprites/bees/Small-buff-tail-facing.png",
    "assets/fSprites/bees/Small-honey-bee-profile.png",
    "assets/fSprites/bees/Small-honey-bee-facing.png",
    "assets/fSprites/bees/Small-red-tail-profile.png",
    "assets/fSprites/bees/Small-redtail-facing.png",

    "assets/fSprites/backgrounds/background3.fw.png",
    "assets/fSprites/backgrounds/background2.fw.png",
    "assets/fSprites/backgrounds/background1.fw.png",

    "assets/fSprites/objects/elie-standing.png",
    "assets/fSprites/objects/elie-waving.png",
    "assets/fSprites/objects/net-yellow.png",

    "assets/fSprites/speech-bubbles/1-billie-speech-bubble.png",
    "assets/fSprites/speech-bubbles/2-billie-speech-bubble.png",
    "assets/fSprites/speech-bubbles/barney-speech-bubble.png",
    "assets/fSprites/speech-bubbles/bella-speech-bubble.png",
    "assets/fSprites/speech-bubbles/elie-speech-bubble.png",
    "assets/fSprites/speech-bubbles/elie-speech-bubble-2.png",

    "assets/fSprites/objects/bench.png",
    "assets/fSprites/objects/laptop.png",
    "assets/fSprites/objects/minion-cable.png",

    "assets/fSprites/objects/Artboard 1newspaper-front-cover.png",
    "assets/fSprites/buttons/play-button-hover.png",
    "assets/fSprites/buttons/static-play-button-click.png",

    "assets/fSprites/buttons/meadowNav.fw.png",
    "assets/fSprites/buttons/meadowNav_L.fw.png",
    "assets/fSprites/buttons/minIONNav.fw.png",
    "assets/fSprites/buttons/minIONNav_L.fw.png",
    "assets/fSprites/buttons/pollenNav.fw.png",
    "assets/fSprites/buttons/pollenNav_L.fw.png",
];*/



document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });

manager.start();
