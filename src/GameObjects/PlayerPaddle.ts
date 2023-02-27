import 'phaser';
import {GeneralConsts} from "../GeneralConsts";
import {PlayerConsts} from "../PlayerConsts";
import {GameManager} from "../GameManager";

export class PlayerPaddle extends Phaser.GameObjects.GameObject {
    private speed: number;
    private width: number;
    public sprite: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 'player');
        this.sprite = scene.physics.add.image(GeneralConsts.SCREEN_CENTER_X, GeneralConsts.SCREEN_HEIGHT - 140, 'player')
            .setImmovable(true)
            .setCollideWorldBounds(true);
        this.speed = PlayerConsts.DEFAULT_SPEED;
        this.width = PlayerConsts.DEFAULT_PADDLE_WIDTH;
        this.sprite.displayWidth = this.width;
        this.sprite.displayHeight = 22;
    }
  
    player_update() {
        if ((GameManager.I.cursors.left.isDown && GameManager.I.cursors.right.isDown) ||
            (GameManager.I.cursors.left.isUp && GameManager.I.cursors.right.isUp)) {
            this.sprite.body.setVelocity(0, 0);
            return;
        }
        this.sprite.body.setVelocity(GameManager.I.cursors.left.isDown ? -this.speed : this.speed, 0);
    }
    
    modify_width(value: number) {
        this.width = Math.max(this.width + value, PlayerConsts.MINIMUM_PADDLE_WIDTH);
        this.sprite.displayWidth = this.width;
    }
    
    reset_width() {
        this.width = PlayerConsts.DEFAULT_PADDLE_WIDTH;
        this.sprite.displayWidth = this.width;
    }
}