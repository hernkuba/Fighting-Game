const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.7
c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor({ position, velocity, color }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
    }

    create() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        //attack
        if (this.isAttacking) {
        c.fillStyle = "red"
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
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
    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
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
    },
    color: "blue"
})


const player2 = new Sprite({
    position: {
        x: 1024 - 50,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "pink"
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
    },
    ArrowUp: {
        pressed: false
    }
}

const animate = () => {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.refresh()
    player2.refresh()

    //player movement
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5
    }
    //player2 movement
    player2.velocity.x = 0
    if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
        player2.velocity.x = -5
    } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
        player2.velocity.x = 5
    }

    // detect colsion
    if (player.attackBox.position.x + player.attackBox.width >= player2.position.x && player.attackBox.position.x <= player2.position.x + player2.width && player.attackBox.position.y - 50 >= player2.position.y - player2.height &&
        player.isAttacking) {
        console.log("hit");
    }

};

animate();

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true
            player.lastKey = "d"
            break;
        case "a":
            keys.a.pressed = true
            player.lastKey = "a"
            break;
        case "w":
            player.velocity.y = -20
            break;
        case " ":
            player.attack()
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            player2.lastKey = "ArrowLeft"
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true
            player2.lastKey = "ArrowRight"
            break;
        case "ArrowUp":
            player2.velocity.y = -20
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
        case "ArrowUp":
            keys.ArrowUp.pressed = false
            break;
    }
    console.log(event.key);
})
