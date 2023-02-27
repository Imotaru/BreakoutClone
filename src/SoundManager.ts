import 'phaser';

export enum SoundClip {
    ballHit,
    damage,
    loseLife,
    wolf,
    wolfBite,
}

export class SoundManager {
    ballHit: Phaser.Sound.BaseSound;
    loseLife: Phaser.Sound.BaseSound;
    damageSound: Phaser.Sound.BaseSound;
    wolfSounds: Array<Phaser.Sound.BaseSound>;
    wolfBite: Phaser.Sound.BaseSound;
    
    music1: Phaser.Sound.BaseSound;
    
    constructor(scene: Phaser.Scene) {
        this.ballHit = scene.sound.add('ballHit');
        this.damageSound = scene.sound.add('damage');
        this.loseLife = scene.sound.add('loseLife');
        this.wolfSounds = [
            scene.sound.add('wolf1'),
            scene.sound.add('wolf2'),
            scene.sound.add('wolf3'),
            scene.sound.add('wolf4'),
            scene.sound.add('wolf5'),
            scene.sound.add('wolf6'),
        ]
        this.wolfBite = scene.sound.add('wolfBite');
        this.music1 = scene.sound.add('music1', {
            loop: true,
            volume: 0.4,
        });
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
            case SoundClip.wolf:
                this.wolfSounds[Math.floor(Math.random() * 6)].play();
                break;
            case SoundClip.wolfBite:
                this.wolfBite.play();
                break;
        }
    }
    
    play_music(level: number) {
        switch (level) {
            case 1:
                this.music1.play();
        }
    }
}