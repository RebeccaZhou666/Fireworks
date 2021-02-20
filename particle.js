// Daniel Shiffman
// http://codingtra.in


class Particle {
    constructor(x, y, c, firework, s, l, e) {
        this.pos = new Vector2(x, y);
        this.firework = firework;
        this.life = l;
        this.lifespan = l;
        this.colorIndex = c;
        this.scale = e;
        this.hu = `hsla(${this.colorIndex}, 100%, 50%, ${this.getAlpha()})`;
        this.acc = new Vector2(0, 0);
        this.style = s;

        // this.a = 0;
        if (this.firework) {
            this.vel = new Vector2(0, -random(6) - 9);
        } else {
            let a, m, n, velX, velY, leaveN;
            switch (this.style) {
                case 0:
                    //normal ring
                    a = random(360);
                    this.vel = new Vector2(cos(a), sin(a)).multiplyScalar(10).multiplyScalar(this.scale);
                    break;
                case 1:
                    //normal firework
                    a = random(360);
                    this.vel = new Vector2(cos(a), sin(a)).multiplyScalar(4 + random(10)).multiplyScalar(this.scale);//p5.Vector.random2D().mult(random(4, 10)).mult(4);
                    break;
                // case 2:
                // // dubble ring
                // a = random(360);
                // this.vel = new Vector2(cos(a), sin(a));
                // if (random(1) < 0.5) {
                //     this.vel.multiplyScalar(16).multiplyScalar(this.scale);
                // } else {
                //     this.vel.multiplyScalar(random(3) + 6).multiplyScalar(this.scale);
                // }
                // break;
                case 2:
                    // oval shape
                    let rotAngle = this.scale - 0.8//this.scale - 0.6; // -PI / 8; // (-PI/2 ~ PI/2)
                    a = random(2 * PI);
                    m = 10, n = 5;
                    velX = cos(a) * m * n / sqrt(pow(m * sin(a), 2) + pow(n * cos(a), 2));
                    velY = sin(a) * m * n / sqrt(pow(m * sin(a), 2) + pow(n * cos(a), 2));

                    velX = (velX * cos(rotAngle) - velY * sin(rotAngle)) * 1.5;
                    velY = (velX * sin(rotAngle) + velY * cos(rotAngle)) * 1;

                    this.vel = new Vector2(velX, velY).multiplyScalar(this.scale);
                    break;
                case 3:
                    // heart shape
                    a = random(2 * PI);
                    velX = 16 * pow(sin(a), 3);
                    velY = -1 * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));

                    this.vel = new Vector2(velX, velY).multiplyScalar(0.8).multiplyScalar(this.scale);
                    break;
                case 4:
                    // four-leave roses 
                    a = random(2 * PI);
                    leaveN = 4;
                    velX = cos(leaveN / 2 * a) * cos(a) * 15;
                    velY = cos(leaveN / 2 * a) * sin(a) * 15;

                    this.vel = new Vector2(velX, velY).multiplyScalar(this.scale);
                    break;
                default:
                    a = random(360);
                    this.vel = new Vector2(cos(a), sin(a)).multiplyScalar(10).multiplyScalar(this.scale);

            }

        }
    }

    getAlpha() {
        return (this.lifespan / this.life) * 1;
    }

    applyForce() {

        let velMag = this.vel.getMagnitude();
        let airforce = this.vel.clone().divideScalar(velMag).multiplyScalar(pow(velMag, 2) * (-0.000001));;
        // console.log(airforce);
        this.acc.add(airforce);
        this.acc.add(gravity);
    }

    update() {
        if (!this.firework) {
            this.vel.multiplyScalar(0.9);
            this.lifespan -= 4;
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.multiplyScalar(0);
    }

    done() {
        if (this.lifespan < 0) {
            return true;
        } else {
            return false;
        }
    }

    show(canvas) {
        canvas.buffer.save();
        canvas.buffer.globalCompositeOperation = "lighter";

        this.hu = `hsla(${this.colorIndex}, 100%, 50%, ${this.getAlpha()})`;
        canvas.arc(this.pos.x, this.pos.y, random(1) + 1.2, 0, PI * 2, this.hu);

        canvas.buffer.restore();
        return this;
    }


}