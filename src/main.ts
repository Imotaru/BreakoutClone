import 'phaser';
import { GeneralConsts } from "./GeneralConsts";

import GameScene from './scenes/PlayScene';

const config:GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: GeneralConsts.SCREEN_WIDTH,
    height: GeneralConsts.SCREEN_HEIGHT,
    resolution: 1, 
    backgroundColor: "#000000",
    scene: [
      GameScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            // debug: true,
        }
    },
};

new Phaser.Game(config);