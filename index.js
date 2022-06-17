const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.3
c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
    }

    create() {
        c.fillStyle = "blue"
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    refresh() {
        this.create()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gravity
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})


const player2 = new Sprite({
    position: {
        x: 1024 - 50,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}

let lastKey

const animate = () => {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.refresh()
    player2.refresh()

    player.velocity.x = 0
    if (keys.a.pressed && lastKey === "a") {
        player.velocity.x = -3
    } else if (keys.d.pressed && lastKey === "d") {
        player.velocity.x = 3
    }

    player2.velocity.x = 0
    if (keys.ArrowLeft.pressed && lastKey === "ArrowLeft") {
        player2.velocity.x = -3
    } else if (keys.ArrowRight.pressed && lastKey === "ArrowRight") {
        player2.velocity.x = 3
    }
};

animate();

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true
            lastKey = "d"
            break;
        case "a":
            keys.a.pressed = true
            lastKey = "a"
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            lastKey = "ArrowLeft"
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true
            lastKey = "ArrowRight"
            break;
        case "w":
            player.velocity.y = -10
            break;
    }
    console.log(event.key);
})

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false
            break;
        case "a":
            keys.a.pressed = false
            break;
        case "w":
            keys.w.pressed = false
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false
            break;
    }
    console.log(event.key);
})
