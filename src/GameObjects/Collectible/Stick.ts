import 'phaser';
import {GameManager} from "../../GameManager";
import {SoundClip, SoundManager} from "../../SoundManager";
import {Collectible} from "./Collectible";

export class Stick extends Collectible {
    constructor(x: number, y: number) {
        super('stick');
        this.image = this.scene.physics.add.image(x, y, 'stick')
            .setVelocity(0, 80 + Math.random() * 40);
        this.image.displayWidth = 50;
        this.image.displayHeight = 25;

        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.playerPaddle.image, this.image, () => {
            GameManager.I.playerPaddle.modify_width(8);
            SoundManager.I.play_sound(SoundClip.stickCollect);
            this.image.destroy();
            this.destroy();
        });
        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.bottomBorder, this.image, () => {
            this.image.destroy();
            this.destroy();
        });

        SoundManager.I.play_sound(SoundClip.stickDrop);
    }
}