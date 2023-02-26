import {Ball} from "../GameObjects/Ball";
import {GeneralConsts} from "../GeneralConsts";
import {PlayerPaddle} from "../GameObjects/PlayerPaddle";
import {BallConsts} from "../BallConsts";
import {Brick} from "../GameObjects/Brick";
import {GameManager} from "../GameManager";
import {SoundClip, SoundManager} from "../SoundManager";

class GameScene extends Phaser.Scene {
	// scripts
	gameManager: GameManager;
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
		this.gameManager = new GameManager(this);
		this.soundManager = new SoundManager(this);
		this.cursors = this.input.keyboard.createCursorKeys();
	}
	
	update(time: number, delta:number) {
		this.gameManager.playerPaddle.player_update(time, delta, this.cursors);
		
		if (this.gameManager.isBallResting) {
			if (this.cursors.up.isDown) {
				this.gameManager.start_ball_moving(this.cursors);
			}
			this.gameManager.ball.sprite.x = this.gameManager.playerPaddle.sprite.x;
			return;
		}
		
		if (!this.gameManager.ball.sprite.body.touching.none) {
			this.soundManager.play_sound(SoundClip.ballHit);
		}
		if (!this.gameManager.bottomBorder.body.touching.none) {
			this.gameManager.set_lives(this.gameManager.lives - 1);
			this.soundManager.play_sound(SoundClip.loseLife);
			this.gameManager.reset_ball();
		}
		for (let i = 0; i < this.gameManager.brickList.length; i++) {
			if (this.gameManager.brickList[i] == null) {
				continue;
			}
			if (!this.gameManager.brickList[i].sprite.body.touching.none) {
				this.soundManager.play_sound(SoundClip.damage);
				this.gameManager.set_score(this.gameManager.score + this.gameManager.brickList[i].score);
				this.gameManager.brickList[i].sprite.destroy();
				this.gameManager.brickList[i] = null;
			}
		}
		// will make the ball move based on the player's momentum, so if you're moving left the ball will always go left and vice versa
		if (!this.gameManager.playerPaddle.sprite.body.touching.none) {
			if (!this.cursors.left.isDown || !this.cursors.right.isDown) {
				if (this.cursors.left.isDown) {
					this.gameManager.ball.sprite.body.setVelocity(-this.gameManager.ball.speed, -this.gameManager.ball.speed);
				}
				if (this.cursors.right.isDown) {
					this.gameManager.ball.sprite.body.setVelocity(this.gameManager.ball.speed, -this.gameManager.ball.speed);
				}
			}
		}
	}
}

export default GameScene;