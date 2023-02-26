import {Ball} from "../GameObjects/Ball";
import {GeneralConsts} from "../GeneralConsts";
import {PlayerPaddle} from "../GameObjects/PlayerPaddle";
import {BallConsts} from "../BallConsts";
import {Brick} from "../GameObjects/Brick";

class GameScene extends Phaser.Scene {
	ball: Ball;
	playerPaddle: PlayerPaddle;
	cursors: any;
	ballSprite: Phaser.GameObjects.Image;
	bottomBorder: Phaser.GameObjects.Image;
	ballHit: Phaser.Sound.BaseSound;
	loseLife: Phaser.Sound.BaseSound;
	damageSound: Phaser.Sound.BaseSound;
	brickList: Array<Brick>;

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
		// @ts-ignore
		this.load.audio('music5', '/assets/sounds/Hades - God of the Dead Second Half.mp3');
	}

	create() {
		let centerX: number = GeneralConsts.SCREEN_WIDTH / 2;
		let centerY: number = GeneralConsts.SCREEN_HEIGHT / 2;
		this.ballHit = this.sound.add('ballHit');
		this.damageSound = this.sound.add('damage');
		this.loseLife = this.sound.add('loseLife');
		let music = this.sound.add('music5', {
			loop: true,
			volume: 0.1,
		});
		music.play();
		
		
		this.cursors = this.input.keyboard.createCursorKeys();
		
		let playerSprite = this.physics.add.image(centerX, GeneralConsts.SCREEN_HEIGHT - 140, 'player')
			.setImmovable(true)
			.setCollideWorldBounds(true);
		this.bottomBorder = this.physics.add.image(GeneralConsts.SCREEN_WIDTH, GeneralConsts.SCREEN_HEIGHT - 80, 'whitePixel')
			.setImmovable(true);
		this.bottomBorder.displayWidth = GeneralConsts.SCREEN_WIDTH;
		this.bottomBorder.displayHeight = 4;
		this.playerPaddle = new PlayerPaddle(this, playerSprite);
		this.ballSprite = this.physics.add.image(centerX, centerY, 'ball')
			.setVelocity(BallConsts.DEFAULT_BALL_SPEED, BallConsts.DEFAULT_BALL_SPEED)
			.setBounce(1, 1)
			.setCollideWorldBounds(true);
		
		this.ball = new Ball(this, this.ballSprite);

		this.brickList = [];
		for (let i = 0; i < 10; i++) {
			let brickSprite = this.physics.add.image(100 + i * 70, 200, 'bush')
				.setImmovable(true);
			this.brickList.push(new Brick(this, brickSprite));
		}

		// @ts-ignore
		this.physics.add.collider(this.ballSprite, playerSprite);
		// @ts-ignore
		this.physics.add.collider(this.ballSprite, this.bottomBorder);
		for (let i = 0; i < this.brickList.length; i++) {
			// @ts-ignore
			this.physics.add.collider(this.ballSprite, this.brickList[i].sprite);
		}
	}
	
	update(time: number, delta:number) {
		this.playerPaddle.player_update(time, delta, this.cursors);
		if (!this.ballSprite.body.touching.none) {
			this.ballHit.play();
		}
		if (!this.bottomBorder.body.touching.none) {
			this.loseLife.play();
		}
		for (let i = 0; i < this.brickList.length; i++) {
			if (this.brickList[i] == null) {
				continue;
			}
			if (!this.brickList[i].sprite.body.touching.none) {
				this.damageSound.play();
				this.brickList[i].sprite.destroy();
				this.brickList[i] = null;
			}
		}
	}
}

export default GameScene;