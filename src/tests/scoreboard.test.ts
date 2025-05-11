import { Scoreboard } from "../scoreboard";
import { Team } from "../team";

describe('Scoreboard', () => {
    it('should start a match and add it to the list of matches', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const scoreboard = new Scoreboard();

        const match = scoreboard.startMatch(teamA, teamB);

        expect(scoreboard.getSummary()).toContain(match);
        expect(match.inProgress).toBe(true);
        expect(match.startedAt).toBeInstanceOf(Date);
    });

    it('should update the score of an existing match', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const scoreboard = new Scoreboard();

        const match = scoreboard.startMatch(teamA, teamB);
        scoreboard.updateScore(match.id, 1, 2);

        expect(match.homeTeamScore).toBe(1);
        expect(match.awayTeamScore).toBe(2);
    });

    it('should throw an error when updating the score of a non-existent match', () => {
        const scoreboard = new Scoreboard();

        expect(() => {
            scoreboard.updateScore('non-existent-id', 1, 2);
        }).toThrow('Match with id non-existent-id not found.');
    });

    it('should finish a match and remove it from the scoreboard', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const scoreboard = new Scoreboard();

        const match = scoreboard.startMatch(teamA, teamB);
        scoreboard.finishMatch(match.id);

        expect(scoreboard.getSummary()).not.toContain(match);
        expect(match.inProgress).toBe(false);
    });

    it('should throw an error when finishing a match that does not exist', () => {
        const scoreboard = new Scoreboard();

        expect(() => {
            scoreboard.finishMatch('non-existent-id');
        }).toThrow('Match with id non-existent-id not found.');
    });

    it('should return an empty summary when no matches are in progress', () => {
        const scoreboard = new Scoreboard();

        expect(scoreboard.getSummary()).toEqual([]);
    });

    it('should return matches sorted by total score descending and then by most recent start time', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const teamC = new Team('Germany');
        const teamD = new Team('France');
        const scoreboard = new Scoreboard();

        const match1 = scoreboard.startMatch(teamA, teamB);
        scoreboard.updateScore(match1.id, 2, 1);

        const match2 = scoreboard.startMatch(teamC, teamD);
        scoreboard.updateScore(match2.id, 3, 2);

        const summary = scoreboard.getSummary();

        expect(summary[0].id).toBe(match2.id);
        expect(summary[1].id).toBe(match1.id);
    });

    it('should throw an error when trying to start a match with a team already in a match', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const teamC = new Team('Germany');
        const scoreboard = new Scoreboard();

        scoreboard.startMatch(teamA, teamB);

        expect(() => {
            scoreboard.startMatch(teamA, teamC);
        }).toThrow('One of the teams is already in a match');
    });

    it('should handle multiple matches with same total score and sort by most recent', async () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const teamC = new Team('Germany');
        const teamD = new Team('France');
        const scoreboard = new Scoreboard();

        const match1 = scoreboard.startMatch(teamA, teamB);
        scoreboard.updateScore(match1.id, 2, 1);

        await new Promise((resolve) => setTimeout(resolve, 10));

        const match2 = scoreboard.startMatch(teamC, teamD);
        scoreboard.updateScore(match2.id, 2, 1);

        const summary = scoreboard.getSummary();

        expect(summary[0].id).toBe(match2.id);
        expect(summary[1].id).toBe(match1.id);
    });

    it('should throw an error when trying to update a match that has already been finished', () => {
        const teamA = new Team('Brazil');
        const teamB = new Team('Argentina');
        const scoreboard = new Scoreboard();

        const match = scoreboard.startMatch(teamA, teamB);
        scoreboard.finishMatch(match.id);

        expect(() => {
            scoreboard.updateScore(match.id, 1, 2);
        }).toThrow(`Match with id ${match.id} not found.`);
    });
  });
  