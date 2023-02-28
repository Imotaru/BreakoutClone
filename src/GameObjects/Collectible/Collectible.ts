import 'phaser';
import {GameManager} from "../../GameManager";

export class Collectible extends Phaser.GameObjects.GameObject {
    public image: Phaser.GameObjects.Image;
    
    constructor(name: string) {
        super(GameManager.I.scene, name);
        GameManager.I.collectibleList.push(this);
    }
}