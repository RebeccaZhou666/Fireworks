class Firework {
    constructor() {
        this.c = round(random(360));
        // this.hu = `hsla(${this.c}, 100%, 50%, ${0.8})`;//random(255);
        this.style = round(random(5));
        this.lifespan = round(random(150)) + 250;
        this.scale = random(0.6) + 0.8;
        this.firework = new Particle(random(window.innerWidth), window.innerHeight, this.c, true, this.style, this.lifespan, this.scale);
        this.exploded = false;
        this.particles = [];
    }

    done() {
        if (this.exploded && this.particles.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        if (!this.exploded) {
            this.firework.applyForce();
            this.firework.update();

            if (this.firework.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce();
            this.particles[i].update();

            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    explode() {
        for (let i = 0; i < 200; i++) {
            const p = new Particle(this.firework.pos.x, this.firework.pos.y, this.c, false, this.style, this.lifespan, this.scale);
            this.particles.push(p);
        }
    }

    show() {
        if (!this.exploded) {
            this.firework.show(canvas);
        }

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].show(canvas);
        }
    }
}