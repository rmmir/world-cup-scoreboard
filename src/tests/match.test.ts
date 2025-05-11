import { Match } from "../match";
import { Team } from "../team";

describe('Match', () => {
    it('should initialize a match between two teams with correct names and default initializers', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const match = new Match(teamA, teamB);

        expect(match.homeTeamScore).toBe(0);
        expect(match.awayTeamScore).toBe(0);
        expect(match.homeTeam.name).toBe('Brazil');
        expect(match.awayTeam.name).toBe('Argentina');
        expect(match.id).not.toBeUndefined();
        expect(match.startedAt).toBe(null);  
        expect(match.inProgress).toBe(false);
    });

    it('should not initialize a match with the same team for home and away', () => {
        const teamA = new Team('Brazil');

        expect(() => {
            new Match(teamA, teamA);
        }).toThrow('Home and away teams cannot be the same');
    });

    it('should not initialize a match with the same name for home and away teams', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Brazil');

        expect(() => {
            new Match(teamA, teamB);
        }).toThrow('Home and away teams cannot have the same name');
    });

    it('should start a match', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const match = new Match(teamA, teamB);

        match.start();

        expect(match.inProgress).toBe(true);
        expect(match.startedAt).not.toBe(null);
        expect(match.startedAt).toBeInstanceOf(Date);
    });

    it('should throw an error if trying to start an already started match', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const match = new Match(teamA, teamB);

        match.start();

        expect(() => {
            match.start();
        }).toThrow('Match is already in progress');
    });

    it('should update the score when the match is in progress', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const match = new Match(teamA, teamB);

        match.start();
        match.updateScore(1, 2);

        expect(match.homeTeamScore).toBe(1);
        expect(match.awayTeamScore).toBe(2);
    });

    it('should throw an error if trying to update the score when the match is not in progress', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const match = new Match(teamA, teamB);

        expect(() => {
            match.updateScore(1, 2);
        }).toThrow('Match is not in progress');
    });

    it('should finish the match', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const match = new Match(teamA, teamB);

        match.start();
        match.finish();

        expect(match.inProgress).toBe(false);
        expect(match.startedAt).not.toBe(null);
    });

    it('should throw an error if trying to finish a match that is not in progress', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const match = new Match(teamA, teamB);

        expect(() => {
            match.finish();
        }).toThrow('Match is not in progress');
    });
});