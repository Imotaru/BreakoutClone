import {SoundClip} from "./SoundManager";

export class CollectibleData {
    public spriteName: string;
    public width: number;
    public height: number;
    public spawnSound: SoundClip;
    public collectSound: SoundClip;
    public onCollect: Function;
    public xSpeedGetter: (xPos: number, yPos: number) => number;
    public ySpeedGetter: (xPos: number, yPos: number) => number;
    
    constructor(spriteName: string, width: number, height: number, spawnSound: SoundClip,
                collectSound: SoundClip, onCollect: Function,
                xSpeedGetter: (x: number, y: number) => number,
                ySpeedGetter: (x: number, y: number) => number) {
        this.spriteName = spriteName;
        this.width = width;
        this.height = height;
        this.spawnSound = spawnSound;
        this.collectSound = collectSound;
        this.onCollect = onCollect;
        this.xSpeedGetter = xSpeedGetter;
        this.ySpeedGetter = ySpeedGetter;
    }
}