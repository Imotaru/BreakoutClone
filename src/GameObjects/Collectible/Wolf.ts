import 'phaser';
import {GameManager} from "../../GameManager";
import {SoundClip, SoundManager} from "../../SoundManager";
import {Helper} from "../../Helper";

export class Wolf extends Phaser.GameObjects.GameObject {
    public sprite: Phaser.GameObjects.Image;

    constructor(x: number, y: number) {
        super(GameManager.I.scene, 'wolf');
        let xVelocity = -30 + Math.random() * 60;
        let yVelocity = 180 + Math.random() * 40;
        this.sprite = this.scene.physics.add.image(x, y, 'wolf')
            .setVelocity(xVelocity, yVelocity)
        ;
        this.sprite.setRotation(Helper.get_rotation_of_movement_vector(xVelocity, yVelocity));
        this.sprite.displayWidth = 20;
        this.sprite.displayHeight = 60;

        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.playerPaddle.sprite, this.sprite, () => {
            GameManager.I.playerPaddle.modify_width(-12);
            SoundManager.I.play_sound(SoundClip.wolfBite);
            this.sprite.destroy();
            this.destroy();
        });
        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.bottomBorder, this.sprite, () => {
            this.sprite.destroy();
            this.destroy();
        });

        SoundManager.I.play_sound(SoundClip.wolf);
    }
}