import { Service } from '@freshgum/typedi';

import { Session, UserData } from '../../common/types';
import { APIManager } from './APIManager';

@Service([APIManager])
export class AuthorizationService {
    private currentSession?: Session;
    private apiEndpoint?: string;

    constructor(private apiService: APIManager) {}

    async authorize(login: string, password: string): Promise<UserData> {
        this.apiEndpoint = (await this.apiService.getAPIEndpoint()).url;

        this.currentSession = await this.apiService.auth(login, password);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { accessToken, refreshToken, ...publicData } =
            this.currentSession;
        return publicData;
    }

    getCurrentSession() {
        return this.currentSession;
    }

    getAPIEndpoint() {
        return this.apiEndpoint;
    }
}
