import {CollectibleData} from "./CollectibleData";
import {SoundClip} from "./SoundManager";
import {GameManager} from "./GameManager";
import {Helper} from "./Helper";

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
            (_: number, __: number) => {
                return -30 + Math.random() * 60;
            },
            // ySpeedGetter
            (_: number, __: number) => {
                return 180 + Math.random() * 40;
            }),
        [CollectibleType.Stick]: new CollectibleData('stick', 50, 25, SoundClip.stickDrop, SoundClip.stickCollect,
            // onCollect
            () => {
                GameManager.I.playerPaddle.modify_width(8);
                GameManager.I.modify_score(1);
            },
            // xSpeedGetter
            (_: number, __: number) => {
                return 0;
            },
            // ySpeedGetter
            (_: number, __: number) => {
                return 80 + Math.random() * 40;
            }),
        [CollectibleType.Lightning]: new CollectibleData('lightning', 25, 50, SoundClip.lightning, SoundClip.lightningBoltImpact,
            // onCollect
            () => {
                GameManager.I.playerPaddle.add_stun_duration(600);
            },
            // xSpeedGetter
            (_: number, __: number) => {
                return 0;
            },
            // ySpeedGetter
            (_: number, __: number) => {
                return 450 + Math.random() * 100;
            }),
        [CollectibleType.BoneSpear]: new CollectibleData('boneSpear', 8, 60, SoundClip.boneSpear, SoundClip.boneSpearHit,
            // onCollect
            () => {
                GameManager.I.playerPaddle.modify_width(-12);
                GameManager.I.modify_score(-3);
            },
            /* The reason we do the math in the xSpeedGetter and ySpeedGetter is this:
            * the bone spear gets launched in the direction of the player paddle,
            * and because we are just taking the difference between the positions it would mean that
            * the farther away the spear is when it spawns, the faster it would be since the difference is higher.
            * To fix that we need to normalize the vector, so that the speed is consistent no matter the distance,
            * but the direction is still the same.
            * */
            // xSpeedGetter
            (xPos: number, yPos: number) => {
                let xDiff = (GameManager.I.playerPaddle.image.x - xPos);
                let yDiff = (GameManager.I.playerPaddle.image.y - yPos);
                let magnitude = Helper.get_vector_magnitude(xDiff, yDiff);
                return (xDiff / magnitude) * (220 + 60 * Math.random());
            },
            // ySpeedGetter
            (xPos: number, yPos: number) => {
                let xDiff = (GameManager.I.playerPaddle.image.x - xPos);
                let yDiff = (GameManager.I.playerPaddle.image.y - yPos);
                let magnitude = Helper.get_vector_magnitude(xDiff, yDiff);
                return (yDiff / magnitude) * (220 + 60 * Math.random());
            }),
    };
}