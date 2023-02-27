import 'phaser';
import {GeneralConsts} from "./GeneralConsts";
import {Brick} from "./GameObjects/Brick";
import {Ball} from "./GameObjects/Ball";
import {PlayerPaddle} from "./GameObjects/PlayerPaddle";
import {SoundManager} from "./SoundManager";
import {Wolf} from "./GameObjects/Collectible/Wolf";
import {LoseScreen} from "./GameObjects/LoseScreen";
import {BrickConsts} from "./BrickConsts";

export class GameManager {
    // singleton so I can always access the GameManager from anywhere, without needing to pass a reference
    public static I: GameManager;
    
    // data
    public score: number;
    public lives: number;
    public isBallResting: boolean;
    public isLoseScreenOpen: boolean;
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
    scene: Phaser.Scene;
    cursors: any;
    spacebar: any;

    constructor(scene: Phaser.Scene) {
        GameManager.I = this;
        this.scene = scene;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.isBallResting = true;
        this.currentLevel = 1;
        
        this.livesText = scene.add.text(30, GeneralConsts.SCREEN_HEIGHT - 50, "Lives: 3", { fontFamily: 'Arial', fontSize: 32, color: '#ff0000' });
        this.scoreText = scene.add.text(250, GeneralConsts.SCREEN_HEIGHT - 50, "Score: 0", { fontFamily: 'Arial', fontSize: 32, color: '#ffffff' });
        this.levelText = scene.add.text(550, GeneralConsts.SCREEN_HEIGHT - 50, "Level 1", { fontFamily: 'Arial', fontSize: 32, color: '#00ff00' });
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
        this.ball.sprite.y = this.playerPaddle.sprite.y - 27;
        this.ball.reset_ball();
    }
    
    load_level(level: number) {
        if (level <= 0 || level > GeneralConsts.MAX_LEVEL) {
            return;
        }
        
        this.currentLevel = level;
        this.levelText.setText("Level: " + level)
        
        if (this.brickList != null) {
            for (let i = 0; i < this.brickList.length; i++) {
                if (this.brickList[i] != null) {
                    this.brickList[i].sprite.destroy();
                    this.brickList[i].destroy();
                }
            }
        }
        this.spawn_bricks();
        
        SoundManager.I.play_music(level);
        this.set_lives(3);
        this.bricksDestroyedThisLevel = 0;
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
        this.bricksDestroyedThisLevel++;
    }

    set_score(value: number) {
        this.score = value;
        this.scoreText.setText("Score: " + this.score);
    }
    set_lives(value: number) {
        this.lives = value;
        this.livesText.setText("Lives: " + this.lives);
        if (this.lives <= 2) {
            this.show_lose_screen();
        }
    }
    
    private show_lose_screen() {
        this.isLoseScreenOpen = true;
        this.playerPaddle.sprite.body.setVelocity(0, 0);
        new LoseScreen();
    }
}