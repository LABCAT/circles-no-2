import React, { useEffect } from "react";
import PlayIcon from './PlayIcon.js';
import Circle from './Circle.js';
import './globals';
import "p5/lib/addons/p5.sound";
import * as p5 from "p5";
import audio from '../audio/circles-no-2.mp3'
import notes from './notes.js'

const P5Sketch = () => {
    const Sketch = p => {

        p.canvas = null;

        p.canvasWidth = window.innerWidth;

        p.canvasHeight = window.innerHeight;

        p.song = null;

        p.cuesCompleted = [];

        p.circles = [];

        p.setup = () => {
            p.canvas = p.createCanvas(p.canvasWidth, p.canvasHeight);
            p.colorMode(p.HSB, 360, 100, 100, 100);
            p.background(0);
            p.strokeWeight(5);
            p.song = p.loadSound(audio);
            p.song.onended(p.logCredits);
            for(let i = 0; i < notes.length; i++){
                p.song.addCue(notes[i].time, p.executeCue, (i + 1));
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

        p.executeCue = (currentCue) => {
            if (!p.cuesCompleted.includes(currentCue)){
                p.cuesCompleted.push(currentCue);
                const hue = currentCue < 1 ? 0 :((currentCue % 24) * 15);
                p.circles.push(new Circle(p, p.canvasWidth / 2, p.canvasHeight / 2, 10, hue));
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
            p.cuesCompleted = [];
            p.circles = [];
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
