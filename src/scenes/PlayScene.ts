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
	score: number;
	lives: number;
	livesText: Phaser.GameObjects.Text;
	scoreText: Phaser.GameObjects.Text;

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
		// this.load.audio('music5', '/assets/sounds/.mp3');
	}

	create() {
		let centerX: number = GeneralConsts.SCREEN_WIDTH / 2;
		let centerY: number = GeneralConsts.SCREEN_HEIGHT / 2;
		this.score = 0;
		this.lives = 3;
		this.ballHit = this.sound.add('ballHit');
		this.damageSound = this.sound.add('damage');
		this.loseLife = this.sound.add('loseLife');
		// let music = this.sound.add('music5', {
		// 	loop: true,
		// 	volume: 0.1,
		// });
		// music.play();
		
		this.livesText = this.add.text(30, GeneralConsts.SCREEN_HEIGHT - 50, "Lives: 3", { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
		this.scoreText = this.add.text(250, GeneralConsts.SCREEN_HEIGHT - 50, "Score: 0", { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
		
		this.cursors = this.input.keyboard.createCursorKeys();
		
		let playerSprite = this.physics.add.image(centerX, GeneralConsts.SCREEN_HEIGHT - 140, 'player')
			.setImmovable(true)
			.setCollideWorldBounds(true);
		this.bottomBorder = this.physics.add.image(GeneralConsts.SCREEN_WIDTH, GeneralConsts.SCREEN_HEIGHT - 80, 'whitePixel')
			.setImmovable(true);
		this.bottomBorder.displayWidth = GeneralConsts.SCREEN_WIDTH;
		this.bottomBorder.displayHeight = 4;
		this.playerPaddle = new PlayerPaddle(this, playerSprite);

		// reason I'm using a list of images instead of a group is because I wasn't sure how to scale the images in a group
		this.brickList = [];
		for (let i = 0; i < 8; i++) {
			for (let j = 0; j < 14; j++) {
				let brickSprite = this.physics.add.image(30 + j * 70 + (i % 2) * 40, 70 + i * 30, 'bush')
					.setImmovable(true);
				this.brickList.push(new Brick(this, brickSprite, 8 - i));
			}
		}
		
		
		// initially I had the ball detect when it hits something and manually change direction, but then I found this method which is far more simple
		this.ballSprite = this.physics.add.image(centerX, centerY, 'ball')
			.setVelocity(BallConsts.DEFAULT_BALL_SPEED, BallConsts.DEFAULT_BALL_SPEED)
			.setBounce(1, 1)
			.setCollideWorldBounds(true);

		this.ball = new Ball(this, this.ballSprite);

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
			this.add_lives(-1);
			this.loseLife.play();
		}
		for (let i = 0; i < this.brickList.length; i++) {
			if (this.brickList[i] == null) {
				continue;
			}
			if (!this.brickList[i].sprite.body.touching.none) {
				this.damageSound.play();
				this.add_score(this.brickList[i].score);
				this.brickList[i].sprite.destroy();
				this.brickList[i] = null;
			}
		}
		// will make the ball move based on the player's momentum, so if you're moving left the ball will always go left and vice versa
		if (!this.playerPaddle.sprite.body.touching.none) {
			if (!this.cursors.left.isDown || !this.cursors.right.isDown) {
				if (this.cursors.left.isDown) {
					this.ballSprite.body.setVelocity(-this.ball.speed, -this.ball.speed);
				}
				if (this.cursors.right.isDown) {
					this.ballSprite.body.setVelocity(this.ball.speed, -this.ball.speed);
				}
			}
		}
	}
	
	add_score(value: number) {
		this.score += value;
		this.scoreText.setText("Score: " + this.score);
	}
	add_lives(value: number) {
		this.lives += value;
		this.livesText.setText("Lives: " + this.lives);
	}
}

export default GameScene;