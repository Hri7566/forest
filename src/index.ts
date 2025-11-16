import { Forest } from "./util/Forest";
import type { Entity } from "./util/Entity";
import { Deer } from "./entities/lifeforms/animals/Deer";
import { Rabbit } from "./entities/lifeforms/animals/Rabbit";
import { Squirrel } from "./entities/lifeforms/animals/Squirrel";
import { Tree } from "./entities/lifeforms/plants/Tree";
import { Rose } from "./entities/lifeforms/plants/flowers/Rose";
import { Turtle } from "./entities/lifeforms/animals/Turtle";

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
spawnEntity(forest, Rose, 10);

spawnEntity(forest, Deer, 8);
spawnEntity(forest, Rabbit, 10);
spawnEntity(forest, Squirrel, 5);
spawnEntity(forest, Turtle, 3);

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
