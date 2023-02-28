import 'phaser';
import {GameManager} from "../../GameManager";
import {SoundClip, SoundManager} from "../../SoundManager";
import {Helper} from "../../Helper";

export class BoneSpear extends Phaser.GameObjects.GameObject {
    public sprite: Phaser.GameObjects.Image;

    constructor(x: number, y: number) {
        super(GameManager.I.scene, 'boneSpear');
        let xVelocity = (90 + Math.random() * 60) * (Math.random() <= 0.5 ? -1 : 1);
        let yVelocity = 210 + Math.random() * 20;
        this.sprite = this.scene.physics.add.image(x, y, 'boneSpear')
            .setVelocity(xVelocity, yVelocity)
        ;
        this.sprite.setRotation(Helper.get_rotation_of_movement_vector(xVelocity, yVelocity));
        // this.sprite.body.;
        // const rotatedSize = Helper.get_rotated_hitbox_size(this.sprite);
        // this.sprite.body.setSize(rotatedSize.width, rotatedSize.height)
        this.sprite.displayWidth = 8;
        this.sprite.displayHeight = 80;

        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.playerPaddle.sprite, this.sprite, () => {
            GameManager.I.playerPaddle.modify_width(-12);
            SoundManager.I.play_sound(SoundClip.boneSpearHit);
            this.sprite.destroy();
            this.destroy();
        });
        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.bottomBorder, this.sprite, () => {
            this.sprite.destroy();
            this.destroy();
        });

        SoundManager.I.play_sound(SoundClip.boneSpear);
    }
}