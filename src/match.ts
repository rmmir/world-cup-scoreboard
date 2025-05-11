import { v4 as uuidv4 } from 'uuid';
import type { Team } from './team';

export class Match {
    public readonly id: string = uuidv4();
    public readonly homeTeam: Team;
    public readonly awayTeam: Team;
    public homeTeamScore: number = 0;
    public awayTeamScore: number = 0;
    public inProgress: boolean = false;
    public startedAt: Date | null = null;

    constructor(homeTeam: Team, awayTeam: Team) {
        if (homeTeam.id === awayTeam.id) {
            throw new Error('Home and away teams cannot be the same');
        }

        if (homeTeam.name === awayTeam.name) {
            throw new Error('Home and away teams cannot have the same name');
        }
        
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
    }

    public start(): void {
        if (this.inProgress) {
            throw new Error('Match is already in progress');
        }

        this.inProgress = true;
        this.startedAt = new Date();
    }

    public updateScore(homeTeamScore: number, awayTeamScore: number): void {
        if (!this.inProgress) {
            throw new Error('Match is not in progress');
        }

        this.homeTeamScore = homeTeamScore;
        this.awayTeamScore = awayTeamScore;
    }

    public finish() {
        if (!this.inProgress) {
            throw new Error('Match is not in progress');
        }

        this.inProgress = false;
    }
}