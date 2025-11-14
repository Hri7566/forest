import { Plant } from "../Plant";

export class Tree extends Plant {
    public override toString(): string {
        return "\x1b[32m🌳";
    }
}
