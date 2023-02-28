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
    
    /* Reason to have enum as a key: less error prone than strings because you don't need to worry about typos + you have auto complete
    *  Reason to have an array as value: can have certain sounds have a pool to choose a random sound from for more diversity
    * */
    sounds: Record<SoundClip, Array<Phaser.Sound.BaseSound>>;
    music: Array<Phaser.Sound.BaseSound>;
    
    constructor(scene: Phaser.Scene) {
        SoundManager.I = this;
        this.sounds = {
            [SoundClip.ballHit]: [scene.sound.add('ballHit')],
            [SoundClip.damage]: [scene.sound.add('damage')],
            [SoundClip.loseLife]: [scene.sound.add('loseLife')],
            [SoundClip.wolf]: [
                scene.sound.add('wolf1'),
                scene.sound.add('wolf2'),
                scene.sound.add('wolf3'),
                scene.sound.add('wolf4'),
                scene.sound.add('wolf5'),
                scene.sound.add('wolf6'),
            ],
            [SoundClip.wolfBite]: [scene.sound.add('wolfBite')],
            [SoundClip.boneSpear]: [
                scene.sound.add('bonespear1'),
                scene.sound.add('bonespear2'),
                scene.sound.add('bonespear3'),
            ],
            [SoundClip.boneSpearHit]: [scene.sound.add('bonespearhit')],
            [SoundClip.stickDrop]: [scene.sound.add('stickDrop')],
            [SoundClip.stickCollect]: [scene.sound.add('stickCollect')],
        };

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
        let soundArray = this.sounds[soundClip];
        soundArray[Math.floor(Math.random() * soundArray.length)].play();
    }
    
    play_music(level: number) {
        if (this.currentlyPlayingMusic != null) {
            this.currentlyPlayingMusic.stop();
        }
        this.currentlyPlayingMusic = this.music[level - 1];
        this.currentlyPlayingMusic.play();
    }
}