import 'phaser';
import {GameManager} from "../GameManager";
import {SoundClip, SoundManager} from "../SoundManager";
import {BallConsts} from "../BallConsts";

export class Brick extends Phaser.GameObjects.GameObject {
    public sprite: Phaser.GameObjects.Image;
    public score: number;
    private callback: Function;

    constructor(gm: GameManager, x: number, y: number, score: number, sprite_name: string, callback: Function) {
        super(gm.scene, 'brick');
        this.sprite = gm.scene.physics.add.image(x, y, sprite_name)
            .setImmovable(true);
        this.sprite.displayWidth = 60;
        this.sprite.displayHeight = 30;
        this.score = score;
        this.callback = callback;
        
        // @ts-ignore
        gm.scene.physics.add.collider(gm.ball.sprite, this.sprite, () => {
            SoundManager.I.play_sound(SoundClip.damage);
            gm.set_score(gm.score + this.score);
            callback();
            this.sprite.destroy();
            this.destroy();
            gm.ball.modify_ball_speed(BallConsts.BALL_SPEED_UP[gm.currentLevel - 1]);
            gm.increment_brick_destroy_count();
        });
    }
    
    destroy() {
        
    }
}