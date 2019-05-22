import AuthService from "@/services/authService";
import { APIResponse, Team, TeamMember, TeamOverview } from "@/types";

class TeamService {
    baseUrl = process.env.VUE_APP_API_URL;

    async userTeam(): Promise<Team | null> {
        const res = await fetch(`${this.baseUrl}/teams`, {
            headers: {
                Authorization: `Bearer ${AuthService.accessToken}`
            }
        });

        if (res.status === 404) {
            return null;
        }

        if (res.status === 500) {
            throw new Error(
                "An internal server error occurred while checking if you a joined to a team!"
            );
        }

        const body = (await res.json()) as APIResponse<Team>;
        return body.result;
    }

    async joinTeam(teamCode: string): Promise<Team | null> {
        const res = await fetch(`${this.baseUrl}/teams/${teamCode}/join`, {
            headers: {
                Authorization: `Bearer ${AuthService.accessToken}`
            }
        });

        if (res.status === 404) {
            return null;
        }

        if (res.status === 500) {
            throw new Error(
                "An internal server occurred joining you to the team!"
            );
        }

        const body = (await res.json()) as APIResponse<Team>;
        return body.result;
    }

    async getTeamMembers(teamCode: string): Promise<TeamMember[]> {
        const res = await fetch(`${this.baseUrl}/teams/${teamCode}/members`, {
            headers: {
                Authorization: `Bearer ${AuthService.accessToken}`
            }
        });

        if (res.status === 404 || res.status === 400) {
            return [];
        }

        if (res.status === 500) {
            throw new Error(
                "An internal server occured fetching the team's members"
            );
        }

        const body = (await res.json()) as APIResponse<TeamMember[]>;
        return body.result;
    }

    async getTeamOverview(teamCode: string): Promise<TeamOverview | null> {
        const res = await fetch(`${this.baseUrl}/teams/${teamCode}`, {
            headers: {
                Authorization: `Bearer ${AuthService.accessToken}`
            }
        });

        if (res.status === 404 || res.status === 400) {
            return null;
        }

        if (res.status === 500) {
            throw new Error(
                "An internal server occurred fetching the team overview"
            );
        }

        const body = (await res.json()) as APIResponse<TeamOverview>;
        return body.result;
    }
}

export default new TeamService();
