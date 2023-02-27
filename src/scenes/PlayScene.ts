import {GameManager} from "../GameManager";
import {SoundClip, SoundManager} from "../SoundManager";

class GameScene extends Phaser.Scene {
	gm: GameManager;
	soundManager: SoundManager;

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
		this.load.image('wolf', '/assets/sprites/wolf.png');
		// @ts-ignore
		this.load.audio('ballHit', '/assets/sounds/ballHit.ogg');
		// @ts-ignore
		this.load.audio('loseLife', '/assets/sounds/loseLife.ogg');
		// @ts-ignore
		this.load.audio('damage', '/assets/sounds/damage.wav');
		// @ts-ignore
		this.load.audio('music1', '/assets/music/DST-ForestTheme1.mp3');
		// @ts-ignore
		this.load.audio('wolf1', '/assets/sounds/wolf1.ogg');
		// @ts-ignore
		this.load.audio('wolf2', '/assets/sounds/wolf2.ogg');
		// @ts-ignore
		this.load.audio('wolf3', '/assets/sounds/wolf3.ogg');
		// @ts-ignore
		this.load.audio('wolf4', '/assets/sounds/wolf4.ogg');
		// @ts-ignore
		this.load.audio('wolf5', '/assets/sounds/wolf5.ogg');
		// @ts-ignore
		this.load.audio('wolf6', '/assets/sounds/wolf6.ogg');
		// @ts-ignore
		this.load.audio('wolfBite', '/assets/sounds/wolfBite.ogg');
	}

	create() {
		this.soundManager = new SoundManager(this);
		this.gm = new GameManager(this, this.soundManager);
	}
	
	update(time: number, delta:number) {
		this.gm.playerPaddle.player_update(time, delta, this.gm.cursors);
		
		// if ball is resting then the up arrow make it start, else the ball just follows the paddle on the x axis
		if (this.gm.isBallResting) {
			if (this.gm.cursors.up.isDown) {
				this.gm.start_ball_moving(this.gm.cursors);
			}
			this.gm.ball.sprite.x = this.gm.playerPaddle.sprite.x;
		}
	}
}

export default GameScene;