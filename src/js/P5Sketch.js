import React, { useEffect } from "react";
import PlayIcon from './PlayIcon.js';
import Circle from './Circle.js';
import './globals';
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import audio from '../audio/circles-no-2.ogg'
import cueSet1 from './cueSet1.js'
import cueSet2 from './cueSet2.js'

const P5Sketch = () => {
    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.song = null;

        p.circles = [];

        p.hue = 0;

        p.cueSet1Completed = [];

        p.cueSet2Completed = [];

        p.preload = () => {
            p.song = p.loadSound(audio);
        }

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.colorMode(p.HSB, 360, 100, 100, 100);
            p.background(0);
            p.strokeWeight(5);

            p.hue = p.random(360);
            p.song.onended(p.logCredits);

            for(let i = 0; i < cueSet1.length; i++){
                p.song.addCue(cueSet1[i].time, p.executeCueSet1, (i + 1));
            }

            for(let i = 0; i < cueSet2.length; i++){
                p.song.addCue(cueSet2[i].time, p.executeCueSet2, (i + 1));
            }
        };

        p.draw = () => {

            if (p.song.isPlaying()) {
                p.clear();
                p.background(0);
                for (var i = 0; i < p.circles.length; i++) {
                    p.circles[i].update();
                    p.circles[i].draw();
                    //is circle has reached it's lifespan, then delete it
                    if (p.circles[i].lifespan <= 0) {
                        p.circles.splice(i, 1);
                    }
                }
            }
        };

        p.executeCueSet1 = (currentCue) => {
            if (!p.cueSet1Completed.includes(currentCue)){
                p.cueSet1Completed.push(currentCue);
                p.hue = p.hue + 15;
                p.hue = (p.hue > 360) ? (p.hue - 360) : p.hue;
                const lifeSpan = currentCue <= 56 ? p.canvasWidth/4 : p.canvasWidth/2;
                p.circles.push(new Circle(p, p.canvasWidth / 2, p.canvasHeight / 2, 10, p.hue, lifeSpan));
            }
        }

        p.executeCueSet2= (currentCue) => {
            if (!p.cueSet2Completed.includes(currentCue)){
                p.cueSet2Completed.push(currentCue);
                const size = 10;
                let hue = p.random(360);
                p.circles.push(new Circle(p, (size * 4), (size * 4), size, hue, p.canvasWidth / 12, false));
                p.random(360);
                p.circles.push(new Circle(p, (size * 4), p.canvasHeight - (size * 4), size, hue, p.canvasWidth / 12, false));
                p.random(360);
                p.circles.push(new Circle(p, p.canvasWidth - (size * 4), (size * 4), size, hue, p.canvasWidth / 12, false));
                p.random(360);
                p.circles.push(new Circle(p, p.canvasWidth - (size * 4), p.canvasHeight - (size * 4), size, hue, p.canvasWidth / 12, false));
            }
        }

        p.executeCueSet3= (currentCue) => {
            if (!p.cueSet3Completed.includes(currentCue)){
                p.cueSet3Completed.push(currentCue);
                p.circles.push(new Circle(p, (p.canvasWidth / 8) * 7, (p.canvasHeight / 4) * 3, 10, p.hue, p.canvasWidth / 16, false));
            }
        }

        p.mousePressed = () => {
            if (p.song.isPlaying()) {
                p.song.pause();
            } else {
                if (parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)){
                    p.reset();
                }
                document.getElementById("play-icon").classList.add("fade-out");
                p.canvas.addClass('fade-in');
                p.song.play();
            }
        }

        p.creditsLogged = false;

        p.logCredits = () => {
            if (!p.creditsLogged && parseInt(p.song.currentTime()) >= parseInt(p.song.buffer.duration)) {
                p.creditsLogged = true;
                console.log(
                    'Music: http://labcat.nz/',
                    '\n',
                    'Animation: https://github.com/LABCAT/circles-no-2',
                    '\n',
                    'Code Inspiration: https://editor.p5js.org/coloringchaos/sketches/SkZVaxF0-'
                );
            }
            
        }

        p.reset = () => {
            p.clear();
            p.background(0);
            p.circles = [];
            p.cueSet1Completed = [];
            p.cueSet2Completed = [];
            p.hue = p.random(360);
        };

        p.updateCanvasDimensions = () => {
            p.canvasWidth = window.innerWidth;
            p.canvasHeight = window.innerHeight;
            p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.redraw();
        }

        if (window.attachEvent) {
            window.attachEvent(
                'onresize',
                function () {
                    p.updateCanvasDimensions();
                }
            );
        }
        else if (window.addEventListener) {
            window.addEventListener(
                'resize',
                function () {
                    p.updateCanvasDimensions();
                },
                true
            );
        }
        else {
            //The browser does not support Javascript event binding
        }
    };

    useEffect(() => {
        new p5(Sketch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PlayIcon />
        </>
    );
};

export default P5Sketch;
