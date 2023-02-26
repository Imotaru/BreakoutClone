import {GameManager} from "../GameManager";
import {SoundClip, SoundManager} from "../SoundManager";

class GameScene extends Phaser.Scene {
	// scripts
	gm: GameManager;
	soundManager: SoundManager;
	
	// input
	cursors: any;

	constructor() {
    super({
			key: 'GameScene'
		});
	}
	
	preload() {
		this.load.image('player', '/assets/sprites/paddle.png');
		this.load.image('ball', '/assets/sprites/ball.png');
		this.load.image('bush', '/assets/sprites/bush.png');
		this.load.image('whitePixel', '/assets/sprites/whitePixel.png');
		// @ts-ignore
		this.load.audio('ballHit', '/assets/sounds/ballHit.ogg');
		// @ts-ignore
		this.load.audio('loseLife', '/assets/sounds/loseLife.ogg');
		// @ts-ignore
		this.load.audio('damage', '/assets/sounds/damage.wav');
	}

	create() {
		this.gm = new GameManager(this);
		this.soundManager = new SoundManager(this);
		this.cursors = this.input.keyboard.createCursorKeys();
	}
	
	update(time: number, delta:number) {
		this.gm.playerPaddle.player_update(time, delta, this.cursors);
		
		// if ball is resting then the up arrow make it start, else the ball just follows the paddle on the x axis
		if (this.gm.isBallResting) {
			if (this.cursors.up.isDown) {
				this.gm.start_ball_moving(this.cursors);
			}
			this.gm.ball.sprite.x = this.gm.playerPaddle.sprite.x;
			// we return because the logic below only matters if the ball is in play, so it's better for performance to return here
			return;
		}
		
		// checking if ball collides with something, if so we play a sound
		if (!this.gm.ball.sprite.body.touching.none) {
			this.soundManager.play_sound(SoundClip.ballHit);
		}
		
		// checking if ball collides with bottom
		if (!this.gm.bottomBorder.body.touching.none) {
			this.gm.set_lives(this.gm.lives - 1);
			this.soundManager.play_sound(SoundClip.loseLife);
			this.gm.reset_ball();
		}

		// checking if ball collides with a brick
		for (let i = 0; i < this.gm.brickList.length; i++) {
			if (this.gm.brickList[i] == null) {
				continue;
			}
			if (!this.gm.brickList[i].sprite.body.touching.none) {
				this.soundManager.play_sound(SoundClip.damage);
				this.gm.set_score(this.gm.score + this.gm.brickList[i].score);
				this.gm.brickList[i].sprite.destroy();
				this.gm.brickList[i] = null;
			}
		}

		// will make the ball move based on the player's momentum, so if you're moving left the ball will always go left and vice versa
		if (!this.gm.playerPaddle.sprite.body.touching.none) {
			if (!this.cursors.left.isDown || !this.cursors.right.isDown) {
				if (this.cursors.left.isDown) {
					this.gm.ball.sprite.body.setVelocity(-this.gm.ball.speed, -this.gm.ball.speed);
				}
				if (this.cursors.right.isDown) {
					this.gm.ball.sprite.body.setVelocity(this.gm.ball.speed, -this.gm.ball.speed);
				}
			}
		}
	}
}

export default GameScene;