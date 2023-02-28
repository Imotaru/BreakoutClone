export class Helper {
    static get_rotation_of_movement_vector(xVelocity: number, yVelocity: number): number {
        return Math.atan2(yVelocity, xVelocity) - Math.PI * .5;
    }
}