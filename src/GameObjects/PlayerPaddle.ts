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
        this.speed = GeneralConsts.BASE_PLAYER_SPEED;
        this.size = PlayerConsts.DEFAULT_PADDLE_WIDTH;
        this.sprite.displayWidth = this.size;
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
    
    modify_width(value: number) {
        this.size += value;
        if (this.size < PlayerConsts.MINIMUM_PADDLE_WIDTH) {
            this.size = PlayerConsts.MINIMUM_PADDLE_WIDTH;
        }
        this.sprite.displayWidth = this.size;
    }
}