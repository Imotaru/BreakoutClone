import 'phaser';
import {GameManager} from "../../GameManager";
import {SoundClip, SoundManager} from "../../SoundManager";
import {Helper} from "../../Helper";
import {Collectible} from "./Collectible";

export class Wolf extends Collectible {
    constructor(x: number, y: number) {
        super('wolf');
        let xVelocity = -30 + Math.random() * 60;
        let yVelocity = 180 + Math.random() * 40;
        this.image = this.scene.physics.add.image(x, y, 'wolf')
            .setVelocity(xVelocity, yVelocity)
        ;
        this.image.setRotation(Helper.get_rotation_of_movement_vector(xVelocity, yVelocity));
        this.image.displayWidth = 20;
        this.image.displayHeight = 60;

        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.playerPaddle.image, this.image, () => {
            GameManager.I.playerPaddle.modify_width(-12);
            SoundManager.I.play_sound(SoundClip.wolfBite);
            this.image.destroy();
            this.destroy();
        });
        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.bottomBorder, this.image, () => {
            this.image.destroy();
            this.destroy();
        });

        SoundManager.I.play_sound(SoundClip.wolf);
    }
}