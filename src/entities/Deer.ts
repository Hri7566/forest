import { Animal } from "./Animal";

export class Deer extends Animal {
    public override toString(): string {
        return "\x1b[33m🦌";
    }
}
