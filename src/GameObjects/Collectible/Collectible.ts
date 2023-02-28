import 'phaser';
import {GameManager} from "../../GameManager";
import {Helper} from "../../Helper";
import {CollectibleConsts, CollectibleType} from "../../CollectibleConsts";
import {SoundManager} from "../../SoundManager";

export class Collectible extends Phaser.GameObjects.GameObject {
    public image: Phaser.GameObjects.Image;
    
    constructor(collectibleType: CollectibleType, xPos: number, yPos: number) {
        let collectible = CollectibleConsts.COLLECTIBLE_DATA[collectibleType];
        super(GameManager.I.scene, collectible.spriteName);
        let xVelocity = collectible.xSpeedGetter(xPos);
        let yVelocity = collectible.ySpeedGetter(yPos);
        this.image = this.scene.physics.add.image(xPos, yPos, collectible.spriteName)
            .setVelocity(xVelocity, yVelocity)
        ;
        this.image.displayWidth = collectible.width;
        this.image.displayHeight = collectible.height;
        this.image.setRotation(Helper.get_rotation_of_movement_vector(xVelocity, yVelocity));
        SoundManager.I.play_sound(collectible.spawnSound);
        GameManager.I.collectibleList.push(this);

        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.playerPaddle.image, this.image, () => {
            collectible.onCollect();
            SoundManager.I.play_sound(collectible.collectSound);
            this.image.destroy();
            this.destroy();
        });

        // @ts-ignore
        GameManager.I.scene.physics.add.collider(GameManager.I.bottomBorder, this.image, () => {
            this.image.destroy();
            this.destroy();
        });
    }
}