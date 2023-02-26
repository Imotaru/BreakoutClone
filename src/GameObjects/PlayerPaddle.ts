﻿import 'phaser';
import {GeneralConsts} from "../GeneralConsts";

export class PlayerPaddle extends Phaser.GameObjects.GameObject {
    private speed: number;
    public sprite: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene, x: number, y: number, playerSprite: Phaser.GameObjects.Image, physics: any) {
        super(scene, 'player');
        this.speed = 480;
        this.sprite = playerSprite;
        this.sprite.displayWidth = 76;
        this.sprite.displayHeight = 22;
    }
  
    player_update(time: number, delta: number, cursors: any) {
        let speedDelta = 480 * delta / 1000;
        if (cursors.left.isDown) {
            this.sprite.x -= speedDelta;
            if (this.sprite.x < 0) {
                this.sprite.x = 0;
            }
        }
        if (cursors.right.isDown) {
            this.sprite.x += speedDelta;
            if (this.sprite.x > GeneralConsts.SCREEN_WIDTH) {
                this.sprite.x = GeneralConsts.SCREEN_WIDTH;
            }
        }
    }
}