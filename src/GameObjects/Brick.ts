import 'phaser';

export class Brick extends Phaser.GameObjects.GameObject {
    public sprite: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, brickSprite: Phaser.GameObjects.Image) {
        super(scene, 'brick');
        this.sprite = brickSprite;
        this.sprite.displayWidth = 60;
        this.sprite.displayHeight = 30;
    }
}