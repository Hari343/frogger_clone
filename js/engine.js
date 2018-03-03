let Engine = (function(global) {
	let doc = global.document,
	    win = global.window,
	    canvas = doc.createElement("canvas"),
	    ctx = canvas.getContext("2d"),
	    lastTime;

	canvas.width = 1111;
	canvas.height = 873;
	doc.body.appendChild(canvas);

	function main() {
		let now = Date.now(),
			dt = (now - lastTime) / 1000.0;

		update(dt);
		render();

		lastTime = now;
		win.requestAnimationFrame(main);
	}

	function init() {
		reset();
		lastTime = Date.now();
		main();
	}

	function update(dt) {
		updateEntities(dt);
	}

	function updateEntities(dt) {
		for (let enemy of allEnemies) {
			enemy.update(dt);
		}
		player.update();
	}

	function render() {
        let rowImages = [
                'images/water-block.png',   // Top  2 rows are water
                'images/water-block.png',
                'images/stone-block.png',   // 5 rows of stone
                'images/stone-block.png',   
                'images/stone-block.png',   
                'images/stone-block.png',   
                'images/stone-block.png',   
                'images/grass-block.png',   // Final 2 rows are grass
                'images/grass-block.png'    
            ],
            numRows = 9,
            numCols = 11,
            row, col;

        ctx.clearRect(0,0,canvas.width,canvas.height)

        for (row = 0; row < numRows; row++) {
        	for (col = 0; col < numCols; col++) {
        		ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        	}
        }

        ctx.drawImage(Resources.get('images/Rock.png'), 909, 627);
        renderEntities();
	}

	function renderEntities() {
		for (let enemy of allEnemies) {
			enemy.render();
		}

		player.render();

		if ((oldAward != award) && (oldAward != 9999)) {
			x = 0 + oldAward * 101;
			let star = new Star(x, 0);
			allStars.push(star);
			oldAward = award;
			if (award == 5) {
				window.alert("Congratulations! You have won\u{1F643}");
				oldAward = 9999;
			}
		}
		if (award == 0) {
			allStars = [];
			oldAward = 0;
		}
		for (let star of allStars) {
			star.render();
		}
	}

	function reset() {
		// this function does nothing... yet.
	}

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-pink-girl.png',
        'images/Star.png',
        'images/Rock.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;

})(this);