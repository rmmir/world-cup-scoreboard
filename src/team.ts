import { v4 as uuidv4 } from 'uuid';

export class Team {
    public readonly id: string = uuidv4();
    public readonly name: string;

    constructor(name: string) {
        if (!name) {
            throw new Error('Team name cannot be empty');
        }
        
        this.name = name;
    }
}