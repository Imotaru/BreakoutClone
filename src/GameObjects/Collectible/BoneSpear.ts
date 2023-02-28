import 'phaser';
import {GameManager} from "../../GameManager";
import {SoundClip, SoundManager} from "../../SoundManager";
import {Helper} from "../../Helper";

export class BoneSpear extends Phaser.GameObjects.GameObject {
    public image: Phaser.GameObjects.Image;

    constructor(x: number, y: number) {
        super(GameManager.I.scene, 'boneSpear');
        let xVelocity = (90 + Math.random() * 60) * (Math.random() <= 0.5 ? -1 : 1);
        let yVelocity = 210 + Math.random() * 20;
        this.image = this.scene.physics.add.image(x, y, 'boneSpear')
            .setVelocity(xVelocity, yVelocity)
        ;
        /* this only rotates the image, but the hitbox is still the same
         I read online that I can't rotate the hitbox using arcade physics, but this is not worth the refactor for this
         alternative solution would be to make the hitbox bigger, but that's just worse because a thin spear ends up becoming a big box */
        this.image.setRotation(Helper.get_rotation_of_movement_vector(xVelocity, yVelocity));
        this.image.displayWidth = 8;
        this.image.displayHeight = 80;

        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.playerPaddle.image, this.image, () => {
            GameManager.I.playerPaddle.modify_width(-12);
            SoundManager.I.play_sound(SoundClip.boneSpearHit);
            this.image.destroy();
            this.destroy();
        });
        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.bottomBorder, this.image, () => {
            this.image.destroy();
            this.destroy();
        });

        SoundManager.I.play_sound(SoundClip.boneSpear);
    }
}