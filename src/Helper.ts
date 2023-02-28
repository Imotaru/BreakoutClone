export class Helper {
    static get_rotation_of_movement_vector(xVelocity: number, yVelocity: number): number {
        return Math.atan2(yVelocity, xVelocity) - Math.PI * .5;
    }

    static get_rotated_hitbox_size(sprite: Phaser.GameObjects.Image): { width: number, height: number } {
        const radians = Phaser.Math.DegToRad(sprite.angle);
        const absCos = Math.abs(Math.cos(radians));
        const absSin = Math.abs(Math.sin(radians));
        const width = sprite.width * absCos + sprite.height * absSin;
        const height = sprite.width * absSin + sprite.height * absCos;
        return { width, height };
    }
}