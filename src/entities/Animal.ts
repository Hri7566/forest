import { Entity } from "../util/Entity";

export abstract class Animal extends Entity {
    public tick(dt: number) {
        const r = Math.random();
        const movementOpportunity = r < 1 / 4;

        if (movementOpportunity) {
            this.moveRandom();
        }
    }

    public moveRandom() {
        let r1 = Math.random();
        let r2 = Math.random();

        let x = 0;
        let y = 0;

        if (r1 > 3 / 4) x--;
        else if (r1 > 2 / 4) x;
        else if (r1 > 1 / 4) x++;

        if (r2 > 3 / 4) y--;
        else if (r2 > 2 / 4) y;
        else if (r2 > 1 / 4) y++;

        this.move({ x, y });
    }
}
