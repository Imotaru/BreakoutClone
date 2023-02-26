import 'phaser';

export enum SoundClip {
    ballHit,
    damage,
    loseLife,
}

export class SoundManager {
    ballHit: Phaser.Sound.BaseSound;
    loseLife: Phaser.Sound.BaseSound;
    damageSound: Phaser.Sound.BaseSound;
    
    constructor(scene: Phaser.Scene) {
        this.ballHit = scene.sound.add('ballHit');
        this.damageSound = scene.sound.add('damage');
        this.loseLife = scene.sound.add('loseLife');

        // let music = this.sound.add('music5', {
        // 	loop: true,
        // 	volume: 0.1,
        // });
        // music.play();
    }
    
    play_sound(soundClip: SoundClip) {
        switch (soundClip) {
            case SoundClip.ballHit:
                this.ballHit.play();
                break;
            case SoundClip.damage:
                this.damageSound.play();
                break;
            case SoundClip.loseLife:
                this.loseLife.play();
                break;
        }
    }
}