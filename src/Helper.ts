export class Helper {
    static get_rotation_of_movement_vector(xVelocity: number, yVelocity: number): number {
        return Math.atan2(yVelocity, xVelocity) - Math.PI * .5;
    }
    
    static get_vector_magnitude(x: number, y: number): number {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
}