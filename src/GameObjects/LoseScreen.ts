import 'phaser';
import {GeneralConsts} from "../GeneralConsts";
import {GameManager} from "../GameManager";

export class LoseScreen extends Phaser.GameObjects.GameObject {
    static I: LoseScreen;
    
    private static readonly OPTION_AMOUNT: number = 3;
    private static readonly SELECTION_START_Y: number = GeneralConsts.SCREEN_CENTER_Y - 82;
    private static readonly SELECTION_STEP_Y: number = 100;
    
    panel: Phaser.GameObjects.Image;
    selector: Phaser.GameObjects.Image;
    option1: Phaser.GameObjects.Text;
    option2: Phaser.GameObjects.Text;
    option3: Phaser.GameObjects.Text;
    title: Phaser.GameObjects.Text;
    confirm_text: Phaser.GameObjects.Text;
    
    currentlySelected: number;
    
    constructor() {
        super(GameManager.I.scene, 'panel');
        LoseScreen.I = this;
        this.currentlySelected = 1;
        this.panel = this.scene.add.image(GeneralConsts.SCREEN_CENTER_X, GeneralConsts.SCREEN_CENTER_Y, 'panel');
        this.panel.displayWidth = 750;
        this.panel.displayHeight = 450;
        this.selector = this.scene.add.image(GeneralConsts.SCREEN_CENTER_X - 290, GeneralConsts.SCREEN_CENTER_Y - 82, 'ball');
        this.selector.displayWidth = 18;
        this.selector.displayHeight = 18;
        this.title = this.scene.add.text(GeneralConsts.SCREEN_CENTER_X - 110, GeneralConsts.SCREEN_CENTER_Y - 199,
            "Game Over",
            { fontFamily: 'Arial', fontSize: 40, color: '#ff0000', bold: true });
        this.option1 = this.scene.add.text(GeneralConsts.SCREEN_CENTER_X - 275, GeneralConsts.SCREEN_CENTER_Y - 100,
            "Restart from Level 1",
            { fontFamily: 'Arial', fontSize: 32, color: '#000000' });
        this.option2 = this.scene.add.text(GeneralConsts.SCREEN_CENTER_X - 275, GeneralConsts.SCREEN_CENTER_Y,
            "Retry this level (score is reset)",
            { fontFamily: 'Arial', fontSize: 32, color: '#000000' });
        this.option3 = this.scene.add.text(GeneralConsts.SCREEN_CENTER_X - 275, GeneralConsts.SCREEN_CENTER_Y + 100,
            "Skip to next level (score is reset)",
            { fontFamily: 'Arial', fontSize: 32, color: !LoseScreen.is_valid_selection(3) ? '#777777' : '#000000' });
        this.confirm_text = this.scene.add.text(GeneralConsts.SCREEN_CENTER_X - 290, GeneralConsts.SCREEN_CENTER_Y + 195,
            "Up + Down Arrows to navigate, Space to confirm",
            { fontFamily: 'Arial', fontSize: 24, color: '#222222' });
    }
    
    private static is_valid_selection(option: number) : boolean {
        return !((option <= 0 || option > LoseScreen.OPTION_AMOUNT) ||
            GameManager.I.currentLevel >= GeneralConsts.MAX_LEVEL && option == 3);
    }
    
    selection_up() {
        this.currentlySelected = Math.max(this.currentlySelected - 1, 1);
        this.update_selection();
    }
    
    selection_down() {
        this.currentlySelected = Math.min(this.currentlySelected + 1, LoseScreen.OPTION_AMOUNT);
        this.update_selection();
    }
    
    select() {
        if (!LoseScreen.is_valid_selection(this.currentlySelected)) {
            return;
        }
        
        if (this.currentlySelected == 1) {
            GameManager.I.load_level(1);
        } else if (this.currentlySelected == 2) {
            GameManager.I.load_level(GameManager.I.currentLevel);
        } else if (this.currentlySelected == 3) {
            GameManager.I.load_level(GameManager.I.currentLevel + 1);
        }
        
        GameManager.I.set_score(0);
        this.panel.destroy();
        this.selector.destroy();
        this.option1.destroy();
        this.option2.destroy();
        this.option3.destroy();
        this.title.destroy();
        this.confirm_text.destroy();
        GameManager.I.isLoseScreenOpen = false;
        this.destroy();
    }
    
    private update_selection() {
        this.selector.y = LoseScreen.SELECTION_START_Y + (this.currentlySelected - 1) * LoseScreen.SELECTION_STEP_Y;
    }
}