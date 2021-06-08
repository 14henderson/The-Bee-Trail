import { StageManager } from '/beetrail/stages/stageManager.js';
PIXI.utils.skipHello();
//Create a Pixi Application
var app = new PIXI.Application({ 
        width: 256, 
        height: 256,
        antialias: true,                        
        transparent: false,
        resolution: window.devicePixelRatio,
        autoDensity: true
    }
);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";



app.renderer.resize(window.innerWidth, window.innerHeight);
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let manager = new StageManager(app);

document.addEventListener('wheel', function(e) {
  e.preventDefault();
}, { passive: false });

