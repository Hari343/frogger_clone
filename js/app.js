// Some global variables
let award = 0, oldAward = 0, x = 0;

// The update() method is to update the game object's position and the render() method is used to render them on-screen
class Enemy {
	constructor(x, y, v) {
		this.x = x;
		this.y = y;
		this.v = v;
		this.sprite = 'images/enemy-bug.png';
	}
	update(dt) {
		this.x = this.x + this.v * dt;
		// To loop enemies continuosly,
		if(this.x > 1111) {
			this.x = -101;
			this.v = Math.random() * 500 + 50;
		}
		// Collison detection algorithm
	    if (((player.x < this.x + 80) && (player.x > this.x - 60)) && ((player.y < this.y + 45) && (player.y > this.y - 45))) {
	        let laser = new Sound("laser.wav", 0.6);
	        laser.play();
	        player.x = 505;
	        player.y= 639;
	        award = 0;
	    }	
	}
	render() {
    	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);	
	}
}

class Player {
	constructor(x, y) {
		this.x = x;
    	this.y = y;
    	this.sprite = 'images/char-boy.png';
	}
	update() {
	    if (this.y > 639) {
        this.y = 639;
	    }
	    if (this.y < 83) {
	        this.y = 639;
	        this.x = 505;
	        let success = new Sound("success.wav", 0.6);
	        success.play();
	        award++;
	    }
	    if (this.x > 1010) {
	        this.x = 1010;
	    }
	    if (this.x < 0) {
	        this.x = 0;
	    }
	}
	handleInput(key) {
	    if (key == 'left') {
	        this.x = this.x - 101;
	        // This logic is for the player to avoid the rock!
	        if (this.x == 909 && this.y == 639) { 
	            this.x = this.x + 101;
	        }
	    }
	    else if (key == 'right') {
	        this.x = this.x + 101;
	        if (this.x == 909 && this.y == 639) {
	            this.x = this.x - 101;
	        }
	    }
	    else if (key == 'up') {
	        this.y = this.y - 83;
	        if (this.x == 909 && this.y == 639) {
	            this.y = this.y + 83;
	        }
	    }
	    else if (key == 'down') {
	        this.y = this.y + 83;
	        if (this.x == 909 && this.y == 639) {
	            this.y = this.y - 83;
	        }
	    }
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Star {
	constructor(x, y) {
		this.x = x;
    	this.y = y;
    	this.sprite = 'images/Star.png';
	}
	render() {
    	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Sound {
	constructor(str, vol = 1, loop = false) {
		this.sound = document.createElement("audio");
		this.sound.src = str;
		this.sound.volume = vol;
		this.sound.setAttribute("preload", "auto");
		this.sound.setAttribute("controls", "none");
		if (loop == true) {
			this.sound.setAttribute("loop", "loop");
		}
		this.sound.style.display = "none";
		document.body.appendChild(this.sound);	
	}

	play() {
		this.sound.play();
	}

	stop() {
		this.sound.pause();
	}
}

// Instantiate the objects
let allEnemies = [];
let initialPositions = [143, 226, 309, 392, 475]; // The y coordinates of the initial enemy postions
for (let y of initialPositions) {
    let enemy = new Enemy(0, y, Math.random() * 500 + 50);
    allEnemies.push(enemy);
}

let player = new Player(505, 639);

let allStars = [];

let music = new Sound("music.mp3", 0.5, true);
music.play();

// Keypresses!
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});