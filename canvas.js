class Canvas {
    constructor(selector) {
        this.element =
            document.querySelector(selector) ||
            (() => {
                let element = document.createElement("canvas");
                element.style = `position: absolute; width: 100vw; height: 100vh;`;
                document.body.appendChild(element);
                return element;
            })();
        this.ctx = this.element.getContext("2d");
        this.frame = document.createElement("canvas");
        this.buffer = this.frame.getContext("2d");
        this.dimensions = new Vector2();
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        this.dimensions.x = this.frame.width = this.element.width = window.innerWidth;
        this.dimensions.y = this.frame.height = this.element.height = window.innerHeight;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.dimensions.x, this.dimensions.y);
        this.buffer.clearRect(0, 0, this.dimensions.x, this.dimensions.y);
    }
    line(x1, y1, x2, y2, w, c) {
        this.buffer.beginPath();
        this.buffer.strokeStyle = c;
        this.buffer.lineWidth = w;
        this.buffer.moveTo(x1, y1);
        this.buffer.lineTo(x2, y2);
        this.buffer.stroke();
        this.buffer.closePath();
    }
    rect(x, y, w, h, c) {
        this.buffer.fillStyle = c;
        this.buffer.fillRect(x, y, w, h);
    }
    arc(x, y, r, s, e, c) {
        this.buffer.strokeStyle = "rgba(1, 1, 1, 0)";
        this.buffer.beginPath();
        this.buffer.fillStyle = c;
        this.buffer.arc(x, y, r, s, e);
        this.buffer.fill();
        this.buffer.closePath();
    }
    render() {
        this.ctx.drawImage(this.frame, 0, 0);
    }
    drawImage(image, x = 0, y = 0) {
        this.buffer.drawImage(image, x, y);
    }
}
