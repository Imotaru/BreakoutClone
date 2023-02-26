import {Ball} from "../GameObjects/Ball";
import {GeneralConsts} from "../GeneralConsts";
import {PlayerPaddle} from "../GameObjects/PlayerPaddle";
import {BallConsts} from "../BallConsts";

class GameScene extends Phaser.Scene {
	ball: Ball;
	playerPaddle: PlayerPaddle;
	cursors: any;
	ballSprite: Phaser.GameObjects.Image;

	constructor() {
    super({
			key: 'GameScene'
		});
	}
	
	preload() {
		this.load.image('player', '/assets/sprites/paddle.png');
		this.load.image('ball', '/assets/sprites/ball.png');
		this.load.image('bush', '/assets/sprites/bush.png');
	}

	create() {
		let centerX: number = GeneralConsts.SCREEN_WIDTH / 2;
		let centerY: number = GeneralConsts.SCREEN_HEIGHT / 2;
		let playerY = GeneralConsts.SCREEN_HEIGHT - 100;
		
		this.cursors = this.input.keyboard.createCursorKeys();
		
		let playerSprite = this.physics.add.image(centerX, GeneralConsts.SCREEN_HEIGHT - 100, 'player')
			.setImmovable(true)
			.setCollideWorldBounds(true);
		this.playerPaddle = new PlayerPaddle(this, centerX, playerY, playerSprite, this.physics);
		this.ballSprite = this.physics.add.image(centerX, centerY, 'ball')
			.setVelocity(BallConsts.DEFAULT_BALL_SPEED, BallConsts.DEFAULT_BALL_SPEED)
			.setBounce(1, 1)
			.setCollideWorldBounds(true);
		
		this.ball = new Ball(this, centerX, centerY, this.ballSprite, this.playerPaddle, this.physics);

		let group = this.physics.add.staticGroup();
		group.createMultiple({
			key: 'bush',
			frameQuantity: 0,
			active: true,
			visible: true,
		});

		Phaser.Actions.PlaceOnRectangle(group.getChildren(), new Phaser.Geom.Rectangle(84, 84, 616, 416));
		group.refresh();

		// @ts-ignore
		this.physics.add.collider(this.ballSprite, group);
		// @ts-ignore
		this.physics.add.collider(this.ballSprite, playerSprite);
	}
	
	update(time: number, delta:number) {
		this.playerPaddle.player_update(time, delta, this.cursors);
		this.ballSprite.body.debugBodyColor = this.ballSprite.body.touching.none ? 0x0099ff : 0xff9900;
	}
}

export default GameScene;