import 'phaser';
import {GeneralConsts} from "../GeneralConsts";
import {PlayerConsts} from "../PlayerConsts";

export class PlayerPaddle extends Phaser.GameObjects.GameObject {
    private speed: number;
    private size: number;
    public sprite: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 'player');
        this.sprite = scene.physics.add.image(GeneralConsts.SCREEN_WIDTH / 2, GeneralConsts.SCREEN_HEIGHT - 140, 'player')
            .setImmovable(true)
            .setCollideWorldBounds(true);
        this.speed = PlayerConsts.DEFAULT_SPEED;
        this.size = PlayerConsts.DEFAULT_PADDLE_WIDTH;
        this.sprite.displayWidth = this.size;
        this.sprite.displayHeight = 22;
    }
  
    player_update(time: number, delta: number, cursors: any) {
        if (cursors.left.isDown && cursors.right.isDown) {
            this.sprite.body.setVelocity(0, 0);
            return;
        }
        if (cursors.left.isDown) {
            this.sprite.body.setVelocity(-this.speed, 0);
            return;
        } else if (cursors.right.isDown) {
            this.sprite.body.setVelocity(this.speed, 0);
            return;
        }
        if (cursors.left.isUp && cursors.right.isUp) {
            this.sprite.body.setVelocity(0, 0);
        }
    }
    
    modify_width(value: number) {
        this.size += value;
        if (this.size < PlayerConsts.MINIMUM_PADDLE_WIDTH) {
            this.size = PlayerConsts.MINIMUM_PADDLE_WIDTH;
        }
        this.sprite.displayWidth = this.size;
    }
}