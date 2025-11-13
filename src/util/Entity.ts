import type { Forest } from "./Forest";
import type { Vector2 } from "./Vector2";

export abstract class Entity {
    public position: Vector2 = { x: 0, y: 0 };
    public children: Entity[] = []
    public size: Vector2 = { x: 1, y: 1 };

    constructor(public parent: Entity | Forest) { }

    public abstract toString(): string;
    public abstract tick(dt: number): void;

    public move(offset: Vector2) {
        let final: Vector2 = {
            x: this.position.x + offset.x,
            y: this.position.y + offset.y
        };

        if (
            final.x < 0 ||
            final.x > this.parent.size.x ||
            final.y < 0 ||
            final.y > this.parent.size.y
        ) return;

        this.position.x = final.x;
        this.position.y = final.y;
    }

    public render(offset: Vector2) {
        let data = "";

        data += `\x1b[${this.position.y + offset.x};${this.position.x + offset.y}H${this.toString()}`;

        for (const child of this.children) {
            data += child.render(this.position);
        }

        return data;
    }
}
