import 'phaser';
import {BallConsts} from "../BallConsts";
import {GeneralConsts} from "../GeneralConsts";
import {GameManager} from "../GameManager";
import {SoundClip, SoundManager} from "../SoundManager";

export class Ball extends Phaser.GameObjects.GameObject {
    public speed: number;
    public image: Phaser.GameObjects.Image;
    public temporarySpeedBoost: number;
    public temporarySpeedBoostDuration: number;
    
    constructor(scene: Phaser.Scene) {
        super(scene, BallConsts.DEFAULT_BALL_TEXTURE);
        this.image = scene.physics.add.image(GeneralConsts.SCREEN_CENTER_X, GeneralConsts.SCREEN_CENTER_Y, BallConsts.DEFAULT_BALL_TEXTURE)
            .setVelocity(BallConsts.DEFAULT_BALL_SPEED, BallConsts.DEFAULT_BALL_SPEED)
            .setBounce(1, 1)
            .setCollideWorldBounds(true);
        this.speed = BallConsts.DEFAULT_BALL_SPEED;
        this.image.displayWidth = BallConsts.BALL_SIZE;
        this.image.displayHeight = BallConsts.BALL_SIZE;
        this.temporarySpeedBoost = 0;
        this.temporarySpeedBoostDuration = 0;

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

        scene.physics.add.collider(GameManager.I.bottomBorder, this.image, () => {
            if (!GameManager.I.bottomBorder.body.touching.none) {
                GameManager.I.set_lives(GameManager.I.lives - 1);
                SoundManager.I.play_sound(SoundClip.loseLife);
                this.rest_ball();
                GameManager.I.set_hint_text_active(true);
            }
        });
    }
    
    rest_ball() {
        this.end_temporary_speed_boost();
        this.image.body.setVelocity(0, 0);
        GameManager.I.isBallResting = true;
        this.image.x = GameManager.I.playerPaddle.image.x;
        this.image.y = GameManager.I.playerPaddle.image.y + BallConsts.BALL_REST_Y_OFFSET;
    }

    reset_ball_speed() {
        this.end_temporary_speed_boost();
        this.speed = BallConsts.DEFAULT_BALL_SPEED;
    }
    
    modify_ball_speed(value: number) {
        this.speed += value;
        let newX;
        if (this.image.body.velocity.x > 0) {
            newX = this.speed;
        } else {
            newX = -this.speed;
        }
        let newY;
        if (this.image.body.velocity.y > 0) {
            newY = this.speed;
        } else {
            newY = -this.speed;
        }
        this.image.body.setVelocity(newX, newY)
    }
    
    temporarily_increase_ball_speed(speedIncrease: number, duration: number) {
        SoundManager.I.play_sound(SoundClip.ballSpeedUp);
        if (this.temporarySpeedBoost > 0) {
            // if the speed boost is the same we add the duration, else we just overwrite the old one
            if (speedIncrease == this.temporarySpeedBoost) {
                this.temporarySpeedBoostDuration += duration;
            } else {
                this.end_temporary_speed_boost();
            }
            return;
        }
        this.temporarySpeedBoost = speedIncrease;
        this.temporarySpeedBoostDuration = duration;
        this.modify_ball_speed(speedIncrease);
        this.image.setTexture(BallConsts.SPEED_BOOSTED_BALL_TEXTURE)
    }
    
    private end_temporary_speed_boost() {
        if (this.temporarySpeedBoost == 0) {
            return;
        }
        this.modify_ball_speed(-this.temporarySpeedBoost);
        this.temporarySpeedBoost = 0;
        this.temporarySpeedBoostDuration = 0;
        this.image.setTexture(BallConsts.DEFAULT_BALL_TEXTURE)
    }
    
    start_ball_moving() {
        GameManager.I.isBallResting = false;
        GameManager.I.set_hint_text_active(false);
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
    
    update_ball(delta: number) {
        if (this.temporarySpeedBoost > 0) {
            if (this.temporarySpeedBoostDuration <= 0) {
                this.end_temporary_speed_boost();
            } else {
                this.temporarySpeedBoostDuration = Math.max(this.temporarySpeedBoostDuration - delta, 0);
            }
            return;
        }
    }
}