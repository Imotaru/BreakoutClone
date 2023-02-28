import 'phaser';
import {BallConsts} from "../BallConsts";
import {GeneralConsts} from "../GeneralConsts";
import {GameManager} from "../GameManager";
import {SoundClip, SoundManager} from "../SoundManager";

export class Ball extends Phaser.GameObjects.GameObject {
    public speed: number;
    public image: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 'ball');
        this.image = scene.physics.add.image(GeneralConsts.SCREEN_CENTER_X, GeneralConsts.SCREEN_CENTER_Y, 'ball')
            .setVelocity(BallConsts.DEFAULT_BALL_SPEED, BallConsts.DEFAULT_BALL_SPEED)
            .setBounce(1, 1)
            .setCollideWorldBounds(true);
        this.speed = BallConsts.DEFAULT_BALL_SPEED;
        this.image.displayWidth = 18;
        this.image.displayHeight = 18;

        // @ts-ignore
        scene.physics.add.collider(GameManager.I.playerPaddle.image, this.image, () => {
            // comparing the y values to make sure the ball is hitting the top of the paddle and not the side
            if (this.image.y <= GameManager.I.playerPaddle.image.y) {
                // if the paddle has momentum we want to move the ball in the same direction
                let leftDown = GameManager.I.cursors.left.isDown;
                let rightDown = GameManager.I.cursors.right.isDown;
                if (!leftDown || !rightDown) {
                    if (leftDown) {
                        this.image.body.setVelocity(-this.speed, -this.speed);
                    } else if (rightDown) {
                        this.image.body.setVelocity(this.speed, -this.speed);
                    }
                }
                SoundManager.I.play_sound(SoundClip.ballHit);
            }
        });

        // @ts-ignore
        scene.physics.add.collider(GameManager.I.bottomBorder, this.image, () => {
            if (!GameManager.I.bottomBorder.body.touching.none) {
                GameManager.I.set_lives(GameManager.I.lives - 1);
                SoundManager.I.play_sound(SoundClip.loseLife);
                GameManager.I.reset_ball();
            }
        });
    }
    
    reset_ball() {
        this.image.body.setVelocity(0, 0);
    }

    reset_ball_speed() {
        this.speed = BallConsts.DEFAULT_BALL_SPEED;
    }
    
    modify_ball_speed(value: number) {
        this.speed += value;
        let newX;
        if (this.image.body.velocity.x > 0) {
            newX = this.speed + value;
        } else {
            newX = -this.speed - value;
        }
        let newY;
        if (this.image.body.velocity.y > 0) {
            newY = this.speed + value;
        } else {
            newY = -this.speed - value;
        }
        this.image.body.setVelocity(newX, newY)
    }
    
    start_ball_moving() {
        // if the paddle has momentum we want to move the ball in the same direction
        let leftDown = GameManager.I.cursors.left.isDown;
        let rightDown = GameManager.I.cursors.right.isDown;
        if (!leftDown || !rightDown) {
            if (leftDown) {
                this.image.body.setVelocity(-this.speed, -this.speed);
                return;
            } else if (rightDown) {
                this.image.body.setVelocity(this.speed, -this.speed);
                return;
            }
        }
        // if paddle has no momentum the ball starts in a random direction
        this.image.body.setVelocity(Math.random() <= 0.5 ? -this.speed : this.speed, -this.speed);
    }
}