import 'phaser';
import {GeneralConsts} from "./GeneralConsts";
import {Brick} from "./GameObjects/Brick";
import {Ball} from "./GameObjects/Ball";
import {PlayerPaddle} from "./GameObjects/PlayerPaddle";

export class GameManager {
    // data
    public score: number;
    public lives: number;
    public isBallResting: boolean;
    public currentLevel: number;

    // game objects and images
    bottomBorder: Phaser.GameObjects.Image;
    brickList: Array<Brick>;
    ball: Ball;
    playerPaddle: PlayerPaddle;

    // UI
    livesText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene) {
        this.isBallResting = true;
        this.currentLevel = 1;
        
        this.livesText = scene.add.text(30, GeneralConsts.SCREEN_HEIGHT - 50, "Lives: 3", { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
        this.scoreText = scene.add.text(250, GeneralConsts.SCREEN_HEIGHT - 50, "Score: 0", { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
        this.set_score(0);

        this.bottomBorder = scene.physics.add.image(GeneralConsts.SCREEN_WIDTH, GeneralConsts.SCREEN_HEIGHT - 80, 'whitePixel')
            .setImmovable(true);
        this.bottomBorder.displayWidth = GeneralConsts.SCREEN_WIDTH;
        this.bottomBorder.displayHeight = 4;

        this.playerPaddle = new PlayerPaddle(scene);
        this.ball = new Ball(scene);
        // @ts-ignore
        scene.physics.add.collider(this.ball.sprite, this.playerPaddle.sprite);
        // @ts-ignore
        scene.physics.add.collider(this.ball.sprite, this.bottomBorder);

        this.load_level(scene, this.currentLevel);
    }
    
    start_ball_moving(cursors: any) {
        this.isBallResting = false;
        this.ball.start_ball_moving(cursors);
    }
    
    reset_ball() {
        this.isBallResting = true;
        this.ball.sprite.y = this.playerPaddle.sprite.y - 27;
        this.ball.reset_ball();
    }
    
    load_level(scene: Phaser.Scene, level: number) {
        this.set_lives(3);

        // reason I'm using a list of images instead of a group is because I wasn't sure how to scale the images in a group
        this.brickList = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 14; j++) {
                let brickSprite = scene.physics.add.image(30 + j * 70 + (i % 2) * 40, 70 + i * 30, 'bush')
                    .setImmovable(true);
                this.brickList.push(new Brick(scene, brickSprite, 8 - i));
            }
        }

        for (let i = 0; i < this.brickList.length; i++) {
            // @ts-ignore
            scene.physics.add.collider(this.ball.sprite, this.brickList[i].sprite);
        }
        
        this.reset_ball();
    }

    set_score(value: number) {
        this.score = value;
        this.scoreText.setText("Score: " + this.score);
    }
    set_lives(value: number) {
        this.lives = value;
        this.livesText.setText("Lives: " + this.lives);
    }
}