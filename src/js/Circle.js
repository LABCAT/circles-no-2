export default class Circle {

    constructor(p5, x, y, size, hue) {
        this.p = p5;
        this.x = x;
        this.y = y;
        this.size = size;
        this.hue = hue;
        //give each circle a lifespan
        this.lifespan = 1000;
    }

    draw() {
        this.p.stroke(this.hue, 100, 100, 50);
        this.p.fill(this.hue, 100, 100, 20);
        this.p.ellipse(this.x, this.y, this.size);
        this.p.fill(this.hue, 100, 100, 0);
        this.p.ellipse(this.x, this.y, this.size/2);
    }

    update() {
        this.size = this.size + 3;
        this.lifespan--;
    }

}