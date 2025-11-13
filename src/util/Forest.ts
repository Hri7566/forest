import type { Entity } from "./Entity";
import type { Vector2 } from "./Vector2";

const COLUMNS = process.stdout.columns || 38;
const ROWS = process.stdout.rows || 11;

export class Forest {
    public size: Vector2 = { x: COLUMNS - 2, y: ROWS - 2 };
    public entities: Entity[] = []
    public grass: string[] = [];

    constructor() {
        // generate grass

        for (let y = 0; y < this.size.y; y++) {
            let buffer = "";

            for (let x = 0; x < this.size.x; x++) {
                let r = Math.random();
                let char = " ";

                if (r < 1 / 256) {
                    char = "V"
                } else if (r < 1 / 128) {
                    char = "w";
                } else if (r < 1 / 64) {
                    char = "v"
                } else if (r < 1 / 32) {
                    char = ".";
                }

                buffer += char;
            }

            this.grass.push(buffer);
        }
    }

    private oldTime: number = Date.now();

    public tick() {
        const time = Date.now();
        const dt = time - this.oldTime;

        for (const entity of this.entities) {
            entity.tick(dt);
        }

        this.oldTime = time;
    }

    public render() {
        let data = "\x1b[2J";

        data += this.renderGrass();
        data += this.renderEntities();
        data += this.renderFrame();

        process.stdout.write(data);
    }

    protected renderGrass() {
        let data = "\x1b[H\x1b[1B\x1b[1C\x1b[0;32m";

        for (const line of this.grass) {
            data += line + "\x1b[1E\x1b[1C";
        }

        return data;
    }

    protected renderEntities() {
        let data = "";

        for (const entity of this.entities) {
            data += entity.render({ x: 1, y: 1 });
        }

        return data;
    }

    protected renderFrame() {
        let size: Vector2 = { x: this.size.x + 2, y: this.size.y + 2 };
        let data = "\x1b[0m\x1b[1;1H+";

        for (let x = 1; x < size.x - 1; x++) {
            data += "-";
        }

        data += "+\x1b[1E";

        for (let y = 1; y < size.y - 1; y++) {
            data += `|\x1b[${size.x - 2}C|\x1b[1E`;
        }

        data += "+";

        for (let x = 1; x < size.x - 1; x++) {
            data += "-";
        }

        data += "+\x1b[1E";

        return data;
    }
}
