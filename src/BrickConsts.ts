import {Collectible} from "./GameObjects/Collectible/Collectible";
import {CollectibleType} from "./CollectibleConsts";

export class BrickConsts {
    static BRICK_SPRITES: Array<string> = ['bush', 'cloud', 'bonePile']
    static ROW_AMOUNTS: Array<number> = [8, 9, 10]
    static BRICK_DESTRUCTION_CALLBACKS: Array<Function> = [
        (x: number, y: number) => {
            if (Math.random() < 0.3) {
                new Collectible(CollectibleType.Wolf, x, y);
            } else if (Math.random() < 0.15) {
                new Collectible(CollectibleType.Stick, x, y);
            }
        },
        (x: number, y: number) => {
        },
        (x: number, y: number) => {
            if (Math.random() < 0.3 + 1) {
                new Collectible(CollectibleType.BoneSpear, x, y);
            }
        },
    ]

    static COLUMN_AMOUNT: number = 14;
    static BRICK_START_X: number = 30;
    static BRICK_STEP_X: number = 70;
    static BRICK_RANDOM_ROW_OFFSET_X: number = 50;
    static BRICK_START_Y: number = 70;
    static BRICK_STEP_Y: number = 40;
    static BRICK_RANDOM_ROW_OFFSET_Y: number = 10;
    static BRICK_PERCENTAGE_REQUIRED: number = 0.95;
}