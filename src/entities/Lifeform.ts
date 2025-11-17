import { Brain } from "../components/Brain";
import { Entity } from "../util/Entity";

export abstract class Lifeform extends Entity {
    public brain = new Brain();
}
