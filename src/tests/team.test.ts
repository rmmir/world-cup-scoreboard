import { Team } from "../team";

describe('Team', () => {
    it('should initialize a team', () => {
        const team = new Team('Brazil');
        expect(team.name).toBe('Brazil');
        expect(team.id).not.toBeUndefined();
    });

    it('should throw an error if the team name is empty', () => {
        expect(() => {
            new Team('');
        }).toThrow('Team name cannot be empty');
    });
});