import {Item} from '/beetrail/item.js';
import {Hub} from '/beetrail/stages/hub.js'
import {Test} from '/beetrail/stages/test.js'
import {MeadowStage} from '/beetrail/stages/meadow.js'

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
let hub = new MeadowStage(app);
//hub.loop(app);