import {CollectibleData} from "./CollectibleData";
import {SoundClip} from "./SoundManager";
import {GameManager} from "./GameManager";

export enum CollectibleType {
    Wolf,
    Stick,
    Lightning,
    BoneSpear,
}

export class CollectibleConsts {
    
    /* The reason to have this collectible data is because before I had each collectible be its own class
     * but it resulted in a lot of code duplication and if I wanted to make a change
     * I had to make it in many different places and it was easy to forgot one.
     * Now all the data is in one place and there is only one class for collectibles.
     */
    static readonly COLLECTIBLE_DATA: Record<CollectibleType, CollectibleData> = {
        [CollectibleType.Wolf]: new CollectibleData('wolf', 20, 60, SoundClip.wolf, SoundClip.wolfBite,
            // onCollect
            () => {
                GameManager.I.playerPaddle.modify_width(-12);
                GameManager.I.modify_score(-2);
            },
            // xSpeedGetter
            (x: number, y: number) => {
                return -30 + Math.random() * 60;
            },
            // ySpeedGetter
            (x: number, y: number) => {
                return 180 + Math.random() * 40;
            }),
        [CollectibleType.Stick]: new CollectibleData('stick', 50, 25, SoundClip.stickDrop, SoundClip.stickCollect,
            // onCollect
            () => {
                GameManager.I.playerPaddle.modify_width(8);
                GameManager.I.modify_score(1);
            },
            // xSpeedGetter
            (x: number, y: number) => {
                return 0;
            },
            // ySpeedGetter
            (x: number, y: number) => {
                return 80 + Math.random() * 40;
            }),
        [CollectibleType.Lightning]: new CollectibleData('lightning', 25, 50, SoundClip.lightning, SoundClip.lightningBoltImpact,
            // onCollect
            () => {
                GameManager.I.playerPaddle.add_stun_duration(600);
            },
            // xSpeedGetter
            (x: number, y: number) => {
                return 0;
            },
            // ySpeedGetter
            (x: number, y: number) => {
                return 450 + Math.random() * 100;
            }),
        [CollectibleType.BoneSpear]: new CollectibleData('boneSpear', 8, 60, SoundClip.boneSpear, SoundClip.boneSpearHit,
            // onCollect
            () => {
                GameManager.I.playerPaddle.modify_width(-12);
                GameManager.I.modify_score(-3);
            },
            // xSpeedGetter
            (x: number, y: number) => {
                let xDiff = (GameManager.I.playerPaddle.image.x - x);
                let yDiff = (GameManager.I.playerPaddle.image.y - y);
                let magnitude = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
                return (xDiff / magnitude) * (220 + 60 * Math.random());
            },
            // ySpeedGetter
            (x: number, y: number) => {
                let xDiff = (GameManager.I.playerPaddle.image.x - x);
                let yDiff = (GameManager.I.playerPaddle.image.y - y);
                let magnitude = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
                return (yDiff / magnitude) * (220 + 60 * Math.random());
            }),
    };
}