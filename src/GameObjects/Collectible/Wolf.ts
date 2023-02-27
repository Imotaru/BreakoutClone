import 'phaser';
import {GameManager} from "../../GameManager";
import Game = Phaser.Game;
import {SoundClip} from "../../SoundManager";

export class Wolf extends Phaser.GameObjects.GameObject {
    public sprite: Phaser.GameObjects.Image;

    constructor(x: number, y: number) {
        super(GameManager.I.scene, 'wolf');
        this.sprite = this.scene.physics.add.image(x, y, 'wolf')
            .setVelocity(-30 + Math.random() * 60, 180 + Math.random() * 40)
        ;
        this.sprite.displayWidth = 20;
        this.sprite.displayHeight = 60;

        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.playerPaddle.sprite, this.sprite, () => {
            GameManager.I.playerPaddle.modify_width(-12);
            this.sprite.destroy();
            this.destroy();
        });
        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.bottomBorder, this.sprite, () => {
            this.sprite.destroy();
            this.destroy();
        });
        
        GameManager.I.soundManager.play_sound(SoundClip.wolf);
    }
}