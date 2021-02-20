const {
    cos,
    sin,
    abs,
    pow,
    sqrt,
    round,
    PI } =
    Math;
const random = n => n * Math.random();
let glowAmt = 3;
let alpha = 0.3;

let canvas, background, CONFIG;
const fireworks = [];
let gravity;
// let colors = [30, 22, 180, 220, 170];

function onLoad() {
    canvas = new Canvas(".main");
    background = new Canvas(".background");
    resizeCanvas();
    setup();

    gravity = new Vector2(0, 0.006);

    loop();
}

function resizeCanvas() {
    if (!!canvas) {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
}

function setup() {
    window.requestAnimationFrame = (() => {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||

            // set framerate as 60 fps
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            });
    })();
}

function loop() {

    canvas.clear();

    if (random(1) < 0.1) {
        fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show(canvas);

        if (fireworks[i].done()) {
            fireworks.splice(i, 1);
        }
    }

    canvas.render();
    drawBackground();
    window.requestAnimationFrame(loop.bind(this));
}

function drawBackground() {
    background.rect(
        0,
        0,
        canvas.dimensions.x,
        canvas.dimensions.y,
        `hsla(0,0%,0%,${alpha})`);


    background.buffer.filter = `
            saturate(${200 + glowAmt * 500}%) 
            brightness(${200 + glowAmt * 500}%)
            blur(${glowAmt}px)
        `;
    background.drawImage(canvas.frame);
    background.buffer.save();
    background.buffer.globalCompositeOperation = "lighter";
    background.drawImage(canvas.frame);
    background.buffer.restore();

    background.render();

}



window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("DOMContentLoaded", onLoad, false);
