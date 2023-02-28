import 'phaser';
import {GeneralConsts} from "../GeneralConsts";
import {PlayerConsts} from "../PlayerConsts";
import {GameManager} from "../GameManager";

export class PlayerPaddle extends Phaser.GameObjects.GameObject {
    private speed: number;
    private width: number;
    public image: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 'player');
        this.image = scene.physics.add.image(GeneralConsts.SCREEN_CENTER_X, GeneralConsts.SCREEN_HEIGHT - 140, 'player')
            .setImmovable(true)
            .setCollideWorldBounds(true);
        this.speed = PlayerConsts.DEFAULT_SPEED;
        this.width = PlayerConsts.DEFAULT_PADDLE_WIDTH;
        this.image.displayWidth = this.width;
        this.image.displayHeight = 22;
    }
  
    player_update() {
        if ((GameManager.I.cursors.left.isDown && GameManager.I.cursors.right.isDown) ||
            (GameManager.I.cursors.left.isUp && GameManager.I.cursors.right.isUp)) {
            this.image.body.setVelocity(0, 0);
            return;
        }
        this.image.body.setVelocity(GameManager.I.cursors.left.isDown ? -this.speed : this.speed, 0);
    }
    
    modify_width(value: number) {
        this.width = Math.max(this.width + value, PlayerConsts.MINIMUM_PADDLE_WIDTH);
        this.image.displayWidth = this.width;
    }
    
    reset_width() {
        this.width = PlayerConsts.DEFAULT_PADDLE_WIDTH;
        this.image.displayWidth = this.width;
    }
}