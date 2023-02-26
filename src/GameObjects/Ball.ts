import 'phaser';
import {BallConsts, Direction} from "../BallConsts";
import {GeneralConsts} from "../GeneralConsts";
import {PlayerPaddle} from "./PlayerPaddle";

export class Ball extends Phaser.GameObjects.GameObject {
    // private speed: number;
    public sprite: Phaser.GameObjects.Image;
    // private direction: Direction;
    
    constructor(scene: Phaser.Scene, x: number, y: number, ballSprite: Phaser.GameObjects.Image, playerPaddle: PlayerPaddle, physics: any) {
        super(scene, 'ball');
        // this.direction = Math.random() <= 0.5 ? Direction.DownLeft : Direction.DownRight;  // 50 / 50 chance to start going DownLeft or DownRight
        // this.speed = BallConsts.DEFAULT_BALL_SPEED;
        this.sprite = ballSprite;
        this.sprite.displayWidth = 24;
        this.sprite.displayHeight = 24;
    }
    
    // try_bounce_off_walls() {
    //     if (this.sprite.x <= 0) {
    //         switch (this.direction) {
    //             case Direction.UpLeft:
    //                 this.direction = Direction.UpRight;
    //                 break;
    //             case Direction.DownLeft:
    //                 this.direction = Direction.DownRight;
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    //     if (this.sprite.x >= GeneralConsts.SCREEN_WIDTH) {
    //         switch (this.direction) {
    //             case Direction.UpRight:
    //                 this.direction = Direction.UpLeft;
    //                 break;
    //             case Direction.DownRight:
    //                 this.direction = Direction.DownLeft;
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    //     if (this.sprite.y >= GeneralConsts.SCREEN_HEIGHT) {
    //         // todo just for testing, remove this because at bottom we want to lose life
    //         switch (this.direction) {
    //             case Direction.DownRight:
    //                 this.direction = Direction.UpRight;
    //                 break;
    //             case Direction.DownLeft:
    //                 this.direction = Direction.UpLeft;
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    //     if (this.sprite.y <= 0) {
    //         switch (this.direction) {
    //             case Direction.UpRight:
    //                 this.direction = Direction.DownRight;
    //                 break;
    //             case Direction.UpLeft:
    //                 this.direction = Direction.DownLeft;
    //                 break;
    //             default:
    //                 break;
    //         }
    //     }
    // }
    
    // bounce() {
    //     switch (this.direction) {
    //         case Direction.UpLeft:
    //             this.direction = Direction.DownRight;
    //             break;
    //         case Direction.UpRight:
    //             this.direction = Direction.DownLeft;
    //             break;
    //         case Direction.DownLeft:
    //             this.direction = Direction.UpRight;
    //             break;
    //         case Direction.DownRight:
    //             this.direction = Direction.UpLeft;
    //             break;
    //     }
    // }

    // ball_update(time: number, delta: number) {
    //     let speedDelta = this.speed * delta / 1000;
    //     // todo this can be more elegant with a const that has 2 values
    //     switch (this.direction) {
    //         case Direction.UpLeft:
    //             this.sprite.x -= speedDelta;
    //             this.sprite.y -= speedDelta;
    //             break;
    //         case Direction.UpRight:
    //             this.sprite.x += speedDelta;
    //             this.sprite.y -= speedDelta;
    //             break;
    //         case Direction.DownLeft:
    //             this.sprite.x -= speedDelta;
    //             this.sprite.y += speedDelta;
    //             break;
    //         case Direction.DownRight:
    //             this.sprite.x += speedDelta;
    //             this.sprite.y += speedDelta;
    //             break;
    //     }
    //     this.try_bounce_off_walls();
    // }
}