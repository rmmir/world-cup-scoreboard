import { Match } from "./match";
import { Team } from "./team";

export class Scoreboard {
    private readonly matches: Map<string, Match> = new Map();

    startMatch(homeTeam: Team, awayTeam: Team): Match {
        if (this.checkIfTeamIsInMatch(homeTeam) || this.checkIfTeamIsInMatch(awayTeam)) {
            throw new Error('One of the teams is already in a match');
        }

        const match = new Match(homeTeam, awayTeam);
        match.start();
        this.matches.set(match.id, match);

        return match;
    }

    updateScore(matchId: string, homeScore: number, awayScore: number) {
        const match = this.getMatchInProgress(matchId);
        match.updateScore(homeScore, awayScore);
    }

    finishMatch(matchId: string) {
        const match = this.getMatchInProgress(matchId);
        match.finish();
        this.matches.delete(matchId);
    }
    
    getSummary(): Match[] {
        return Array.from(this.matches.values())
            .filter((match) => match.inProgress)
            .sort((a, b) => {
                if (!a.startedAt) { 
                    throw new Error(`Match ${a.id} has not started yet`);
                }

                if (!b.startedAt) { 
                    throw new Error(`Match ${b.id} has not started yet`);
                }

                const aScore = a.homeTeamScore + a.awayTeamScore;
                const bScore = b.homeTeamScore + b.awayTeamScore;
                const scoreDiff = bScore - aScore;
                if (scoreDiff !== 0) return scoreDiff;

                return b.startedAt.getTime() - a.startedAt.getTime();
            });
    }

    private getMatchInProgress(id: string): Match {
        const match = this.matches.get(id);
        if (!match) throw new Error(`Match with id ${id} not found.`);
        if (!match.inProgress) {
            throw new Error('Match is not in progress');
        }

        return match;
    }

    private checkIfTeamIsInMatch(team: Team): boolean {
        for (const match of this.matches.values()) {
            if (match.homeTeam.id === team.id || match.awayTeam.id === team.id) {
                return true;
            }
        }

        return false;
    }
}