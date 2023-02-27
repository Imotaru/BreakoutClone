import 'phaser';
import {GeneralConsts} from "./GeneralConsts";
import {Brick} from "./GameObjects/Brick";
import {Ball} from "./GameObjects/Ball";
import {PlayerPaddle} from "./GameObjects/PlayerPaddle";
import {SoundClip, SoundManager} from "./SoundManager";
import {BallConsts} from "./BallConsts";
import {Wolf} from "./GameObjects/Collectible/Wolf";

export class GameManager {
    // singleton so I can always access the GameManager from anywhere, without needing to pass a reference
    public static I: GameManager;
    
    // data
    public score: number;
    public lives: number;
    public isBallResting: boolean;
    public currentLevel: number;
    public bricksDestroyedThisLevel: number;

    // game objects and images
    bottomBorder: Phaser.GameObjects.Image;
    brickList: Array<Brick>;
    ball: Ball;
    playerPaddle: PlayerPaddle;

    // UI
    livesText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    levelText: Phaser.GameObjects.Text;
    
    // other
    soundManager: SoundManager;
    scene: Phaser.Scene;
    cursors: any;

    constructor(scene: Phaser.Scene, soundManager: SoundManager) {
        GameManager.I = this;
        this.scene = scene;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.soundManager = soundManager;
        this.isBallResting = true;
        this.currentLevel = 1;
        
        this.livesText = scene.add.text(30, GeneralConsts.SCREEN_HEIGHT - 50, "Lives: 3", { fontFamily: 'Arial', fontSize: 32, color: '#ff0000' });
        this.scoreText = scene.add.text(250, GeneralConsts.SCREEN_HEIGHT - 50, "Score: 0", { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
        this.levelText = scene.add.text(550, GeneralConsts.SCREEN_HEIGHT - 50, "Level 1: Artemis", { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        this.set_score(0);

        this.bottomBorder = scene.physics.add.image(GeneralConsts.SCREEN_WIDTH, GeneralConsts.SCREEN_HEIGHT - 80, 'whitePixel')
            .setImmovable(true);
        this.bottomBorder.displayWidth = GeneralConsts.SCREEN_WIDTH;
        this.bottomBorder.displayHeight = 4;

        this.playerPaddle = new PlayerPaddle(scene);
        this.ball = new Ball(scene);

        this.load_level(this.currentLevel);
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
    
    load_level(level: number) {
        this.soundManager.play_music(level);
        this.set_lives(3);
        this.bricksDestroyedThisLevel = 0;
        this.ball.reset_ball_speed();

        // reason I'm using a list of images instead of a group is because I wasn't sure how to scale the images in a group
        this.brickList = [];
        // todo brian use consts for all these magic numbers
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 14; j++) {
                let brickX = 30 + j * 70 + (i % 2) * 40;
                let brickY = 70 + i * 30;
                this.brickList.push(new Brick(this, brickX, brickY, 8 - i, () => {
                    if (Math.random() < 0.25) {
                        new Wolf(brickX, brickY);
                    }
                }));
            }
        }
        
        this.reset_ball();
    }
    
    increment_brick_destroy_count() {
        this.bricksDestroyedThisLevel++;
    }

    set_score(value: number) {
        this.score = value;
        this.scoreText.setText("Score: " + this.score);
    }
    set_lives(value: number) {
        this.lives = value;
        this.livesText.setText("Lives: " + this.lives);
    }
    
    // trigger_brick_destroy(i: number) {
    //     this.soundManager.play_sound(SoundClip.damage);
    //     this.set_score(this.score + this.brickList[i].score);
    //     if (Math.random() < 0.15) {
    //         new Wolf(this, this.brickList[i].sprite.body.x, this.brickList[i].sprite.body.y);
    //     }
    //     this.brickList[i].sprite.destroy();
    //     this.brickList[i] = null;
    //     this.increment_brick_destroy_count();
    // }
}