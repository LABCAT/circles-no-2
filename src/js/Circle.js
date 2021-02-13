export default class Circle {

    constructor(p5, x, y, size, hue, lifespan = 1000, hasFill = true) {
        this.p = p5;
        this.x = x;
        this.y = y;
        this.size = size;
        this.hue = hue;
        //give each circle a lifespan
        this.lifespan = lifespan;
        this.hasFill = hasFill;
    }

    draw() {
        this.p.noFill();
        this.p.stroke(this.hue, 100, 100, 50);

        if(this.hasFill){
            this.p.fill(this.hue, 100, 100, 20);    
        }
        this.p.ellipse(this.x, this.y, this.size);

        if(this.hasFill){
            this.p.fill(this.hue, 100, 100, 0);
            this.p.ellipse(this.x, this.y, this.size/2);
        }
    }

    update() {
        this.size = this.size + 3;
        this.lifespan--;
    }

}