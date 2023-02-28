export class GeneralConsts {
    static readonly SCREEN_WIDTH: number = 1024;
    static readonly SCREEN_HEIGHT: number = 768;
    static readonly SCREEN_CENTER_X: number = 1024 / 2;
    static readonly SCREEN_CENTER_Y: number = 768 / 2;
    
    static readonly MAX_LEVEL: number = 3;
    
    static readonly CONTROL_HINT: string = "LEFT ARROW + RIGHT ARROW to move paddle\nUP ARROW to launch ball";
    static readonly LEVEL_HINT: Array<string> = [
        "Wolves will try to bite your paddle, reducing its size.\nCollect sticks to extend your paddle.",
        "Getting hit by lightning will prevent you from moving for a moment.\nWhen the ball turns yellow it becomes charged, increasing its speed.",
        "Bone spears get launched towards you, when hit they reduce your size.",
    ];
}