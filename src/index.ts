import { Deer } from "./entities/Deer";
import { Rabbit } from "./entities/Rabbit";
import { Squirrel } from "./entities/Squirrel";
import { Tree } from "./entities/Tree";
import type { Entity } from "./util/Entity";
import { Forest } from "./util/Forest";

const forest = new Forest();

function spawnEntity<T>(parent: Entity | Forest, EntityClass: new (parent: Entity | Forest) => Entity, count: number) {
    for (let i = 0; i < count; i++) {
        const entity = new EntityClass(parent);

        let overlap = true;

        while (overlap) {
            entity.position.x = Math.floor(Math.random() * forest.size.x);
            entity.position.y = Math.floor(Math.random() * forest.size.y);

            overlap = typeof forest.entities.find(e =>
                e.position.x == entity.position.x &&
                e.position.y == entity.position.y
            ) !== "undefined";
        }

        forest.entities.push(entity);
    }
}

spawnEntity(forest, Tree, 30);
spawnEntity(forest, Deer, 8);
spawnEntity(forest, Squirrel, 5);
spawnEntity(forest, Rabbit, 10);

process.stdout.write("\x1b[?25l");

setInterval(() => {
    forest.render();
}, 1000 / 2);

setInterval(() => {
    forest.tick();
}, 1000 / 1);

process.on("SIGINT", () => {
    process.stdout.write("\x1b[?25h");
    process.exit();
});
