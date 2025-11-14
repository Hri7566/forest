import { Flower } from "../Flower";

export class Rose extends Flower {
    public override toString(): string {
        return "\x1b[32m🌹";
    }
}
