import {GameManager} from "../GameManager";
import {SoundClip, SoundManager} from "../SoundManager";
import {LoseScreen} from "../GameObjects/LoseScreen";

class GameScene extends Phaser.Scene {
	constructor() {
    super({
			key: 'GameScene'
		});
	}
	
	preload() {
		// images
		this.load.image('player', '/assets/sprites/paddle.png');
		this.load.image('ball', '/assets/sprites/ball.png');
		this.load.image('ballYellow', '/assets/sprites/ballYellow.png');
		this.load.image('bush', '/assets/sprites/bush.png');
		this.load.image('cloud', '/assets/sprites/cloud.png');
		this.load.image('bonePile', '/assets/sprites/bonePile.png');
		this.load.image('whitePixel', '/assets/sprites/whitePixel.png');
		this.load.image('wolf', '/assets/sprites/wolf.png');
		this.load.image('stick', '/assets/sprites/stick.png');
		this.load.image('boneSpear', '/assets/sprites/boneSpear.png');
		this.load.image('panel', '/assets/sprites/panel.png');
		this.load.image('lightning', '/assets/sprites/lightningBolt.png');
		
		// sounds
		// @ts-ignore
		this.load.audio('ballHit', '/assets/sounds/ballHit.ogg');
		// @ts-ignore
		this.load.audio('loseLife', '/assets/sounds/loseLife.ogg');
		// @ts-ignore
		this.load.audio('damage', '/assets/sounds/damage.wav');
		// @ts-ignore
		this.load.audio('music1', '/assets/music/DST-ForestTheme1.mp3');
		// @ts-ignore
		this.load.audio('music2', '/assets/music/DST-Aethereal.mp3');
		// @ts-ignore
		this.load.audio('music3', '/assets/music/DST-DreamMaster.mp3');
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
		this.load.audio('bonespear1', '/assets/sounds/bonespear1.wav');
		// @ts-ignore
		this.load.audio('bonespear2', '/assets/sounds/bonespear2.wav');
		// @ts-ignore
		this.load.audio('bonespear3', '/assets/sounds/bonespear3.wav');
		// @ts-ignore
		this.load.audio('bonespearhit', '/assets/sounds/bonespearhit.wav');
		// @ts-ignore
		this.load.audio('wolfBite', '/assets/sounds/wolfBite.ogg');
		// @ts-ignore
		this.load.audio('stickDrop', '/assets/sounds/stickDrop.wav');
		// @ts-ignore
		this.load.audio('stickCollect', '/assets/sounds/stickCollect.wav');
		// @ts-ignore
		this.load.audio('lightning1', '/assets/sounds/lightning1.wav');
		// @ts-ignore
		this.load.audio('lightning2', '/assets/sounds/lightning2.wav');
		// @ts-ignore
		this.load.audio('lightning3', '/assets/sounds/lightning3.wav');
		// @ts-ignore
		this.load.audio('lightningBoltImpact', '/assets/sounds/LightningBoltImpact.ogg');
		// @ts-ignore
		this.load.audio('ballSpeedUp', '/assets/sounds/ballSpeedUp.wav');
		// @ts-ignore
		this.load.audio('levelComplete', '/assets/sounds/LevelComplete.ogg');
	}

	create() {
		new SoundManager(this);
		new GameManager(this);
	}
	
	update(time: number, delta:number) {
		if (GameManager.I.isLoseScreenOpen) {
			/* I'm using this JustDown method because the justDown property of the key didn't work for some reason,
			 * and I only want to trigger it once and not every frame
			 */
			if (Phaser.Input.Keyboard.JustDown(GameManager.I.cursors.up)) {
				LoseScreen.I.selection_up();
				SoundManager.I.play_sound(SoundClip.ballHit);
			} else if (Phaser.Input.Keyboard.JustDown(GameManager.I.cursors.down)) {
				LoseScreen.I.selection_down();
				SoundManager.I.play_sound(SoundClip.ballHit);
			} else if (GameManager.I.spacebar.isDown) {
				LoseScreen.I.select();
				SoundManager.I.play_sound(SoundClip.ballHit);
			}
			return;
		}
		
		/* I tried having the update function in the GameObjects themselves, but that doesn't seem to work.
		* Having every update function in here is not ideal, but since this project is quite small it's not a big deal.
		*/	
		GameManager.I.playerPaddle.player_update(delta);
		GameManager.I.ball.update_ball(delta);
		
		// if ball is resting then the up arrow make it start, until then the ball just follows the paddle on the x axis
		if (GameManager.I.isBallResting) {
			if (GameManager.I.cursors.up.isDown) {
				GameManager.I.ball.start_ball_moving();
			} else {
				GameManager.I.ball.image.x = GameManager.I.playerPaddle.image.x;
			}
		}
	}
}

export default GameScene;