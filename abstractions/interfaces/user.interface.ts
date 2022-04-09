import {IdentifierType} from "../types/identifier.type.ts";

export default interface UserInterface {
    id?: IdentifierType;
    firstName: string;
    lastName: string;
}