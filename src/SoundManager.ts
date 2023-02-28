import 'phaser';

export enum SoundClip {
    ballHit,
    damage,
    loseLife,
    wolf,
    wolfBite,
    boneSpear,
    boneSpearHit,
    stickDrop,
    stickCollect,
}

export class SoundManager {
    // singleton so I can always access the SoundManager from anywhere, without needing to pass a reference
    public static I: SoundManager;
    currentlyPlayingMusic: Phaser.Sound.BaseSound;
    
    ballHit: Phaser.Sound.BaseSound;
    loseLife: Phaser.Sound.BaseSound;
    damageSound: Phaser.Sound.BaseSound;
    wolfSounds: Array<Phaser.Sound.BaseSound>;
    boneSpear: Array<Phaser.Sound.BaseSound>;
    wolfBite: Phaser.Sound.BaseSound;
    boneSpearHit: Phaser.Sound.BaseSound;
    music: Array<Phaser.Sound.BaseSound>;
    stickDrop: Phaser.Sound.BaseSound;
    stickCollect: Phaser.Sound.BaseSound;
    
    constructor(scene: Phaser.Scene) {
        SoundManager.I = this;
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
        this.boneSpear = [
            scene.sound.add('bonespear1'),
            scene.sound.add('bonespear2'),
            scene.sound.add('bonespear3'),
        ]
        this.boneSpearHit = scene.sound.add('bonespearhit');
        this.stickDrop = scene.sound.add('stickDrop');
        this.stickCollect = scene.sound.add('stickCollect');
        this.music = [
            scene.sound.add('music1', {
                loop: true,
                volume: 0.4,
            }),
            scene.sound.add('music2', {
                loop: true,
                volume: 0.4,
            }),
            scene.sound.add('music3', {
                loop: true,
                volume: 0.4,
            }),
        ];

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
                this.wolfSounds[Math.floor(Math.random() * this.wolfSounds.length)].play();
                break;
            case SoundClip.wolfBite:
                this.wolfBite.play();
                break;
            case SoundClip.boneSpear:
                this.boneSpear[Math.floor(Math.random() * this.boneSpear.length)].play();
                break;
            case SoundClip.boneSpearHit:
                this.boneSpearHit.play();
                break;
            case SoundClip.stickDrop:
                this.stickDrop.play();
                break;
            case SoundClip.stickCollect:
                this.stickCollect.play();
                break;
        }
    }
    
    play_music(level: number) {
        if (this.currentlyPlayingMusic != null) {
            this.currentlyPlayingMusic.stop();
        }
        this.currentlyPlayingMusic = this.music[level - 1];
        this.currentlyPlayingMusic.play();
    }
}