const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
const count = 1200;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 0.5;

        this.speed = Math.random() * 0.03 + 0.01;

        this.targetX = 0;
        this.targetY = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "#ff1744";
        ctx.fill();
    }

    update() {
        this.x += (this.targetX - this.x) * this.speed;
        this.y += (this.targetY - this.y) * this.speed;

        this.draw();
    }
}

for (let i = 0; i < count; i++) {
    particles.push(new Particle());
}

function createHeart() {

    for (let i = 0; i < particles.length; i++) {

        let t = Math.random() * Math.PI * 2;

        let x = 16 * Math.pow(Math.sin(t), 3);
        let y =
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t);

        let scale = Math.min(canvas.width, canvas.height) / 40;

        particles[i].targetX =
            canvas.width / 2 + x * scale + (Math.random() - 0.5) * 80;

        particles[i].targetY =
            canvas.height / 2 - y * scale + (Math.random() - 0.5) * 80;
    }
}

createHeart();

function animate() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    createHeart();
});