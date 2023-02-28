import 'phaser';
import {GameManager} from "../GameManager";
import {Helper} from "../Helper";
import {CollectibleConsts, CollectibleType} from "../CollectibleConsts";
import {SoundManager} from "../SoundManager";

export class Collectible extends Phaser.GameObjects.GameObject {
    public image: Phaser.GameObjects.Image;
    
    constructor(collectibleType: CollectibleType, xPos: number, yPos: number) {
        let collectible = CollectibleConsts.COLLECTIBLE_DATA[collectibleType];
        super(GameManager.I.scene, collectible.spriteName);
        let xVelocity = collectible.xSpeedGetter(xPos, yPos);
        let yVelocity = collectible.ySpeedGetter(xPos, yPos);
        this.image = this.scene.physics.add.image(xPos, yPos, collectible.spriteName)
            .setVelocity(xVelocity, yVelocity)
        ;
        this.image.displayWidth = collectible.width;
        this.image.displayHeight = collectible.height;
        this.image.setRotation(Helper.get_rotation_of_movement_vector(xVelocity, yVelocity));
        SoundManager.I.play_sound(collectible.spawnSound);
        GameManager.I.collectibleList.push(this);

        GameManager.I.scene.physics.add.collider(GameManager.I.playerPaddle.image, this.image, () => {
            collectible.onCollect();
            SoundManager.I.play_sound(collectible.collectSound);
            this.destroy_this();
        });

        GameManager.I.scene.physics.add.collider(GameManager.I.bottomBorder, this.image, () => {
            this.destroy_this();
        });
        
    }
    
    destroy_this() {
        /* if this was a bigger project we would pool these objects and just hide them
        * instead of destroying and recreating them for better performance
        */
        this.image.destroy();
        this.destroy();
    }
}