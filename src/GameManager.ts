import 'phaser';
import {GeneralConsts} from "./GeneralConsts";
import {Brick} from "./GameObjects/Brick";
import {Ball} from "./GameObjects/Ball";
import {PlayerPaddle} from "./GameObjects/PlayerPaddle";
import {SoundManager} from "./SoundManager";
import {LoseScreen} from "./GameObjects/LoseScreen";
import {BrickConsts} from "./BrickConsts";
import {Collectible} from "./GameObjects/Collectible/Collectible";

export class GameManager {
    // singleton so I can always access the GameManager from anywhere, without needing to pass a reference
    public static I: GameManager;
    
    // data
    public score: number;
    public lives: number;
    public isBallResting: boolean;
    public isLoseScreenOpen: boolean;
    public currentLevel: number;
    bricksDestroyedThisLevel: number;
    bricksRequired: number;
    totalBricks: number;

    // game objects and images
    bottomBorder: Phaser.GameObjects.Image;
    brickList: Array<Brick>;
    collectibleList: Array<Collectible>;
    ball: Ball;
    playerPaddle: PlayerPaddle;

    // UI
    livesText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    levelText: Phaser.GameObjects.Text;
    progressText: Phaser.GameObjects.Text;
    
    // other
    scene: Phaser.Scene;
    cursors: any;
    spacebar: any;

    constructor(scene: Phaser.Scene) {
        GameManager.I = this;
        this.scene = scene;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.isBallResting = true;
        this.collectibleList = [];
        this.currentLevel = 1; // todo reset
        
        this.livesText = scene.add.text(30, GeneralConsts.SCREEN_HEIGHT - 50, "", { fontFamily: 'Arial', fontSize: 32, color: '#ff0000' });
        this.scoreText = scene.add.text(200, GeneralConsts.SCREEN_HEIGHT - 50, "", { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
        this.levelText = scene.add.text(430, GeneralConsts.SCREEN_HEIGHT - 50, "", { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
        this.progressText = scene.add.text(660, GeneralConsts.SCREEN_HEIGHT - 50, "", { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
        this.set_score(0);

        this.bottomBorder = scene.physics.add.image(GeneralConsts.SCREEN_WIDTH, GeneralConsts.SCREEN_HEIGHT - 80, 'whitePixel')
            .setImmovable(true);
        this.bottomBorder.displayWidth = GeneralConsts.SCREEN_WIDTH;
        this.bottomBorder.displayHeight = 4;

        this.playerPaddle = new PlayerPaddle(scene);
        this.ball = new Ball(scene);

        this.load_level(this.currentLevel);
    }
    
    start_ball_moving() {
        this.isBallResting = false;
        this.ball.start_ball_moving();
    }
    
    reset_ball() {
        this.isBallResting = true;
        this.ball.image.y = this.playerPaddle.image.y - 27;
        this.ball.reset_ball();
    }
    
    load_level(level: number) {
        if (level <= 0 || level > GeneralConsts.MAX_LEVEL) {
            return;
        }
        
        this.currentLevel = level;
        this.levelText.setText(`Level: ${level}`);

        if (this.brickList != null) {
            for (let i = 0; i < this.brickList.length; i++) {
                if (this.brickList[i] != null) {
                    this.brickList[i].image.destroy();
                    this.brickList[i].destroy();
                }
            }
        }
        this.spawn_bricks();
        
        for (let i = 0; i < this.collectibleList.length; i++) {
            if (this.collectibleList[i] != null) {
                this.collectibleList[i].image.destroy();
                this.collectibleList[i].destroy();
            }
        }
        
        SoundManager.I.play_music(level);
        this.set_lives(3);
        this.totalBricks = BrickConsts.ROW_AMOUNTS[this.currentLevel - 1] * BrickConsts.COLUMN_AMOUNT;
        this.bricksRequired = this.totalBricks * BrickConsts.BRICK_PERCENTAGE_REQUIRED;
        this.set_brick_destroy_count(0);
        this.ball.reset_ball_speed();
        this.playerPaddle.reset_width();
        this.reset_ball();
    }
    
    spawn_bricks() {
        this.brickList = [];
        let rows = BrickConsts.ROW_AMOUNTS[this.currentLevel - 1];
        
        // reason I'm using a list of images instead of a group is because I wasn't sure how to scale the images in a group
        for (let i = 0; i < rows; i++) {
            let xRoll = Math.random();
            let yRoll = Math.random();
            for (let j = 0; j < BrickConsts.COLUMN_AMOUNT; j++) {
                let brickX = BrickConsts.BRICK_START_X + j * BrickConsts.BRICK_STEP_X + xRoll * BrickConsts.BRICK_RANDOM_ROW_OFFSET_X;
                let brickY = BrickConsts.BRICK_START_Y + i * BrickConsts.BRICK_STEP_Y + yRoll * BrickConsts.BRICK_RANDOM_ROW_OFFSET_Y;
                this.brickList.push(new Brick(this, brickX, brickY, rows - i, BrickConsts.BRICK_SPRITES[this.currentLevel - 1], () => {
                    BrickConsts.BRICK_DESTRUCTION_CALLBACKS[this.currentLevel - 1](brickX, brickY);
                }));
            }
        }
    }
    
    increment_brick_destroy_count() {
        this.set_brick_destroy_count(this.bricksDestroyedThisLevel + 1);
    }
    
    set_brick_destroy_count(value: number) {
        this.bricksDestroyedThisLevel = value;
        if (this.bricksDestroyedThisLevel >= this.bricksRequired) {
            if (this.currentLevel < GeneralConsts.MAX_LEVEL) {
                this.load_level(this.currentLevel + 1);
            }
        }
        this.progressText.setText(`Progress: ${Math.floor(100 * this.bricksDestroyedThisLevel / this.totalBricks)}% / ${Math.floor(BrickConsts.BRICK_PERCENTAGE_REQUIRED * 100)}%`)
    }

    set_score(value: number) {
        this.score = value;
        this.scoreText.setText(`Score: ${this.score}`);
    }
    set_lives(value: number) {
        this.lives = value;
        this.livesText.setText(`Lives: ${this.lives}`);
        if (this.lives <= 0) {
            this.show_lose_screen();
        }
    }
    
    private show_lose_screen() {
        this.isLoseScreenOpen = true;
        this.playerPaddle.image.body.setVelocity(0, 0);
        new LoseScreen();
    }
}