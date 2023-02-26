import 'phaser';
import {BallConsts} from "../BallConsts";
import {GeneralConsts} from "../GeneralConsts";
import {PlayerPaddle} from "./PlayerPaddle";

export class Ball extends Phaser.GameObjects.GameObject {
    public speed: number;
    public sprite: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 'ball');
        this.sprite = scene.physics.add.image(GeneralConsts.SCREEN_WIDTH / 2, GeneralConsts.SCREEN_HEIGHT / 2, 'ball')
            .setVelocity(BallConsts.DEFAULT_BALL_SPEED, BallConsts.DEFAULT_BALL_SPEED)
            .setBounce(1, 1)
            .setCollideWorldBounds(true);
        this.speed = BallConsts.DEFAULT_BALL_SPEED;
        this.sprite.displayWidth = 24;
        this.sprite.displayHeight = 24;
    }
    
    reset_ball() {
        this.sprite.body.setVelocity(0, 0);
    }
    
    start_ball_moving(cursors: any) {
        if (!cursors.left.isDown || !cursors.right.isDown) {
            if (cursors.left.isDown) {
                this.sprite.body.setVelocity(-this.speed, -this.speed);
                return;
            }
            if (cursors.right.isDown) {
                this.sprite.body.setVelocity(this.speed, -this.speed);
                return;
            }
        }
        // if paddle has no momentum the ball starts in a random direction
        this.sprite.body.setVelocity(Math.random() <= 0.5 ? -this.speed : this.speed, -this.speed);
    }
}