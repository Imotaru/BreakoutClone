import 'phaser';
import {GeneralConsts} from "../GeneralConsts";

export class PlayerPaddle extends Phaser.GameObjects.GameObject {
    private speed: number;
    public sprite: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene) {
        super(scene, 'player');
        this.sprite = scene.physics.add.image(GeneralConsts.SCREEN_WIDTH / 2, GeneralConsts.SCREEN_HEIGHT - 140, 'player')
            .setImmovable(true)
            .setCollideWorldBounds(true);
        this.speed = GeneralConsts.BASE_PLAYER_SPEED;
        this.sprite.displayWidth = 76;
        this.sprite.displayHeight = 22;
    }
  
    player_update(time: number, delta: number, cursors: any) {
        let speedDelta = this.speed * delta;
        if (cursors.left.isDown) {
            this.sprite.x -= speedDelta;
            if (this.sprite.x < 0) {
                this.sprite.x = 0;
            }
        }
        if (cursors.right.isDown) {
            this.sprite.x += speedDelta;
            if (this.sprite.x > GeneralConsts.SCREEN_WIDTH) {
                this.sprite.x = GeneralConsts.SCREEN_WIDTH;
            }
        }
    }
}